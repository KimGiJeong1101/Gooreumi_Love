import React, { useState } from "react";

const PhotoMobilePage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // 임시 페이지 개수
  const totalPages = 5;

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4">
      <h1 className="text-lg font-semibold mb-4">사진</h1>

      <div className="flex flex-col gap-3">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow overflow-hidden">
            {/* 아코디언 헤더 */}
            <button
              onClick={() => toggle(idx)}
              className="w-full px-4 py-3 flex justify-between items-center text-left"
            >
              <span className="font-medium">{idx + 1} 페이지</span>

              <span
                className={`transition-transform duration-700 ${
                  openIndex === idx ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {/* ⭐ 아코디언 콘텐츠 (애니메이션 핵심) */}
            <div
              className="px-4 transition-all duration-700 ease-in-out"
              style={{
                maxHeight: openIndex === idx ? "500px" : "0px",
                opacity: openIndex === idx ? 1 : 0,
              }}
            >
              <div className="pb-4 pt-2">
                <div className="grid grid-cols-3 gap-3">
                  {Array.from({ length: 9 }).map((_, photoIdx) => (
                    <div
                      key={photoIdx}
                      className="aspect-square bg-gray-300 rounded"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoMobilePage;
