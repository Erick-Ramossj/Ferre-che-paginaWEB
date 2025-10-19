document.addEventListener('DOMContentLoaded', () => {
    // ==================================================
    // PARTE 1: CÓDIGO DEL ACORDEÓN (Tu código actual)
    // ==================================================
    // Seleccionamos todos los botones que abren/cierran los filtros.
    const accordionButtons = document.querySelectorAll('[id^="accordion-button-"]');

    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Obtenemos el número del ID para encontrar el contenido que corresponde.
            const accordionNumber = button.id.split('-').pop();
            const content = document.getElementById(`accordion-content-${accordionNumber}`);
            const icon = button.querySelector('div'); // El div que contiene el ícono de flecha.

            // Muestra u oculta la lista de opciones.
            content.classList.toggle('hidden');
            // Gira la flecha.
            icon.classList.toggle('rotate-180');
        });
    });

    // ==================================================
    // PARTE 2: LÓGICA DE FILTRADO DE PRODUCTOS (Lo nuevo)
    // ==================================================
    // Seleccionamos todas las opciones de los filtros (ej. "Amarillo", "Construcción").
    const filterOptions = document.querySelectorAll('.filter-option');
    // Seleccionamos todas las tarjetas de productos.
    const productCards = document.querySelectorAll('.product-card');

    // Creamos un objeto para guardar qué filtro está activo en cada categoría.
    // Al principio, ninguno está activo, por eso 'todos'.
    let activeFilters = {
        genero: 'todos',
        color: 'todos',
        rubro: 'todos'
    };

    // Añadimos un 'escuchador' de clics a cada opción de filtro.
    filterOptions.forEach(option => {
        option.addEventListener('click', () => {
            const filterType = option.dataset.filterType;   // ej: 'color'
            const filterValue = option.dataset.filterValue; // ej: 'amarillo'

            // Actualizamos nuestro objeto con el nuevo filtro seleccionado.
            activeFilters[filterType] = filterValue;

            // Llamamos a la función principal que aplica los cambios.
            applyFilters();
        });
    });

    function applyFilters() {
        // Recorremos cada tarjeta de producto, una por una.
        productCards.forEach(card => {
            // Obtenemos los datos de la tarjeta actual.
            const cardGenero = card.dataset.genero;
            const cardColor = card.dataset.color;
            const cardRubro = card.dataset.rubro;

            // Comprobamos si la tarjeta cumple con CADA UNO de los filtros activos.
            // Un filtro se cumple si es 'todos' o si coincide con el dato de la tarjeta.
            const generoMatch = activeFilters.genero === 'todos' || activeFilters.genero === cardGenero;
            const colorMatch = activeFilters.color === 'todos' || activeFilters.color === cardColor;
            const rubroMatch = activeFilters.rubro === 'todos' || activeFilters.rubro === cardRubro;

            // Si la tarjeta cumple con TODOS los filtros a la vez, la mostramos.
            // Si falla en al menos uno, la ocultamos.
            if (generoMatch && colorMatch && rubroMatch) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }
});