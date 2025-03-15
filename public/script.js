async function register() {
    const user = {
        email: document.getElementById("email").value,
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        telefono: document.getElementById("telefono").value,
        tipo: document.getElementById("tipo").value,
        clave: document.getElementById("clave").value
    };

    const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });

    const data = await response.json();
    alert(data.error || "Registro exitoso!");
}

async function login() {
    const credentials = {
        email: document.getElementById("login-email").value,
        clave: document.getElementById("login-clave").value
    };

    const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
    });

    const data = await response.json();
    if (data.token) {
        alert("Login exitoso!");
        localStorage.setItem("token", data.token);
    } else {
        alert(data.error || "Error al iniciar sesión");
    }
}
