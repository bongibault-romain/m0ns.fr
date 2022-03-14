const images = document.querySelectorAll("img");

const preload = () => {
  images.forEach((image) => {
    const src = image.getAttribute("src");

    if (src) {
      const img = new Image();
      img.src = src;
    }
  });
};

preload();
