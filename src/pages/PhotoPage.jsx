import React from "react";
import PhotoMobilePage from "./mobilecomponents/PhotoMobilePage";
import PhotoWebPage from "./webcomponents/PhotoWebPage";
import useMediaQuery from "../hooks/useMediaQuery";

const PhotoPage = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="w-full min-h-screen">
      {isMobile ? <PhotoMobilePage /> : <PhotoWebPage />}
    </div>
  );
};

export default PhotoPage;
