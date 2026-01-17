import { useMemo } from "react";

const usePhotoPagination = (photosPerPage = 9) => {
  const images = import.meta.glob(
    "/src/assets/images/*.{jpg,JPG,jpeg,JPEG,png,PNG}",
    { eager: true, query: "?url", import: "default" }, 
  );

  const imageEntries = Object.values(images); // Object.keys → Object.values

  const totalPhotos = imageEntries.length;
  const totalPages = Math.ceil(totalPhotos / photosPerPage);

  const getPageImages = (pageIndex) => {
    const start = pageIndex * photosPerPage;
    return imageEntries.slice(start, start + photosPerPage);
  };

  return {
    totalPhotos,
    totalPages,
    getPageImages,
    imageEntries,
  };
};

export default usePhotoPagination;
