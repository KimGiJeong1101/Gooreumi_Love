import React, { useState } from "react";
import useVideoPagination from "../../hooks/useVideoPagination";

const VideoWebPage = () => {
  const { videoEntries } = useVideoPagination();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (videoEntries.length === 0) return null;

  const total = videoEntries.length;

  const leftIndex = (currentIndex - 1 + total) % total;
  const rightIndex = (currentIndex + 1) % total;

  const left = videoEntries[leftIndex];
  const center = videoEntries[currentIndex];
  const right = videoEntries[rightIndex];

  return (
    <div className="w-full min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="flex items-center gap-10">
        {/* ◀ */}
        <button
          onClick={() => setCurrentIndex(leftIndex)}
          className="text-white text-4xl"
        >
          ◀
        </button>

        {/* 왼쪽 썸네일 */}
        <button onClick={() => setCurrentIndex(leftIndex)}>
          <video
            src={left.url} // ⭐ 변경
            preload="metadata"
            muted
            className="w-64 aspect-video opacity-50 scale-90 rounded-xl"
          />
        </button>

        {/* 가운데 */}
        <a href={center.url} target="_blank" rel="noopener noreferrer">
          <video
            src={center.url} // ⭐ 변경
            preload="metadata"
            muted
            className="w-[520px] aspect-video rounded-2xl shadow-2xl"
          />
        </a>

        {/* 오른쪽 썸네일 */}
        <button onClick={() => setCurrentIndex(rightIndex)}>
          <video
            src={right.url} // ⭐ 변경
            preload="metadata"
            muted
            className="w-64 aspect-video opacity-50 scale-90 rounded-xl"
          />
        </button>

        {/* ▶ */}
        <button
          onClick={() => setCurrentIndex(rightIndex)}
          className="text-white text-4xl"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default VideoWebPage;
