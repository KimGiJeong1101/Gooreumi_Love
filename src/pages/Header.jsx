import React from "react";
import { PawPrint } from "lucide-react";

const Header = ({ setPage }) => {
  const handlePhotoClick = () => {
    setPage("photo");
  };

  const handleVideoClick = () => {
    setPage("video");
  };

  const handleHomeClick = () => {
    setPage("home");
  };

  return (
    <div
      className="
        w-full p-8
        flex flex-col items-center gap-6
        border-b border-gray-100 shadow-sm
        bg-white
      "
    >
      {/* 1. 로고 영역: 클릭 시 홈으로 이동 유지 */}
      <div
        onClick={handleHomeClick}
        className="cursor-pointer flex flex-col items-center group"
      >
        {/* 아이콘 느낌의 원형 배경 + 강아지 이모지 */}
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 shadow-inner">
          <PawPrint className="text-gray-400 fill-white w-10 h-10" />
        </div>

        <h1
          className="text-4xl font-bold tracking-tight text-gray-800 flex items-center gap-3"
          style={{ fontFamily: "'Gaegu', cursive" }} // 구글 폰트 적용
        >
          {/* '구름이' 부분: 살짝 기울여서 생동감 부여 */}
          <span className="hover:rotate-[-5deg] transition-transform cursor-default">
            구름이
          </span>

          {/* '기록' 부분: 둥글둥글한 박스와 부드러운 블루 그라데이션 */}
          <span
            className="
              relative inline-block
              px-4 py-1 
            text-white text-3xl
              bg-gradient-to-br from-blue-400 to-blue-500
              rounded-[1.5rem] rounded-tl-[0.5rem] 
              shadow-[0_4px_10px_rgba(59,130,246,0.3)]
              transform -rotate-1
            "
          >
            기록
          </span>
        </h1>
      </div>

      {/* 2. 네비게이션 영역: 기존 버튼 구조 유지 */}
      <div className="flex gap-6">
        <button
          onClick={handlePhotoClick}
          className="
            w-28 h-12 
            text-gray-600 font-medium
            border-b-2 border-transparent 
            hover:border-yellow-400 hover:text-yellow-600
            transition-all duration-300
          "
        >
          사진일기
        </button>

        <button
          onClick={handleVideoClick}
          className="
            w-28 h-12 
            text-gray-600 font-medium
            border-b-2 border-transparent 
            hover:border-yellow-400 hover:text-yellow-600
            transition-all duration-300
          "
        >
          영상일기
        </button>
      </div>
    </div>
  );
};

export default Header;
