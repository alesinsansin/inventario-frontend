const API_URL = 'https://inventario-backend-9yx1.onrender.com/productos';

async function obtenerProductos() {
  try {
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
  } catch (error) {
    console.error('Error al obtener productos:', error);
    alert('No se pudieron cargar los productos.');
  }
}

document.getElementById('formProducto').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nuevoObj = {
    nombre: document.getElementById('nombre').value,
    precio: Number(document.getElementById('precio').value),
    existencia: Number(document.getElementById('existencia').value)
  };

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoObj)
    });

    e.target.reset();
    obtenerProductos();
  } catch (error) {
    console.error('Error al guardar producto:', error);
    alert('No se pudo guardar el producto.');
  }
});

obtenerProductos();