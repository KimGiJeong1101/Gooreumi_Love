import { useMemo } from "react";

const useVideoPagination = () => {
  const videos = import.meta.glob("/src/assets/videos/*.{mp4,MP4,webm,WEBM}", {
    eager: true,
  });

  const videoEntries = useMemo(() => Object.keys(videos), [videos]);

  return {
    videoEntries,
    totalVideos: videoEntries.length,
  };
};

export default useVideoPagination;
