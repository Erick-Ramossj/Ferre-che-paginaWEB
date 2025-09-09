// Seleccionamos elementos clave del DOM
const carouselTrack = document.getElementById("carousel-track");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const slideInfo = document.getElementById("slide-info"); // opcional si lo usas
const dots = document.querySelectorAll('.carousel-dot');

// Número total de slides
const totalSlides = carouselTrack.getElementsByTagName('img').length;
let currentIndex = 0;

// --- Función para actualizar la posición del carrusel ---
function updateCarousel() {
    carouselTrack.style.transform = 'translateX(-${currentIndex * 100}%)';
    updateDots(); // asegura que los dots se actualicen
}


// --- Función para actualizar los dots ---
function updateDots() {
    dots.forEach((dot, index) => {
        if(index === currentIndex) {
            dot.classList.add('bg-gray-800', 'opacity-100');
            dot.classList.remove('bg-gray-400', 'opacity-50');
        } else {
            dot.classList.remove('bg-gray-800', 'opacity-100');
            dot.classList.add('bg-gray-400', 'opacity-50');
        }
    });
}

// --- Funciones para avanzar o retroceder ---
function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

// --- Escuchadores de botones ---
if(nextBtn && prevBtn) {
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);
}

// --- Escuchadores para hacer clic en los dots ---
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        currentIndex = parseInt(dot.dataset.index);
        updateCarousel();
    });
});

// --- Autoplay ---
updateCarousel();
setInterval(nextSlide, 5000);

// --- Lógica del botón "Ver más" si existe ---
document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".ver-mas-btn");
    botones.forEach((btn) => {
        btn.addEventListener("click", () => {
            const info = btn.closest("div").nextElementSibling;
            info.classList.toggle("hidden");
            btn.textContent = info.classList.contains("hidden") ? "Ver más" : "Ocultar";
        });
    });
});