const images = import.meta.glob("./*.{jpg,png}", {
  eager: true,
  import: "default",
});

export default Object.values(images);
