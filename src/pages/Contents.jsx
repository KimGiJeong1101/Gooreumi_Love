import React from "react";
import PhotoPage from "./PhotoPage";
import VideoPage from "./VideoPage";

const Contents = () => {
  return (
    <div className="bg-orange-300">
      콘텐츠
      <PhotoPage></PhotoPage>
      <VideoPage></VideoPage>
    </div>
  );
};

export default Contents;
