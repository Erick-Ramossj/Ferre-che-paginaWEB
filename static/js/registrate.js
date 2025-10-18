// Obtener elementos
const btnCliente = document.getElementById("btnCliente");
const btnEmpresa = document.getElementById("btnEmpresa");
const btnContinue = document.getElementById("btnContinue");

let selectedOption = null;

// Función para actualizar selección
function selectOption(option) {
  selectedOption = option;

  // Quitar clase selected de ambos
  btnCliente.classList.remove("selected");
  btnEmpresa.classList.remove("selected");

  // Agregar clase solo al seleccionado
  if (option === "cliente") {
    btnCliente.classList.add("selected");
  } else if (option === "empresa") {
    btnEmpresa.classList.add("selected");
  }

  // Habilitar el botón continuar
  btnContinue.disabled = false;
}

// Eventos de clic para selección
btnCliente.addEventListener("click", () => selectOption("cliente"));
btnEmpresa.addEventListener("click", () => selectOption("empresa"));

// Redirección al hacer clic en continuar según opción seleccionada
btnContinue.addEventListener("click", () => {
  if (!selectedOption) return;

  if (selectedOption === "cliente") {
    window.location.href = "usuario";
  } else if (selectedOption === "empresa") {
    window.location.href = "usuario";
  }
});

// Desactivar botón continuar inicialmente
btnContinue.disabled = true;
