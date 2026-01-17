import { useMemo } from "react";

const useVideoPagination = () => {
  const videos = import.meta.glob("/src/assets/videos/*.{mp4,MP4,webm,WEBM}", {
    eager: true,
    query: "?url",
    import: "default",
  });

  const videoEntries = Object.values(videos); // Object.keys → Object.values

  return {
    videoEntries,
    totalVideos: videoEntries.length,
  };
};

export default useVideoPagination;
