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
    <div className="w-full min-h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
      <div className="flex items-center gap-14 max-w-[1600px]">
        {/* ◀ 이전 버튼 */}
        <button
          onClick={() => setCurrentIndex(leftIndex)}
          className="w-14 h-14 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all active:scale-90 group z-10"
        >
          <div className="w-3 h-3 border-l-2 border-b-2 border-current rotate-45 mr-[-4px]" />
        </button>

        {/* 왼쪽 썸네일 */}
        <div
          onClick={() => setCurrentIndex(leftIndex)}
          className="cursor-pointer relative group hidden xl:block"
        >
          <video
            src={left.url}
            preload="metadata"
            muted
            className="w-72 aspect-video object-cover opacity-20 scale-90 rounded-2xl border border-white/10 transition-all duration-500 group-hover:opacity-40"
          />
          <div className="absolute inset-0 bg-black/40 rounded-2xl" />
        </div>

        {/* 가운데 메인 비디오 */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl transition duration-1000 group-hover:opacity-60"></div>

          <a
            href={center.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block bg-black rounded-[1.8rem] p-1 shadow-2xl overflow-hidden"
          >
            <video
              src={center.url}
              preload="metadata"
              autoPlay
              loop
              muted
              className="w-[720px] aspect-video rounded-3xl object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            {/* 오버레이 효과 */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 scale-90 group-hover:scale-100 transition-transform duration-500">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
              </div>
            </div>
          </a>

          {/* 하단 정보 영역: 멘트 추가 */}
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 text-center w-full space-y-3">
            <div className="inline-flex flex-col items-center">
              <p className="text-white/20 text-[10px] tracking-[0.6em] uppercase font-black mb-1">
                Now Playing
              </p>
              <div className="flex items-center gap-4">
                <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/20"></span>
                <span className="text-white text-lg font-light tracking-[0.3em]">
                  {currentIndex + 1}{" "}
                  <span className="text-white/20 text-xs">/</span> {total}
                </span>
                <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/20"></span>
              </div>
            </div>

            {/* 고친 부분: 동영상 크게보기 안내 멘트 */}
            <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              <svg
                className="w-3 h-3 text-blue-400 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <p className="text-white/40 text-[11px] font-medium tracking-tighter">
                화면을 클릭해서 <span className="text-white/70">전체 화면</span>
                으로 감상하기
              </p>
            </div>
          </div>
        </div>

        {/* 오른쪽 썸네일 */}
        <div
          onClick={() => setCurrentIndex(rightIndex)}
          className="cursor-pointer relative group hidden xl:block"
        >
          <video
            src={right.url}
            preload="metadata"
            muted
            className="w-72 aspect-video object-cover opacity-20 scale-90 rounded-2xl border border-white/10 transition-all duration-500 group-hover:opacity-40"
          />
          <div className="absolute inset-0 bg-black/40 rounded-2xl" />
        </div>

        {/* ▶ 다음 버튼 */}
        <button
          onClick={() => setCurrentIndex(rightIndex)}
          className="w-14 h-14 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all active:scale-90 group z-10"
        >
          <div className="w-3 h-3 border-r-2 border-t-2 border-current rotate-45 ml-[-4px]" />
        </button>
      </div>
    </div>
  );
};

export default VideoWebPage;
