const arrowButton = document.querySelector("button#arrow");

if (arrowButton && arrowButton instanceof HTMLButtonElement) {
  arrowButton.onclick = () => {
    window.scroll({
      top: 700,
      left: 0,
      behavior: "smooth",
    });
  };
}
