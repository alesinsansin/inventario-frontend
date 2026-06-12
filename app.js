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

                <td>

                    <button
                    class="btn-editar"
                    onclick="editarProducto(
                    '${prod._id}',
                    '${prod.nombre}',
                    ${prod.precio},
                    ${prod.existencia}
                    )">
                    Editar
                    </button>

                    <button
                    class="btn-eliminar"
                    onclick="eliminarProducto('${prod._id}')">
                    Eliminar
                    </button>

                </td>

            </tr>
        `;
    });
}

document.getElementById('formProducto').addEventListener('submit', async (e) => {

    e.preventDefault();

    const id = document.getElementById('productoId').value;

    const producto = {
        nombre: document.getElementById('nombre').value,
        precio: Number(document.getElementById('precio').value),
        existencia: Number(document.getElementById('existencia').value)
    };

    if(id){

        await fetch(`${API_URL}/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(producto)
        });

    }else{

        await fetch(API_URL,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(producto)
        });

    }

    document.getElementById('formProducto').reset();

    document.getElementById('productoId').value='';

    document.getElementById('tituloFormulario').textContent =
    'Registrar Producto';

    document.getElementById('btnGuardar').textContent =
    'Enviar a la Nube';

    obtenerProductos();

});

function editarProducto(id,nombre,precio,existencia){

    document.getElementById('productoId').value=id;

    document.getElementById('nombre').value=nombre;

    document.getElementById('precio').value=precio;

    document.getElementById('existencia').value=existencia;

    document.getElementById('tituloFormulario').textContent =
    'Editar Producto';

    document.getElementById('btnGuardar').textContent =
    'Actualizar Producto';

}

async function eliminarProducto(id){

    if(confirm('¿Deseas eliminar este producto?')){

        await fetch(`${API_URL}/${id}`,{
            method:'DELETE'
        });

        obtenerProductos();
    }

}

obtenerProductos();