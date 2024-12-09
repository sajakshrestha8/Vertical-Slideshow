document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".slideshow_container");
  const slides = document.querySelectorAll(".main_div");
  let startY = 0;
  let currentY = 0;
  let isDDragging = false;
  let translateY = 0;
  const slideHeight = slides[0].offsetHeight;

  container.addEventListener("mousedown", (event) => {
    isDDragging = true;
    startY = event.clientY;
    container.classList.add("dragging");
  });

  container.addEventListener("mousemove", (event) => {
    if (!isDDragging) return;

    currentY = event.clientY;
    const change = currentY - startY;
    translateY += change;

    const currentIndex = getCurrentSlideIndex();

    // Ensure currentIndex is within valid range
    if (currentIndex >= 0 && currentIndex < slides.length) {
      slides.forEach((slide, index) => {
        if (index !== currentIndex) {
          slide.style.transform = `translateY(${translateY}px)`;
          slide.style.opacity = 0.5;
        }
      });

      slides[currentIndex].style.transform = "translateY(0)";
      slides[currentIndex].style.opacity = 1;
    }

    startY = currentY;

    updateSlideOpacity();
  });

  container.addEventListener("mouseup", () => {
    if (!isDDragging) return;

    isDDragging = false;
    stopSlide();
    container.classList.remove("dragging");
  });

  container.addEventListener("mouseleave", () => {
    if (!isDDragging) return;

    isDDragging = false;
    stopSlide();
    container.classList.remove("dragging");
  });

  function stopSlide() {
    const offSet = Math.round(translateY / slideHeight);
    translateY = offSet * slideHeight;

    if (offSet >= slides.length) {
      translateY = 0;
    } else if (offSet < 0) {
      translateY = (slides.length - 1) * slideHeight;
    }

    container.style.transform = `translateY(${translateY}px)`;

    updateSlideOpacity();
  }

  function updateSlideOpacity() {
    const currentIndex = getCurrentSlideIndex();

    // Ensure currentIndex is within valid range
    if (currentIndex >= 0 && currentIndex < slides.length) {
      slides.forEach((slide, index) => {
        const offset = Math.abs(index - currentIndex);

        if (offset === 0) {
          slide.classList.add("center");
          slide.style.opacity = 1;
        } else {
          slide.classList.remove("center");
          slide.style.opacity = 0.5;
        }
      });
    }
  }

  function getCurrentSlideIndex() {
    return Math.floor(translateY / slideHeight);
  }
});
