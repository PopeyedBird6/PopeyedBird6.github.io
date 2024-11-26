let carrito = [];
const productos = [
  { emoji: "🧸", nombre: "Juguete de Felpa", precio: 10, categoria: "Juguetes" },
  { emoji: "🍖", nombre: "Hueso Masticable", precio: 5, categoria: "Snacks" },
  { emoji: "🎀", nombre: "Collar Elegante", precio: 15, categoria: "Accesorios" },
  { emoji: "🍪", nombre: "Galletas Samoyedas", precio: 8, categoria: "Snacks" },
  { emoji: "🦴", nombre: "Hueso de Plástico", precio: 7, categoria: "Juguetes" }
  // Puedes agregar más productos aquí
];

// Mostrar todos los productos por categoría al cargar la página
function mostrarProductos() {
  document.getElementById("productos").style.display = "block";
  document.getElementById("carrito").style.display = "none";
  generarListaPorCategoria(productos);
}

// Mostrar el carrito
function mostrarCarrito() {
  document.getElementById("productos").style.display = "none";
  document.getElementById("carrito").style.display = "block";
  actualizarCarrito();
}

// Generar lista de productos agrupados por categoría
function generarListaPorCategoria(lista) {
  const categorias = {};
  lista.forEach(producto => {
    if (!categorias[producto.categoria]) {
      categorias[producto.categoria] = [];
    }
    categorias[producto.categoria].push(producto);
  });

  const listaCategorias = document.getElementById("lista-categorias");
  listaCategorias.innerHTML = "";

  Object.keys(categorias).forEach(categoria => {
    const tabla = document.createElement("table");
    tabla.innerHTML = `
      <caption>${categoria}</caption>
      <tr>
        <th>Emoji</th>
        <th>Producto</th>
        <th>Precio</th>
        <th>Acción</th>
      </tr>
    `;

    categorias[categoria].forEach(producto => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${producto.emoji}</td>
        <td>${producto.nombre}</td>
        <td>$${producto.precio.toFixed(2)}</td>
        <td><button onclick="agregarAlCarrito('${producto.emoji}', '${producto.nombre}', ${producto.precio})">Agregar</button></td>
      `;
      tabla.appendChild(fila);
    });

    listaCategorias.appendChild(tabla);
  });
}

// Filtrar productos al escribir en el buscador
function buscarProductos() {
  const terminoBusqueda = document.getElementById("buscador").value.toLowerCase();
  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(terminoBusqueda)
  );
  generarListaPorCategoria(productosFiltrados);
}

// Agregar productos al carrito
function agregarAlCarrito(emoji, nombre, precio) {
  const producto = carrito.find(item => item.nombre === nombre);
  if (producto) {
    producto.cantidad += 1;
  } else {
    carrito.push({ emoji, nombre, precio, cantidad: 1 });
  }
  alert(`${emoji} ${nombre} agregado al carrito 🐾`);
}

// Actualizar la vista del carrito
function actualizarCarrito() {
  const carritoItems = document.getElementById("carrito-items");
  carritoItems.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    const itemTotal = item.precio * item.cantidad;
    total += itemTotal;

    carritoItems.innerHTML += `
      <tr>
        <td>${item.emoji}</td>
        <td>${item.nombre}</td>
        <td><input type="number" value="${item.cantidad}" min="1" onchange="cambiarCantidad(${index}, this.value)"></td>
        <td>$${item.precio.toFixed(2)}</td>
        <td>$${itemTotal.toFixed(2)}</td>
        <td><button onclick="eliminarDelCarrito(${index})">Eliminar</button></td>
      </tr>
    `;
  });

  document.getElementById("total-carrito").innerText = total.toFixed(2);
}

// Cambiar la cantidad de productos en el carrito
function cambiarCantidad(index, cantidad) {
  carrito[index].cantidad = parseInt(cantidad);
  actualizarCarrito();
}

// Eliminar un producto del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// Finalizar compra
function finalizarCompra() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío, ¡agrega algo para tu samoyedo! 🐶");
    return;
  }

  carrito = [];
  actualizarCarrito();
  alert("Compra finalizada 🐾 ¡Gracias por consentir a tu samoyedo!");
}

// Cargar todos los productos al inicio
document.addEventListener("DOMContentLoaded", mostrarProductos);
