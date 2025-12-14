import React from "react";

const Header = () => {
  return (
    <div
      className="
        w-full p-6
        flex flex-col items-center gap-4
        border-b-4 border-gray-300
      "
    >
      <div className="bg-blue-300">사진 및 로고 영역</div>

      <div className="flex gap-4">
        <button className="w-24 h-10 border-b-4 border-gray-300">사진</button>
        <button className="w-24 h-10 border-b-4 border-gray-300">동영상</button>
      </div>
    </div>
  );
};

export default Header;
