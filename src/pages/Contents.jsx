import React from "react";
import PhotoPage from "./PhotoPage";
import VideoPage from "./VideoPage";
import HomePage from "./HomePage";

const Contents = ({ page }) => {
  return (
    <div className="w-full p-6 min-h-screen">
      {page === "home" && <HomePage />}
      {page === "photo" && <PhotoPage />}
      {page === "video" && <VideoPage />}
    </div>
  );
};

export default Contents;
