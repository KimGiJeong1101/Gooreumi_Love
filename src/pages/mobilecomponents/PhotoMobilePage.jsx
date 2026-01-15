import React, { useState } from "react";
import usePhotoPagination from "../../hooks/usePhotoPagination";

const PhotoMobilePage = () => {
  const PHOTOS_PER_PAGE = 9;
  const { totalPages, imageEntries } = usePhotoPagination(PHOTOS_PER_PAGE);

  const PAGES_PER_GROUP = 10;
  const totalGroups = Math.ceil(totalPages / PAGES_PER_GROUP);

  // 상태
  const [openGroup, setOpenGroup] = useState(null);
  const [openPage, setOpenPage] = useState(null);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4">
      <h1 className="text-lg font-semibold mb-4">사진</h1>

      <div className="flex flex-col gap-3">
        {Array.from({ length: totalGroups }).map((_, groupIdx) => {
          const groupStart = groupIdx * PAGES_PER_GROUP + 1;
          const groupEnd = Math.min(
            groupStart + PAGES_PER_GROUP - 1,
            totalPages
          );

          const isGroupOpen = openGroup === groupIdx;

          return (
            <div
              key={groupIdx}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              {/* 1단 아코디언 */}
              <button
                onClick={() => setOpenGroup(isGroupOpen ? null : groupIdx)}
                className="w-full px-4 py-3 flex justify-between items-center"
              >
                <span className="font-medium">
                  {groupStart} ~ {groupEnd} 페이지
                </span>
                <span className="text-xl font-bold select-none">
                  {isGroupOpen ? "−" : "+"}
                </span>
              </button>

              {/* 1단 콘텐츠 */}
              <div
                className="transition-all duration-700 ease-in-out px-3"
                style={{
                  maxHeight: isGroupOpen ? "1000px" : "0px",
                  opacity: isGroupOpen ? 1 : 0,
                }}
              >
                <div className="pb-3 flex flex-col gap-2">
                  {Array.from({
                    length: groupEnd - groupStart + 1,
                  }).map((_, pageIdx) => {
                    const pageNumber = groupStart + pageIdx;
                    const isPageOpen = openPage === pageNumber;

                    // ⭐ 페이지별 이미지 slice
                    const startIdx = (pageNumber - 1) * PHOTOS_PER_PAGE;
                    const endIdx = startIdx + PHOTOS_PER_PAGE;

                    const pageImages = imageEntries.slice(startIdx, endIdx);

                    return (
                      <div
                        key={pageNumber}
                        className="bg-gray-50 rounded-md overflow-hidden"
                      >
                        {/* 2단 아코디언 */}
                        <button
                          onClick={() =>
                            setOpenPage(isPageOpen ? null : pageNumber)
                          }
                          className="w-full px-3 py-2 flex justify-between items-center text-sm"
                        >
                          <span>{pageNumber} 페이지</span>
                          <span
                            className={`transition-transform duration-500 ${
                              isPageOpen ? "rotate-180" : ""
                            }`}
                          >
                            ▼
                          </span>
                        </button>

                        {/* 2단 콘텐츠 (사진 9개) */}
                        <div
                          className="transition-all duration-700 ease-in-out px-3"
                          style={{
                            maxHeight: isPageOpen ? "500px" : "0px",
                            opacity: isPageOpen ? 1 : 0,
                          }}
                        >
                          <div className="py-3">
                            <div className="grid grid-cols-3 gap-2">
                              {pageImages.map(([path], idx) => (
                                <img
                                  key={idx}
                                  src={path}
                                  alt=""
                                  className="aspect-square object-cover rounded"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PhotoMobilePage;
