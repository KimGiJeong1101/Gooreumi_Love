const images = import.meta.glob(
  "./*.jpg",
  { eager: true, import: "default" }
);

export default Object.values(images);
