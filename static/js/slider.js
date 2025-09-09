const carouselTrack = document.getElementById("carousel-track");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const indicators = document.querySelectorAll(".indicator");

// cuenta los slides reales
const slides = carouselTrack.children; 
const totalSlides = slides.length;

let currentIndex = 0;

function updateCarousel() {
  carouselTrack.style.transform = 'translateX(-${currentIndex * 100}%)';

  indicators.forEach((dot, i) => {
    dot.classList.toggle("bg-pink-500", i === currentIndex);
    dot.classList.toggle("bg-white/50", i !== currentIndex);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateCarousel(); //indice
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

indicators.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    currentIndex = i;
    updateCarousel();
  });
});

updateCarousel();
setInterval(nextSlide, 3000);