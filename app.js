const API_URL = 'https://inventario-backend-9yx1.onrender.com/productos';

async function obtenerProductos() {
    const res = await fetch(API_URL);
    const datos = await res.json();

    const tabla = document.getElementById('tabla');
    tabla.innerHTML = '';

    datos.forEach(prod => {
        tabla.innerHTML += `
            <tr>
                <td>${prod.nombre}</td>
                <td>$${prod.precio}</td>
                <td>${prod.existencia} pzas</td>
            </tr>
        `;
    });
}

document.getElementById('formProducto').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nuevoProducto = {
        nombre: document.getElementById('nombre').value,
        precio: Number(document.getElementById('precio').value),
        existencia: Number(document.getElementById('existencia').value)
    };

    await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoProducto)
    });

    e.target.reset();

    obtenerProductos();
});

obtenerProductos();