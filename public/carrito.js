async function mostrarCarrito() {
    const container = document.getElementById("carritoContainer");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        container.innerHTML = "<p>No hay productos en el carrito</p>";
        return;
    }

    const detalles = await Promise.all(carrito.map(id =>
        fetch(`http://localhost:5100/products/${id}`).then(res => res.json())
    ));

    detalles.forEach(prod => {
        const div = document.createElement("div");
        div.className = "bg-white p-4 shadow rounded mb-3";
        div.innerHTML = `
            <h4 class="text-xl font-bold">${prod.nombre}</h4>
            <p>Precio: $${prod.precio}</p>
            <p>Stock actual: ${prod.stock}</p>
        `;
        container.appendChild(div);
    });
}

async function finalizarCompra() {
    const usuario = localStorage.getItem("nombreUsuario");
    const token = localStorage.getItem("token");

    if (!usuario || !token) {
        alert("Debes iniciar sesión para finalizar la compra.");
        window.location.href = "login.html";
        return;
    }

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    for (const id of carrito) {
        await fetch(`http://localhost:5100/products/comprar/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                // opcional: si en el backend estás usando autenticación por token
                "Authorization": `Bearer ${token}`
            }
        });
    }

    localStorage.removeItem("carrito");
    alert(`Gracias por tu compra, ${usuario}`);
    location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);
