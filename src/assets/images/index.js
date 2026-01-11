const images = import.meta.glob("./*.{jpg,JPG,jpeg,JPEG,png,PNG}", {
  eager: true,
  import: "default",
});

export default Object.values(images);
