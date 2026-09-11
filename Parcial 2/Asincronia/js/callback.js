const icono = document.querySelector("#icono");

const animacion = icono.animate(
    [
        { transform: "rotate(0deg)" },
        { transform: "rotate(360deg)" }
    ],
    {
        duration: 1000,
        iterations: Infinity
    }
);

function verificarEstado() {
    setTimeout(() => {
        animacion.cancel(); 

        icono.src = "/recursos/cat.jpg"; 

    }, 3000);
}

verificarEstado();