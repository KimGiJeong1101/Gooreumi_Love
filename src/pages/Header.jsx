import React from "react";

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
        w-full p-6
        flex flex-col items-center gap-4
        border-b-4 border-gray-300
      "
    >
      <div onClick={handleHomeClick} className="bg-blue-300">
        사진 및 로고 영역
      </div>

      <div className="flex gap-4">
        <button
          onClick={handlePhotoClick}
          className="w-24 h-10 border-b-4 border-gray-300"
        >
          사진
        </button>

        <button
          onClick={handleVideoClick}
          className="w-24 h-10 border-b-4 border-gray-300"
        >
          동영상
        </button>
      </div>
    </div>
  );
};

export default Header;
