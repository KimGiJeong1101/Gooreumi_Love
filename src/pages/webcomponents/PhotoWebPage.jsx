import React from "react";

const PhotoWebPage = () => {
  return (
    <div className="w-full h-screen bg-gray-100 p-6">
      <div className="flex gap-6 h-full">
        {/* 왼쪽: 큰 사진 영역 */}
        <div className="flex-1 bg-black rounded-lg flex items-center justify-center">
          <span className="text-white text-xl">📸 선택된 사진 영역</span>
        </div>

        {/* 오른쪽: 썸네일 목록 */}
        <div className="w-[360px] bg-white rounded-lg p-4 flex flex-col justify-center">
          {/* 화살표 */}
          <div className="flex justify-between items-center mb-4">
            <button className="px-3 py-1 bg-gray-200 rounded">◀</button>
            <span className="text-sm text-gray-500">사진 목록</span>
            <button className="px-3 py-1 bg-gray-200 rounded">▶</button>
          </div>

          {/* 썸네일 */}
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 9 }).map((_, idx) => (
              <div key={idx} className="aspect-square bg-gray-300 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoWebPage;
