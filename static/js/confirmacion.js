document.addEventListener("DOMContentLoaded", () => {
  const btnRegistrarse = document.getElementById("btnUsuarioRegistro");
  const btnEmpresa = document.getElementById("btnEmpresaRegistro");
  const modalExito = document.getElementById("modalExito");
  const modalContenido = document.getElementById("modalContenido");
  const cerrarModal = document.getElementById("cerrarModal");
  const cerrarModalBtn = document.getElementById("cerrarModalBtn");

  function abrirModal() {
    modalExito.classList.remove("hidden");
    modalExito.classList.add("flex");

    setTimeout(() => {
      modalContenido.classList.remove("scale-95", "opacity-0");
      modalContenido.classList.add("scale-100", "opacity-100");
    }, 50);
  }

  function cerrar() {
    modalContenido.classList.remove("scale-100", "opacity-100");
    modalContenido.classList.add("scale-95", "opacity-0");
    setTimeout(() => {
      modalExito.classList.add("hidden");
      modalExito.classList.remove("flex");
    }, 200);
  }

  btnUsuarioRegistro.addEventListener("click", abrirModal);
  btnEmpresaRegistro.addEventListener("click", abrirModal);
  cerrarModal.addEventListener("click", cerrar);
  cerrarModalBtn.addEventListener("click", cerrar);
});