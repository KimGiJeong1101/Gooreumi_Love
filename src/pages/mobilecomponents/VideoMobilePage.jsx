import React, { useEffect, useRef, useState, useMemo } from "react";
import useVideoPagination from "../../hooks/useVideoPagination";

const VideoMobilePage = () => {
  const { videoEntries, totalVideos } = useVideoPagination();

  const thumbs = import.meta.glob(
    "/src/assets/video-thumbs/*.{jpg,png,JPG,PNG}",
    { eager: true, query: "?url", import: "default" },
  );

  const thumbMap = useMemo(() => {
    const map = {};
    Object.entries(thumbs).forEach(([path, url]) => {
      const name = path.split("/").pop().split(".")[0];
      map[name] = url;
    });
    return map;
  }, [thumbs]);

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
      { threshold: 0.1 },
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [loadedCount, hasMore, isLoading, totalVideos]);

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] px-4 py-8">
      {" "}
      {/* 전체 좌우 여백 추가 */}
      <div className="flex flex-col gap-16">
        {" "}
        {/* 영상 간의 간격을 대폭 확장 */}
        {videoEntries.slice(0, loadedCount).map((video, idx) => {
          const poster = thumbMap[video.name];

          return (
            <div key={idx} className="flex flex-col group">
              {/* 비디오 카드 영역 */}
              <div
                onClick={() => setActiveVideo(video.url)}
                className="relative aspect-video bg-[#111] rounded-2xl overflow-hidden border border-white/5 shadow-2xl active:scale-[0.97] transition-all duration-300"
              >
                <video
                  src={video.url}
                  poster={poster}
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                {/* 중앙 재생 표시 */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-0.5" />
                  </div>
                </div>
              </div>

              {/* 영상 하단 추가 디테일 영역 */}
              <div className="mt-4 px-1 flex justify-between items-end">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-blue-300 font-bold tracking-widest uppercase italic">
                    Clip {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="h-[1px] w-40 bg-white/20"></div>
                </div>

                {/* 우측 하단: 가상의 런타임/날짜 정보 (세련된 느낌 추가) */}
                <div className="text-right">
                  <p className="text-[9px] text-white/30 font-medium tracking-tighter uppercase">
                    SCENES
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* 로딩/스크롤 가이드 */}
      <div
        ref={loadMoreRef}
        className="h-40 flex flex-col items-center justify-center gap-4"
      >
        {hasMore ? (
          isLoading ? (
            <div className="w-5 h-5 border-2 border-white/10 border-t-blue-500 rounded-full animate-spin" />
          ) : (
            <div className="flex flex-col items-center gap-2 opacity-30 animate-bounce">
              <div className="w-px h-8 bg-gradient-to-b from-white to-transparent" />
              <p className="text-[8px] text-white tracking-[0.5em] font-bold uppercase">
                Scroll
              </p>
            </div>
          )
        ) : (
          <p className="text-[9px] text-white/20 tracking-[0.4em] uppercase font-bold border-t border-white/5 pt-8 w-full text-center">
            구름이 동영상 추가 예정
          </p>
        )}
      </div>
      {/* 전체화면 재생 모달 (기존과 동일) */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center">
          <video
            src={activeVideo}
            controls
            autoPlay
            playsInline
            className="w-full h-auto max-h-screen"
          />
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20"
          >
            <span className="text-2xl font-extralight">✕</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoMobilePage;
