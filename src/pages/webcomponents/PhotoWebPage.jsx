import React, { useState } from "react";
import usePhotoPagination from "../../hooks/usePhotoPagination";

const PhotoWebPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const PHOTOS_PER_PAGE = 9;
  const { totalPages, getPageImages } = usePhotoPagination(PHOTOS_PER_PAGE);
  const pageImages = getPageImages(currentPage);

  return (
    <div className="w-full h-screen bg-white p-10">
      <div className="flex gap-16 h-[82vh] max-w-[1600px] mx-auto">
        {/* 왼쪽: 메인 이미지 스테이지 */}
        <div className="flex-[1.8] bg-[#1a1a1a] rounded-3xl flex items-center justify-center overflow-hidden shadow-sm">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt=""
              loading="lazy"
              decoding="async"
              className="max-w-full max-h-full object-contain p-4"
            />
          ) : (
            <p className="text-gray-500 font-light tracking-[0.2em] uppercase">
              Select Photo
            </p>
          )}
        </div>

        {/* 오른쪽: 컨트롤 패널 */}
        <div className="w-[500px] flex flex-col justify-center border-l border-gray-50 pl-16">
          {/* 상단: 타이틀 & 페이징 숫자 */}
          <div className="mb-12 text-center">
            <h2 className="text-[10px] font-bold tracking-[0.4em] text-gray-300 uppercase mb-4">
              구름's Gallery
            </h2>
            <div className="flex items-center justify-center gap-4">
              <span className="text-5xl font-extralight text-black leading-none">
                {String(currentPage + 1).padStart(2, "0")}
              </span>
              <span className="h-[30px] w-[1px] bg-gray-200 rotate-[25deg]"></span>
              <span className="text-sm font-medium text-gray-400 mt-2">
                {String(totalPages).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* 화살표와 썸네일 그리드 */}
          <div className="relative px-14">
            {/* 왼쪽 화살표: 원형 미니멀 디자인 */}
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-gray-300 transition-all active:scale-90 group"
              onClick={() =>
                setCurrentPage((p) => (p - 1 + totalPages) % totalPages)
              }
            >
              <div className="w-2 h-2 border-l-2 border-t-2 border-gray-400 rotate-[-45deg] transition-colors group-hover:border-black" />
            </button>

            {/* 썸네일 그리드 (크기 유지) */}
            <div className="grid grid-cols-3 gap-3">
              {pageImages.map((path, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(path)}
                  className={`aspect-square overflow-hidden rounded-lg transition-all duration-500
                    ${
                      selectedImage === path
                        ? "ring-1 ring-black ring-offset-2 scale-90 opacity-100"
                        : "opacity-30 hover:opacity-100 hover:scale-105"
                    }`}
                >
                  <img
                    src={path}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </button>
              ))}
            </div>

            {/* 오른쪽 화살표: 원형 미니멀 디자인 */}
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-gray-300 transition-all active:scale-90 group"
              onClick={() => setCurrentPage((p) => (p + 1) % totalPages)}
            >
              <div className="w-2 h-2 border-r-2 border-t-2 border-gray-400 rotate-[45deg] transition-colors group-hover:border-black" />
            </button>
          </div>

          {/* 하단 장식 */}
          <div className="mt-12 text-center opacity-20">
            <p className="text-[9px] tracking-widest uppercase italic"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoWebPage;
