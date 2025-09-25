document.addEventListener("DOMContentLoaded", () => {
  // --- Toggle menú móvil ---
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // --- Toggle menú usuario ---
  const userMenuButton = document.getElementById("userMenuButton");
  const userMenu = document.getElementById("userMenu");

  if (userMenuButton && userMenu) {
    userMenuButton.addEventListener("click", (e) => {
      e.stopPropagation();
      userMenu.classList.toggle("hidden");
    });

    // Cerrar si se hace click fuera
    document.addEventListener("click", (e) => {
      if (
        !userMenuButton.contains(e.target) &&
        !userMenu.contains(e.target)
      ) {
        userMenu.classList.add("hidden");
      }
    });
  }
});
