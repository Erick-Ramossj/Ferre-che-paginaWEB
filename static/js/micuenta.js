let currentField = "";

// Función para abrir el modal
function editField(field) {
  currentField = field;
  const modal = document.getElementById("modal");
  const input = document.getElementById("modal-input");
  const title = document.getElementById("modal-title");

  // Título dinámico
  const titles = {
    email: "Editar Correo Electrónico",
    phone: "Editar Número de Teléfono",
    address: "Editar Dirección"
  };
  title.innerText = titles[field] || "Editar";

  // Valor actual
  input.value = document.getElementById(`${field}-value`).innerText;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

// Guardar cambios
function saveEdit() {
  const input = document.getElementById("modal-input");
  document.getElementById(`${currentField}-value`).innerText = input.value;
  closeModal();
}

// Cerrar modal
function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

// Subir nueva imagen de perfil
document.getElementById("profile-img").addEventListener("click", () => {
  document.getElementById("img-input").click();
});

document.getElementById("img-input").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      document.getElementById("profile-img").src = reader.result;
    };
    reader.readAsDataURL(file);
  }
});
