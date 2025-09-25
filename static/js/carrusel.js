document.addEventListener('DOMContentLoaded', () => {
  const carouselTrack = document.getElementById('carousel-track');
  if (!carouselTrack) {
    console.error('No se encontró #carousel-track');
    return;
  }

  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const dotsContainer = document.getElementById('carousel-dots');
  let dots = Array.from(document.querySelectorAll('.carousel-dot'));
  const slides = Array.from(carouselTrack.children).filter(n => n.nodeType === 1); 
  const totalSlides = slides.length;
  let currentIndex = 0;
  const autoplayDelay = 3000;
  let autoplayId = null;

  // Ajusta ancho de cada slide (responsive) usando el ancho del contenedor visible
  function setSlidesWidth() {
    const container = carouselTrack.parentElement; 
    const containerWidth = container.clientWidth;
    slides.forEach(slide => {
      slide.style.minWidth = `${containerWidth}px`;
      slide.style.maxWidth = `${containerWidth}px`;
    });
  }

  // Mueve el track usando píxeles (más fiable con responsive)
  function updateCarousel(animate = true) {
    const containerWidth = carouselTrack.parentElement.clientWidth;
    carouselTrack.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
    carouselTrack.style.transform = `translateX(-${currentIndex * containerWidth}px)`;
    updateDots();
    // console para debugging
    console.log('carousel update -> index:', currentIndex, 'containerWidth:', containerWidth);
  }

  function updateDots() {
    // Si creamos dots dinámicamente, actualizamos la referencia
    dots = Array.from(document.querySelectorAll('.carousel-dot'));
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('bg-gray-800', 'opacity-100');
        dot.classList.remove('bg-gray-400', 'opacity-50');
      } else {
        dot.classList.remove('bg-gray-800', 'opacity-100');
        dot.classList.add('bg-gray-400', 'opacity-50');
      }
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  // Listeners botones
  if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoplay(); nextSlide(); startAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoplay(); prevSlide(); startAutoplay(); });

  // Dots: si no existen, los creamos dentro del contenedor #carousel-dots
  if ((!dots || dots.length === 0) && dotsContainer) {
    dots = [];
    for (let i = 0; i < totalSlides; i++) {
      const d = document.createElement('div');
      d.className = 'carousel-dot w-3 h-3 rounded-full bg-gray-400 opacity-50 cursor-pointer transition-all duration-300';
      d.dataset.index = i;
      dotsContainer.appendChild(d);
      d.addEventListener('click', () => {
        currentIndex = i;
        stopAutoplay();
        updateCarousel();
        startAutoplay();
      });
      dots.push(d);
    }
  } else {
    // Si ya existen en el HTML
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const i = parseInt(dot.dataset.index, 10);
        if (Number.isNaN(i)) return;
        currentIndex = i;
        stopAutoplay();
        updateCarousel();
        startAutoplay();
      });
    });
  }

  // Autoplay + pausa en hover
  function startAutoplay() {
    stopAutoplay();
    autoplayId = setInterval(nextSlide, autoplayDelay);
  }
  function stopAutoplay() {
    if (autoplayId) {
      clearInterval(autoplayId);
      autoplayId = null;
    }
  }

  const carouselContainer = carouselTrack.parentElement;
  carouselContainer.addEventListener('mouseenter', stopAutoplay);
  carouselContainer.addEventListener('mouseleave', startAutoplay);

  // Re-calcula al redimensionar para mantener responsive
  window.addEventListener('resize', () => {
    setSlidesWidth();
    updateCarousel(false); // sin animación en resize
  });

  // Inicialización
  setSlidesWidth();
  updateCarousel(false);
  startAutoplay();

  // "Ver más" logic (tu código original)
  const botones = document.querySelectorAll('.ver-mas-btn');
  botones.forEach((btn) => {
    btn.addEventListener('click', () => {
      const info = btn.closest('div').nextElementSibling;
      if (!info) return;
      info.classList.toggle('hidden');
      btn.textContent = info.classList.contains('hidden') ? 'Ver más' : 'Ocultar';
    });
  });

  console.log('Carousel inicializado. slides:', totalSlides);
});
