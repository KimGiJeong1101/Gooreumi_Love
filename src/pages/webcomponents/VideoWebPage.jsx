import React from "react";

const VideoWebPage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="relative w-full max-w-7xl flex items-center justify-center gap-14 px-6">
        {/* ◀ 화살표 */}
        <button className="text-white text-5xl hover:scale-110 transition">
          ◀
        </button>

        {/* 🎬 캐러셀 영역 */}
        <div className="flex items-center gap-12">
          {/* 왼쪽 영상 */}
          <div className="w-72 h-40 bg-gray-700 rounded-2xl opacity-50 scale-90" />

          {/* 가운데 (메인 영상) */}
          <div className="w-[560px] h-[320px] bg-black rounded-3xl shadow-2xl flex items-center justify-center">
            <span className="text-white text-xl">현재 선택된 영상</span>
          </div>

          {/* 오른쪽 영상 */}
          <div className="w-72 h-40 bg-gray-700 rounded-2xl opacity-50 scale-90" />
        </div>

        {/* ▶ 화살표 */}
        <button className="text-white text-5xl hover:scale-110 transition">
          ▶
        </button>
      </div>
    </div>
  );
};

export default VideoWebPage;
