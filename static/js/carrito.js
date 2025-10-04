// Costo fijo de envío (puede venir de servidor en implementación real)
const ENVIO_COST = 15.00;

// Obtiene el carrito desde localStorage, o un array vacío si no existe
function getCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

// Guarda el carrito en localStorage
function setCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Actualiza el monto del carrito en el header (intenta usar el id, si existe)
function actualizarCarritoHeader() {
    const carrito = getCarrito();
    let subtotal = 0;
    carrito.forEach(item => subtotal += (item.precio || 0) * (item.cantidad || 0));
    const headerSpan = document.getElementById('cart-header-total');
    if (headerSpan) {
        headerSpan.textContent = `Carrito S/${subtotal.toFixed(2)}`;
        return;
    }
    // Fallback: busca el último span dentro del enlace al carrito
    const carritoSpan = document.querySelector('a[href*="carrito"] span:last-child');
    if (carritoSpan) carritoSpan.textContent = `Carrito S/${subtotal.toFixed(2)}`;
}

// Muestra una notificación tipo toast cuando se agrega o actualiza un producto
function mostrarToast(mensaje = "Producto agregado al carrito") {
    console.log('mostrarToast called:', mensaje);
    let toast = document.getElementById("toast");
    // Si no existe el toast en el DOM (mal insertado), lo creamos temporalmente
    let createdTemp = false;
    if (!toast) {
        createdTemp = true;
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'fixed top-6 right-6 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold text-base opacity-0 pointer-events-none transition-opacity duration-500';
        const span = document.createElement('span');
        span.id = 'toast-msg';
        toast.appendChild(span);
        document.body.appendChild(toast);
    }
    const toastMsg = document.getElementById('toast-msg');
    if (toastMsg) toastMsg.textContent = mensaje; else toast.textContent = mensaje;
    // Mostrar (clases + fallback inline)
    toast.classList.remove('opacity-0');
    toast.classList.add('opacity-100');
    toast.classList.remove('pointer-events-none');
    // Fallback inline por si Tailwind no aplica inmediatamente
    toast.style.opacity = '1';
    toast.style.pointerEvents = 'auto';
    // Duración visible (2s)
    setTimeout(() => {
        // Ocultar (clases + fallback inline)
        toast.classList.remove('opacity-100');
        toast.classList.add('opacity-0');
        toast.classList.add('pointer-events-none');
        toast.style.opacity = '0';
        toast.style.pointerEvents = 'none';
        // Si lo creamos temporalmente, lo eliminamos del DOM después de ocultarlo
        if (createdTemp) {
            setTimeout(() => { if (toast && toast.parentNode) toast.parentNode.removeChild(toast); }, 300);
        }
    }, 2000);
}

/**
 * renderCarrito
 * - Lee el carrito desde localStorage y construye el HTML del listado
 * - Actualiza subtotal, envío y total en el panel derecho y el header
 */
