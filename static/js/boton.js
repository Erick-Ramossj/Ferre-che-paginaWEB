document.addEventListener("DOMContentLoaded", () => {
  const btnUsuario = document.getElementById("btnUsuario");
  const btnEmpresa = document.getElementById("btnEmpresa");
  const formUsuario = document.getElementById("formUsuario");
  const formEmpresa = document.getElementById("formEmpresa");

  btnUsuario.addEventListener("click", () => {
    // Estilos botones
    btnUsuario.classList.add("bg-red-600", "text-white");
    btnUsuario.classList.remove("bg-gray-200", "text-gray-700");

    btnEmpresa.classList.add("bg-gray-200", "text-gray-700");
    btnEmpresa.classList.remove("bg-red-600", "text-white");

    // Activar usuario
    formUsuario.classList.remove("opacity-50", "pointer-events-none", "bg-gray-100");
    formUsuario.classList.add("bg-red-50");

    // Desactivar empresa
    formEmpresa.classList.add("opacity-50", "pointer-events-none", "bg-gray-100");
    formEmpresa.classList.remove("bg-red-50");
  });

  btnEmpresa.addEventListener("click", () => {
    // Estilos botones
    btnEmpresa.classList.add("bg-red-600", "text-white");
    btnEmpresa.classList.remove("bg-gray-200", "text-gray-700");

    btnUsuario.classList.add("bg-gray-200", "text-gray-700");
    btnUsuario.classList.remove("bg-red-600", "text-white");

    // Activar empresa
    formEmpresa.classList.remove("opacity-50", "pointer-events-none", "bg-gray-100");
    formEmpresa.classList.add("bg-red-50");

    // Desactivar usuario
    formUsuario.classList.add("opacity-50", "pointer-events-none", "bg-gray-100");
    formUsuario.classList.remove("bg-red-50");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const btnUsuario = document.getElementById("btnUsuario");
  const btnEmpresa = document.getElementById("btnEmpresa");
  const formUsuario = document.getElementById("formUsuario");
  const formEmpresa = document.getElementById("formEmpresa");


  btnUsuario.addEventListener("click", () => {
    // Estilos botones
    btnUsuario.classList.add("bg-red-600", "text-white");
    btnUsuario.classList.remove("bg-gray-200", "text-gray-700");


    btnEmpresa.classList.add("bg-gray-200", "text-gray-700");
    btnEmpresa.classList.remove("bg-red-600", "text-white");


    // Activar usuario
    formUsuario.classList.remove("opacity-50", "pointer-events-none", "bg-gray-100");
    formUsuario.classList.add("bg-red-50");


    // Desactivar empresa
    formEmpresa.classList.add("opacity-50", "pointer-events-none", "bg-gray-100");
    formEmpresa.classList.remove("bg-red-50");
  });


  btnEmpresa.addEventListener("click", () => {
    // Estilos botones
    btnEmpresa.classList.add("bg-red-600", "text-white");
    btnEmpresa.classList.remove("bg-gray-200", "text-gray-700");


    btnUsuario.classList.add("bg-gray-200", "text-gray-700");
    btnUsuario.classList.remove("bg-red-600", "text-white");


    // Activar empresa
    formEmpresa.classList.remove("opacity-50", "pointer-events-none", "bg-gray-100");
    formEmpresa.classList.add("bg-red-50");


    // Desactivar usuario
    formUsuario.classList.add("opacity-50", "pointer-events-none", "bg-gray-100");
    formUsuario.classList.remove("bg-red-50");
  });
});


// modal.js

const loginModal = document.getElementById('loginModal');
const openLoginModal = document.getElementById('openLoginModal');
const closeLoginModal = document.getElementById('closeLoginModal');


openLoginModal.addEventListener('click', (e) => {
  e.preventDefault(); // Evita que el enlace recargue la página
  loginModal.classList.remove('hidden');
});

closeLoginModal.addEventListener('click', () => {
  loginModal.classList.add('hidden');
});

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener('click', (e) => {
  if (e.target === loginModal) {
    loginModal.classList.add('hidden');
  }
});

