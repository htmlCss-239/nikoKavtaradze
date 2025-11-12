const carouselContainer = document.querySelector(".carousel-container");
const carouselSlides = document.querySelector(".carousel-slides");
const dots = document.querySelectorAll(".dot");
const prevArrow = document.querySelector(".prev-arrow");
const nextArrow = document.querySelector(".next-arrow");
const totalSlides = dots.length;
let currentSlide = 1;

function moveToSlide(slideIndex) {
  const offset = ((slideIndex - 1) * 100) / totalSlides;

  carouselSlides.style.transform = `translateX(-${offset}%)`;

  updateDots(slideIndex);
  currentSlide = slideIndex;
}

function updateDots(activeSlideIndex) {
  dots.forEach((dot) => {
    dot.classList.remove("dot-active");
  });

  dots[activeSlideIndex - 1].classList.add("dot-active");
}

nextArrow.addEventListener("click", () => {
  let newSlide = currentSlide + 1;
  if (newSlide > totalSlides) {
    newSlide = 1;
  }
  moveToSlide(newSlide);

  resetAutoSlide();
});

prevArrow.addEventListener("click", () => {
  let newSlide = currentSlide - 1;
  if (newSlide < 1) {
    newSlide = totalSlides;
  }
  moveToSlide(newSlide);

  resetAutoSlide();
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const slideIndex = parseInt(dot.getAttribute("data-slide"));
    moveToSlide(slideIndex);
    resetAutoSlide();
  });
});

const SLIDE_INTERVAL = 6000;
let slideTimer;

function autoSlide() {
  slideTimer = setInterval(() => {
    let newSlide = currentSlide + 1;
    if (newSlide > totalSlides) {
      newSlide = 1;
    }
    moveToSlide(newSlide);
  }, SLIDE_INTERVAL);
}

function resetAutoSlide() {
  clearInterval(slideTimer);
  autoSlide();
}

document.addEventListener("DOMContentLoaded", autoSlide);
