import React, { useState } from "react";
import usePhotoPagination from "../../components/usePhotoPagination";

const PhotoWebPage = () => {
  // 상태
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const PHOTOS_PER_PAGE = 9;
  const { totalPages, getPageImages } = usePhotoPagination(PHOTOS_PER_PAGE);

  const pageImages = getPageImages(currentPage);

  return (
    <div className="w-full h-screen bg-gray-100 p-6">
      <div className="flex gap-6 h-full">
        {/* 왼쪽: 선택된 사진 */}
        <div className="flex-1 bg-black rounded-lg flex items-center justify-center">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt=""
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <span className="text-white text-xl">📸 사진을 선택하세요</span>
          )}
        </div>

        {/* 오른쪽: 썸네일 */}
        <div className="w-[360px] bg-white rounded-lg p-4 flex flex-col justify-center">
          {/* 페이징 */}
          <div className="flex justify-between items-center mb-4">
            <button
              className="px-3 py-1 bg-gray-200 rounded"
              onClick={() =>
                setCurrentPage((p) => (p - 1 + totalPages) % totalPages)
              }
            >
              ◀
            </button>

            <span className="text-sm text-gray-500">
              {currentPage + 1} / {totalPages}
            </span>

            <button
              className="px-3 py-1 bg-gray-200 rounded"
              onClick={() => setCurrentPage((p) => (p + 1) % totalPages)}
            >
              ▶
            </button>
          </div>

          {/* 썸네일 그리드 */}
          <div className="grid grid-cols-3 gap-3">
            {pageImages.map(([path], idx) => (
              <img
                key={idx}
                src={path}
                loading="lazy"
                onClick={() => setSelectedImage(path)}
                className={`aspect-square object-cover rounded cursor-pointer
                  ${selectedImage === path ? "ring-2 ring-blue-500" : ""}`}
                alt=""
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoWebPage;
