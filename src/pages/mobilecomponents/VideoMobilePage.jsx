import React, { useEffect, useRef, useState } from "react";
import useVideoPagination from "../../hooks/useVideoPagination";

const VideoMobilePage = () => {
  const { videoEntries, totalVideos } = useVideoPagination();

  const [loadedCount, setLoadedCount] = useState(5);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          setIsLoading(true);

          setTimeout(() => {
            const remaining = totalVideos - loadedCount;

            if (remaining <= 0) {
              setHasMore(false);
              setIsLoading(false);
              return;
            }

            const next = remaining >= 3 ? 3 : remaining;
            setLoadedCount((prev) => prev + next);
            setIsLoading(false);
          }, 1000);
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [loadedCount, hasMore, isLoading, totalVideos]);

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="flex flex-col">
        {videoEntries.slice(0, loadedCount).map((video, idx) => (
          <div key={idx}>
            <button onClick={() => setActiveVideo(video)}>
              <video
                src={video}
                preload="metadata"
                muted
                className="w-full aspect-video bg-black"
              />
            </button>

            <div className="px-3 py-2">
              <p className="text-sm font-medium">영상 제목 {idx + 1}</p>
              <p className="text-xs text-gray-500">영상 설명</p>
            </div>
          </div>
        ))}
      </div>

      <div ref={loadMoreRef} className="h-16 flex items-center justify-center">
        {hasMore ? (
          isLoading ? (
            <p className="text-sm text-gray-400">불러오는 중…</p>
          ) : (
            <p className="text-sm text-gray-300">아래로 스크롤</p>
          )
        ) : (
          <p className="text-sm text-gray-500">
            더 이상 불러올 영상이 없습니다
          </p>
        )}
      </div>

      {activeVideo && (
        <div className="fixed inset-0 bg-black z-50">
          <video
            src={activeVideo}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          />
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-4 left-4 text-white text-3xl"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoMobilePage;
