async function mostrarCarrito() {
    const container = document.getElementById("carritoContainer");
    container.innerHTML = ""; // Limpiar contenido anterior
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        container.innerHTML = "<p>No hay productos en el carrito</p>";
        return;
    }

    const detalles = await Promise.all(carrito.map(id =>
        fetch(`http://localhost:5100/products/${id}`).then(res => res.json())
    ));

    detalles.forEach((prod, index) => {
        const div = document.createElement("div");
        div.className = "bg-white p-4 shadow rounded mb-3 flex justify-between items-center";
        div.innerHTML = `
            <div>
                <h4 class="text-xl font-bold">${prod.nombre}</h4>
                <p>Precio: $${prod.precio}</p>
                <p>Stock actual: ${prod.stock}</p>
            </div>
            <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onclick="eliminarDelCarrito(${index})">
                Eliminar
            </button>
        `;
        container.appendChild(div);
    });
}
async function eliminarDelCarrito(index) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1); // Elimina el producto por su índice
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito(); // Recargar la vista del carrito
}


async function generarFacturaEmergente(nombreCliente, productos) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Factura - Farmacia Salud Plus", 20, 20);

    doc.setFontSize(12);
    doc.text(`Cliente: ${nombreCliente}`, 20, 35);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 45);
    doc.text("Productos:", 20, 55);

    let y = 65;
    let total = 0;

    productos.forEach((p, index) => {
        const subtotal = p.precio;
        total += subtotal;
        doc.text(`${index + 1}. ${p.nombre} - $${p.precio}`, 20, y);
        y += 10;
    });

    doc.setFontSize(14);
    doc.text(`Total a pagar: $${total}`, 20, y + 10);

    const pdfBlob = doc.output("blob");
    const blobUrl = URL.createObjectURL(pdfBlob);
    window.open(blobUrl, "_blank");
}

async function finalizarCompra() {
    const usuario = localStorage.getItem("nombreUsuario");
    const usuarioId = localStorage.getItem("usuarioId");
    const token = localStorage.getItem("token");

    if (!usuario || !token || !usuarioId) {
        alert("Debes iniciar sesión para finalizar la compra.");
        window.location.href = "login.html";
        return;
    }

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de finalizar la compra.");
        return;
    }

    const detalles = await Promise.all(carrito.map(id =>
        fetch(`http://localhost:5100/products/${id}`).then(res => res.json())
    ));

    // Actualizar stock
    for (const id of carrito) {
        await fetch(`http://localhost:5100/products/comprar/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
    }

    // Calcular total
    const productosCompra = detalles.map(prod => ({
        productoId: prod._id,
        nombre: prod.nombre,
        cantidad: 1,
        precioUnitario: prod.precio
    }));

    const total = productosCompra.reduce((sum, p) => sum + p.precioUnitario, 0);

    // Guardar en la base de datos
    await fetch("http://localhost:5100/compras/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            usuarioId,
            nombreUsuario: usuario,
            productos: productosCompra,
            total
        })
    });

    await generarFacturaEmergente(usuario, detalles);

    localStorage.removeItem("carrito");
    alert(`Gracias por tu compra, ${usuario}`);
    location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);

