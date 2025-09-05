// Productos disponibles
let productos = [
    { id: 1, nombre: "Camiseta", precio: 3500, imagen: "images/remeraazul.png" },
    { id: 2, nombre: "Pantalón", precio: 7000, imagen: "images/pantalonnegro.jpg" },
    { id: 3, nombre: "Zapatillas", precio: 12000, imagen: "images/zapatillasnegras.jpg" }
];

// Carrito (se carga desde localStorage si existe)
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Referencias DOM
const productosDiv = document.getElementById("productos");
const carritoItemsDiv = document.getElementById("carrito-items");
const vaciarBtn = document.getElementById("vaciar");
const formProducto = document.getElementById("form-producto");
const tipoProdInput = document.getElementById("tipo-prod");
const talleProdInput = document.getElementById("talle-prod");
const carritoTotalDiv = document.getElementById("carrito-total");

// Opciones de talles
const tallesRopa = ["XS", "S", "M", "L", "XL", "XXL"];
const tallesZapatillas = [35,36,37,38,39,40,41];

// Cambiar opciones de talle según producto
if (tipoProdInput && talleProdInput) {
    tipoProdInput.addEventListener('change', () => {
        talleProdInput.innerHTML = '<option value="">Selecciona un talle</option>';
        if (tipoProdInput.value === "Camiseta" || tipoProdInput.value === "Pantalón") {
            tallesRopa.forEach(t => {
                talleProdInput.innerHTML += `<option value="${t}">${t}</option>`;
            });
        } else if (tipoProdInput.value === "Zapatillas") {
            tallesZapatillas.forEach(t => {
                talleProdInput.innerHTML += `<option value="${t}">${t}</option>`;
            });
        }
    });
}

// Mostrar productos
function mostrarProductos() {
    productosDiv.innerHTML = "<h2>Productos</h2>";
    productos.forEach(prod => {
        const prodDiv = document.createElement("div");
        prodDiv.className = "producto";
        prodDiv.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}" style="width:80px; height:auto; margin-right:10px; border-radius:8px;">
            <span>${prod.nombre} - $${prod.precio}</span>
            <button data-id="${prod.id}">Agregar</button>
        `;
        productosDiv.appendChild(prodDiv);
    });
    // Eventos agregar
    document.querySelectorAll('.producto button').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.getAttribute('data-id'));
            agregarAlCarrito(id);
        });
    });
}

// Agregar producto al carrito
function agregarAlCarrito(id, talle = null) {
    const prod = productos.find(p => p.id === id);
    let item;
    if (talle) {
        item = carrito.find(p => p.id === id && p.talle === talle);
    } else {
        item = carrito.find(p => p.id === id);
    }
    if (item) {
        item.cantidad++;
    } else {
        let prodACarro = { ...prod, cantidad: 1 };
        if (talle) prodACarro.talle = talle;
        carrito.push(prodACarro);
    }
    guardarCarrito();
    mostrarCarrito();
}

// Quitar producto del carrito
function quitarDelCarrito(id, talle = null) {
    if (talle) {
        carrito = carrito.filter(p => !(p.id === id && p.talle === talle));
    } else {
        carrito = carrito.filter(p => p.id !== id);
    }
    guardarCarrito();
    mostrarCarrito();
}

// Mostrar carrito y total
function mostrarCarrito() {
    carritoItemsDiv.innerHTML = "";
    let total = 0;
    if (carrito.length === 0) {
        carritoItemsDiv.innerHTML = "<p>El carrito está vacío.</p>";
        carritoTotalDiv.innerHTML = "";
        return;
    }
    carrito.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "carrito-item";
        itemDiv.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" style="width:50px; height:auto; margin-right:10px; border-radius:8px;">
            <span>${item.nombre} ${item.talle ? "- Talle: " + item.talle : ""} x${item.cantidad} - $${item.precio * item.cantidad}</span>
            <button data-id="${item.id}" data-talle="${item.talle || ''}">Quitar</button>
        `;
        carritoItemsDiv.appendChild(itemDiv);
        total += item.precio * item.cantidad;
    });
    carritoTotalDiv.innerHTML = `<strong>Total: $${total}</strong>`;
    // Eventos quitar
    document.querySelectorAll('.carrito-item button').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const talle = e.target.getAttribute('data-talle') || null;
            quitarDelCarrito(id, talle);
        });
    });
}

// Guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Agregar producto personalizado desde formulario
formProducto.addEventListener('submit', e => {
    e.preventDefault();
    const nombre = tipoProdInput.value;
    const talle = talleProdInput.value;
    if (!nombre || !talle) return;
    // Precio por defecto según producto
    let precio = 0;
    let imagen = "";
    if (nombre === "Camiseta") { precio = 3500; imagen = "images/remeraazul.png"; }
    if (nombre === "Pantalón") { precio = 7000; imagen = "images/pantalonnegro.jpg"; }
    if (nombre === "Zapatillas") { precio = 12000; imagen = "images/zapatillasnegras.jpg"; }
    const nuevoId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
    const nuevoProd = { id: nuevoId, nombre, precio, imagen };
    productos.push(nuevoProd);
    mostrarProductos();
    agregarAlCarrito(nuevoId, talle);
    tipoProdInput.value = "";
    talleProdInput.innerHTML = '<option value="">Selecciona un talle</option>';
});

// Vaciar carrito y eventos principales
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
    mostrarCarrito();
    vaciarBtn.addEventListener('click', () => {
        carrito = [];
        guardarCarrito();
        mostrarCarrito();
    });
});