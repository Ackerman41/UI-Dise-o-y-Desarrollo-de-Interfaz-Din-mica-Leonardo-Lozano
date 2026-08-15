const contenedor = document.getElementById('contenedor');
const contadorImagenes = document.getElementById('contadorImagenes');
const mensajeError = document.getElementById('mensajeError');
const maximoImagenes = 5;

function actualizarContador() {
    const cantidadActual = contenedor.children.length;
    contadorImagenes.textContent = `${cantidadActual}/${maximoImagenes}`;
}

function crearImagen() {
    if (contenedor.children.length >= maximoImagenes) {
        mensajeError.textContent = 'No se pueden agregar mas imagenes';
        mensajeError.classList.add('mostrar');
        return;
    }

    const imgNueva = document.createElement('img');
    imgNueva.src = 'recursos/shion.jpg';
    contenedor.appendChild(imgNueva);

    mensajeError.textContent = '';
    mensajeError.classList.remove('mostrar');
    actualizarContador();
}

function eliminarImagen() {
    if (contenedor.lastChild) {
        contenedor.removeChild(contenedor.lastChild);
    }
}

/*
Contador de imagenes 1/5 en la parte superior de la pantalla en verde, 
no se pueden agregar mas de 5, 
si ya son las 5 imagenes debe aparecer un mensaje 
que diga: no se pueden agregar mas imagenes, abajo del boton en rojo 
textContent
classList.Add()
*/
