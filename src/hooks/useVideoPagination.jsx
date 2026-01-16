import { useMemo } from "react";

const useVideoPagination = () => {
  const videos = import.meta.glob("/src/assets/videos/*.{mp4,MP4,webm,WEBM}", {
    eager: true,
    as: "url", // ⭐ 여기가 핵심
  });

  const videoEntries = Object.values(videos); // Object.keys → Object.values

  return {
    videoEntries,
    totalVideos: videoEntries.length,
  };
};

export default useVideoPagination;
