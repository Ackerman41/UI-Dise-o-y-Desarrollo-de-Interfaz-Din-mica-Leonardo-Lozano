const botonFigura = document.querySelector("#botonFigura");
const opciones = document.querySelector("#opciones");
const eliminar = document.querySelector("#eliminar");
const pantalla = document.querySelector("#pantalla");
const contador = document.querySelector("#contador");
const mensaje = document.querySelector("#mensaje");

let figuras = [];

const MAXIMO = 5;

botonFigura.addEventListener("click", () => {
    opciones.classList.toggle("mostrar");
});

const opcionesFigura = document.querySelectorAll(".opcion");

opcionesFigura.forEach(opcion => {
    opcion.addEventListener("click", () => {
        let figuraSeleccionada = opcion.dataset.figura;
        agregarFigura(figuraSeleccionada);
        opciones.classList.remove("mostrar");

    });
});

function agregarFigura(figura) {
    if (figuras.length >= MAXIMO) {
        if (figuras[0] === figura) {
            mensaje.textContent =
                "La primera figura ya es la misma. No se realizó ningún cambio.";
        }
        else {
            // Reemplaza la primera
            figuras[0] = figura;

            mensaje.textContent ="Se alcanzó el límite. Se reemplazó la primera figura.";

        }
    }
    else {
        figuras.push(figura);
        mensaje.textContent ="Se agregó una figura nueva.";
    }

    mostrarFiguras();
}

eliminar.addEventListener("click", () => {
    if (figuras.length > 0) {
        figuras.pop();
        mensaje.textContent ="Se eliminó la última imagen.";
        mostrarFiguras();
    }
    else {
        mensaje.textContent ="No hay imagenes para eliminar.";
    }
});

function mostrarFiguras() {
    pantalla.innerHTML = "";
    figuras.forEach(figura => {
        const imagen = document.createElement("img");
        imagen.classList.add("figura");
        if (figura === "Cassidy") {

            imagen.src ="/img/Cass.jpeg";
        }
        else if (figura === "Shion") {

            imagen.src ="/img/Shion.webp";
        }
        else if (figura === "Ramattra") {

            imagen.src ="/img/Ram.jpeg";
        }
        pantalla.appendChild(imagen);
    });
    contador.textContent =
        "Figuras: " + figuras.length + " de 5";
}