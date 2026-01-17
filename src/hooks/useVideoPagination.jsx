import { useMemo } from "react";

const useVideoPagination = () => {
  const videos = import.meta.glob("/src/assets/videos/*.{mp4,MP4,webm,WEBM}", {
    eager: true,
    query: "?url",
    import: "default",
  });

  // ⭐ 핵심: path 기준으로 name 추출
  const videoEntries = useMemo(() => {
    return Object.entries(videos).map(([path, url]) => {
      const name = path.split("/").pop().split(".")[0];
      return {
        name, // video1
        url, // /assets/video1.abcd1234.mp4
      };
    });
  }, [videos]);

  return {
    videoEntries,
    totalVideos: videoEntries.length,
  };
};

export default useVideoPagination;
