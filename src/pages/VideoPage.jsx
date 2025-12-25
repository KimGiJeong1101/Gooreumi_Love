import React from "react";
import VideoMobilePage from "./mobilecomponents/VideoMobilePage";
import VideoWebPage from "./webcomponents/VideoWebPage";
import useMediaQuery from "../hooks/useMediaQuery";

const VideoPage = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="bg-yellow-700 w-full min-h-screen">
      {isMobile ? <VideoMobilePage /> : <VideoWebPage />}
    </div>
  );
};

export default VideoPage;