function renderCarrito() {
    const carrito = getCarrito();
    const carritoItems = document.getElementById("carrito-items");
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total");
    const envioEl = document.getElementById("envio");
    const cartHeaderTotal = document.getElementById("cart-header-total");

    // Si no estamos en la página del carrito, salir
    if (!carritoItems) return;

    carritoItems.innerHTML = "";
    let subtotal = 0;

    // Mensaje cuando el carrito está vacío
    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p class="text-gray-500 italic p-4 text-center">Tu carrito está vacío. ¡Añade productos!</p>';
    }

    // Construye cada fila del carrito
    carrito.forEach((item, index) => {
        subtotal += (item.precio || 0) * (item.cantidad || 0);
        carritoItems.innerHTML += `
          <div class="flex items-center bg-white rounded-lg shadow p-4 mb-4">
            <img src="${item.img}" alt="${item.nombre}" class="w-24 h-24 object-contain mr-6">
            <div class="flex-1">
              <h3 class="font-semibold text-gray-800">${item.nombre}</h3>
              <p class="text-gray-600 text-sm mt-1">S/ ${Number(item.precio).toFixed(2)}</p>
            </div>
            <div class="flex items-center gap-2 mx-6">
              <button onclick="cambiarCantidad(${index}, -1)" class="bg-gray-200 text-gray-700 w-8 h-8 rounded">-</button>
              <span class="text-lg">${item.cantidad}</span>
              <button onclick="cambiarCantidad(${index}, 1)" class="bg-gray-200 text-gray-700 w-8 h-8 rounded">+</button>
            </div>
                        <p class="font-bold text-lg text-gray-900 w-20 text-right">S/ ${(Number(item.precio) * item.cantidad).toFixed(2)}</p>
                        <button onclick="eliminarProductoConfirm(${index})" aria-label="Eliminar" title="Eliminar" class="ml-4 text-gray-400 hover:text-red-600">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M9 3v1H4v2h16V4h-5V3H9zm1 6v9h2V9H10zM7 9v9h2V9H7zm8 0v9h2V9h-2z" />
                            </svg>
                        </button>
          </div>
        `;
    });

    // Actualiza valores del resumen
    if (subtotalEl) subtotalEl.textContent = `S/ ${subtotal.toFixed(2)}`;
    const totalEnvio = carrito.length > 0 ? ENVIO_COST : 0.00;
    if (envioEl) envioEl.textContent = `S/ ${totalEnvio.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `S/ ${(subtotal + totalEnvio).toFixed(2)}`;
    if (cartHeaderTotal) cartHeaderTotal.textContent = `Carrito S/${subtotal.toFixed(2)}`;
}

/**
 * cambiarCantidad
 * - Cambia la cantidad de un producto en el carrito (por índice)
 * - Si la cantidad llega a 0, elimina el producto
 */
function cambiarCantidad(index, delta) {
    const carrito = getCarrito();
    if (!carrito[index]) return;
    carrito[index].cantidad += delta;
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }
    setCarrito(carrito);
    renderCarrito();
    actualizarCarritoHeader();
}

/**
 * eliminarProducto
 * - Elimina un producto del carrito por su índice
 */
function eliminarProducto(index) {
    const carrito = getCarrito();
    carrito.splice(index, 1);
    setCarrito(carrito);
    renderCarrito();
    actualizarCarritoHeader();
}

// Elimina un producto con confirmación del usuario
function eliminarProductoConfirm(index) {
    const carrito = getCarrito();
    const item = carrito[index];
    const nombre = item ? item.nombre : 'este producto';
    if (confirm(`¿Eliminar ${nombre} del carrito?`)) {
        eliminarProducto(index);
    }
}

// Cuando el DOM está listo...
document.addEventListener("DOMContentLoaded", function() {
    // Busca todos los botones de productos y los conecta (si existen)
    document.querySelectorAll('button').forEach(btn => {
        // Si el botón parece ser de "Agregar al carrito" (texto localizado)
        // Hacemos una comprobación insensible a mayúsculas y que acepte variantes
        const txt = (btn.textContent || '').trim().toLowerCase();
        if (txt && txt.includes('agregar') && (txt.includes('carrito') || txt.includes('al carrito'))) {
            btn.addEventListener('click', function() {
                // Busca los datos del producto en la tarjeta
                const card = btn.closest('div.bg-white');
                if (!card) return;
                const h3 = card.querySelector('h3');
                const nombre = h3 ? h3.textContent.trim() : 'Producto';
                const precioP = card.querySelector('p.font-bold') || card.querySelector('p');
                const precioTexto = precioP ? precioP.textContent.replace(/[^\d.,]/g, '').replace(',', '.') : '0';
                const precio = parseFloat(precioTexto) || 0;
                const imgEl = card.querySelector('img');
                const img = imgEl ? imgEl.getAttribute('src') : '';
                let carrito = getCarrito();
                // Si ya existe, suma cantidad; si no, lo agrega
                const existente = carrito.find(item => item.nombre === nombre);
                if (existente) {
                    existente.cantidad += 1;
                    mostrarToast("Cantidad actualizada en el carrito");
                } else {
                    carrito.push({ nombre, precio, cantidad: 1, img });
                    mostrarToast("Producto agregado al carrito");
                }
                setCarrito(carrito);
                actualizarCarritoHeader();
            });
            // marcar que este botón ya fue enlazado
            btn.dataset.bound = '1';
        }
    });

    // Fallback: delegación global para capturar clicks en botones "Agregar" que no fueron enlazados
    document.addEventListener('click', function(e) {
        const btn = e.target.closest && e.target.closest('button');
        if (!btn) return;
        // si ya estaba enlazado por arriba, no hacemos nada
        if (btn.dataset && btn.dataset.bound) return;
        const txt = (btn.textContent || '').trim().toLowerCase();
        if (txt && txt.includes('agregar') && (txt.includes('carrito') || txt.includes('al carrito') || txt.includes('al carrito'))) {
            // intentar extraer datos del card
            const card = btn.closest('div.bg-white');
            if (!card) return;
            const h3 = card.querySelector('h3');
            const nombre = h3 ? h3.textContent.trim() : 'Producto';
            const precioP = card.querySelector('p.font-bold') || card.querySelector('p');
            const precioTexto = precioP ? precioP.textContent.replace(/[^\d.,]/g, '').replace(',', '.') : '0';
            const precio = parseFloat(precioTexto) || 0;
            const imgEl = card.querySelector('img');
            const img = imgEl ? imgEl.getAttribute('src') : '';
            let carrito = getCarrito();
            const existente = carrito.find(item => item.nombre === nombre);
            if (existente) {
                existente.cantidad += 1;
                mostrarToast("Cantidad actualizada en el carrito");
            } else {
                carrito.push({ nombre, precio, cantidad: 1, img });
                mostrarToast("Producto agregado al carrito");
            }
            setCarrito(carrito);
            actualizarCarritoHeader();
            // marcar para no procesarlo dos veces
            btn.dataset.bound = '1';
        }
    });

    // Actualiza el header del carrito al cargar la página
    actualizarCarritoHeader();

    // Si estamos en la página del carrito, renderizar su contenido
    renderCarrito();
});
