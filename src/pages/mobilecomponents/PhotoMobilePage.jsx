import React, { useState } from "react";
import usePhotoPagination from "../../hooks/usePhotoPagination";

const PhotoMobilePage = () => {
  const PHOTOS_PER_PAGE = 9;
  const { totalPages, imageEntries } = usePhotoPagination(PHOTOS_PER_PAGE);

  const PAGES_PER_GROUP = 10;
  const totalGroups = Math.ceil(totalPages / PAGES_PER_GROUP);

  const [openGroup, setOpenGroup] = useState(null);
  const [openPage, setOpenPage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // 그룹 변경 시 부드러운 전환을 위해 페이지 상태를 시간차를 두고 리셋하거나 관리
  const handleGroupToggle = (groupIdx) => {
    if (openGroup === groupIdx) {
      setOpenGroup(null);
      setOpenPage(null);
    } else {
      setOpenGroup(groupIdx);
      setOpenPage(null);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white p-6 pb-20 font-sans">
      {/* 헤더 디자인 유지 */}
      <header className="mb-12 pt-4 border-l-4 border-black pl-5">
        <h1 className="text-[11px] font-black tracking-[0.4em] text-gray-400 uppercase mb-1">
          Visual Archive
        </h1>
        <h2 className="text-4xl font-extralight text-[#1a1a1a] tracking-tight italic">
          구름's <span className="font-semibold not-italic">Gallery</span>
        </h2>
      </header>

      <div className="flex flex-col gap-4">
        {Array.from({ length: totalGroups }).map((_, groupIdx) => {
          const groupStart = groupIdx * PAGES_PER_GROUP + 1;
          const groupEnd = Math.min(
            groupStart + PAGES_PER_GROUP - 1,
            totalPages,
          );
          const isGroupOpen = openGroup === groupIdx;

          return (
            <div
              key={`group-${groupIdx}`}
              className="border-b border-gray-100 last:border-none"
            >
              {/* 1단 아코디언 버튼 */}
              <button
                onClick={() => handleGroupToggle(groupIdx)}
                className="w-full py-6 flex justify-between items-center transition-all"
              >
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] transition-colors duration-500 ${isGroupOpen ? "text-black font-medium" : "text-gray-400 font-normal"}`}
                      style={{ letterSpacing: "0.3em", paddingLeft: "0.3em" }}
                    >
                      COLLECTION
                    </span>
                    {isGroupOpen && (
                      <div className="w-1 h-1 bg-blue-600 rounded-full animate-pulse" />
                    )}
                  </div>
                  <div className="flex items-baseline gap-2 text-black">
                    <span
                      className={`text-4xl tracking-tighter font-black transition-transform duration-500 ${isGroupOpen ? "scale-110 origin-left text-blue-600" : ""}`}
                    >
                      {String(groupStart).padStart(2, "0")}
                    </span>
                    <span className="text-xl font-thin text-gray-200">/</span>
                    <span className="text-base font-bold text-gray-400">
                      {String(groupEnd).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-500 ${isGroupOpen ? "bg-black text-white rotate-180 shadow-xl" : "bg-gray-50 text-gray-300"}`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* 1단 콘텐츠: 스르륵 애니메이션 (Max-Height 이용) */}
              <div
                className="overflow-hidden transition-[max-height,opacity] duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                  maxHeight: isGroupOpen ? "4000px" : "0px",
                  opacity: isGroupOpen ? 1 : 0,
                }}
              >
                <div className="pb-10 pt-2 flex flex-col gap-4">
                  {Array.from({ length: groupEnd - groupStart + 1 }).map(
                    (_, pageIdx) => {
                      const pageNumber = groupStart + pageIdx;
                      const isPageOpen = openPage === pageNumber;
                      const startIdx = (pageNumber - 1) * PHOTOS_PER_PAGE;
                      const pageImages = imageEntries.slice(
                        startIdx,
                        startIdx + PHOTOS_PER_PAGE,
                      );

                      return (
                        <div
                          key={`page-${pageNumber}`}
                          className="flex flex-col"
                        >
                          {/* 2단 아코디언 버튼 */}
                          <button
                            onClick={() =>
                              setOpenPage(isPageOpen ? null : pageNumber)
                            }
                            className={`w-full px-6 py-4 flex justify-between items-center rounded-xl transition-all duration-300 ${isPageOpen ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-500 hover:bg-gray-100"}`}
                          >
                            <span
                              className={`text-xs tracking-[0.2em] uppercase ${isPageOpen ? "font-bold" : "font-medium"}`}
                            >
                              Volume. {String(pageNumber).padStart(2, "0")}
                            </span>
                            <span
                              className={`text-[10px] transition-transform duration-500 ${isPageOpen ? "rotate-45" : ""}`}
                            >
                              {isPageOpen ? "✕" : "MORE"}
                            </span>
                          </button>

                          {/* 2단 콘텐츠: 이미지 그리드 스르륵 애니메이션 */}
                          <div
                            className="overflow-hidden transition-[max-height,opacity,transform] duration-[600ms] ease-out"
                            style={{
                              maxHeight: isPageOpen ? "1200px" : "0px",
                              opacity: isPageOpen ? 1 : 0,
                              transform: isPageOpen
                                ? "translateY(0)"
                                : "translateY(-10px)",
                            }}
                          >
                            <div className="py-6 px-2">
                              <div className="grid grid-cols-3 gap-3">
                                {pageImages.map((path, idx) => (
                                  <div
                                    key={`${pageNumber}-img-${idx}`}
                                    onClick={() => setSelectedImage(path)}
                                    className="group relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden active:scale-95 transition-all duration-300 cursor-pointer"
                                  >
                                    <img
                                      src={path}
                                      alt=""
                                      loading="lazy"
                                      className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-active:bg-black/20 transition-colors" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 모달 애니메이션 생략 (기존 유지) */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt=""
            className="max-w-full max-h-[75vh] object-contain shadow-2xl rounded-sm"
          />
          <button className="mt-12 px-8 py-3 bg-white/10 border border-white/20 rounded-full text-white text-[10px] font-black tracking-[0.3em] uppercase">
            Close ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoMobilePage;
