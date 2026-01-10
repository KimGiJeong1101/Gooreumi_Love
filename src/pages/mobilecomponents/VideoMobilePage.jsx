import React, { useEffect, useRef, useState } from "react";

const VideoMobilePage = () => {
  // 임시 전체 영상 개수
  const TOTAL_VIDEOS = 12;

  // 처음 5개 로드
  const [loadedCount, setLoadedCount] = useState(5);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          setIsLoading(true);

          // ⭐ 로딩 텀
          setTimeout(() => {
            const remaining = TOTAL_VIDEOS - loadedCount;

            if (remaining <= 0) {
              setHasMore(false);
              setIsLoading(false);
              return;
            }

            const next = remaining >= 3 ? 3 : remaining;
            setLoadedCount((prev) => prev + next);
            setIsLoading(false);
          }, 1500); // 👈 로딩 시간 (ms)
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [loadedCount, hasMore, isLoading]);

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* 📺 썸네일 리스트 */}
      <div className="flex flex-col">
        {Array.from({ length: loadedCount }).map((_, idx) => (
          <div key={idx} className="w-full">
            {/* 썸네일 */}
            <div className="w-full aspect-video bg-gray-300 flex items-center justify-center">
              썸네일 {idx + 1}
            </div>

            {/* 설명 */}
            <div className="px-3 py-2">
              <p className="text-sm font-medium">영상 제목 {idx + 1}</p>
              <p className="text-xs text-gray-500">영상 설명 텍스트</p>
            </div>
          </div>
        ))}
      </div>

      {/* 👀 스크롤 감지 영역 */}
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
    </div>
  );
};

export default VideoMobilePage;
