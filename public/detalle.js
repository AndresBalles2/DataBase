const params = new URLSearchParams(window.location.search);
const id = params.get("id");

document.addEventListener("DOMContentLoaded", async () => {
    const contenedor = document.getElementById("detalleContainer");

    try {
        const res = await fetch(`http://localhost:5100/products/${id}`);
        const producto = await res.json();

        contenedor.innerHTML = `
            <img src="${producto.imagen}" class="w-full h-64 object-cover rounded" />
            <h1 class="text-3xl font-bold mt-4">${producto.nombre}</h1>
            <p class="mt-2">${producto.descripcion}</p>
            <p class="text-green-600 text-2xl font-bold mt-2">$${producto.precio}</p>
            <button onclick="agregarAlCarrito('${producto._id}')" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Agregar al carrito</button>
        `;
    } catch (error) {
        contenedor.innerHTML = "Error al cargar el producto";
    }
});

function agregarAlCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado al carrito");
}
