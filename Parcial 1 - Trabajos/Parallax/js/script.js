const titulo = document.querySelector("#titulo");
const montañas = document.querySelector("#montañas");
const perrito = document.querySelector("#perrito");
const hojas = document.querySelector("#hojas");
const contenedor = document.querySelector("#contenedor_parallax")

const duracion = 3000;

const animacion = [
    titulo.animate(
        [
            { transform: "translateX(0)" },
            { transform: "translateX(-100w)"}
        ],
        {
            duration: duration,
            fill: "both",
            easing: "linear"
        }),
    montañas.animate(
        [ 
            { transform: "translateY(0)" },
            { transform: "translateY(40vw)" }
        ],
        {
            duration: duration,
            fill: "both",
            easing: "linear"
        }),
    perrito.animate(
        [ 
            { transform: "translateY(0)" },
            { transform: "translateY(-60vw)" }
        ],
        {
            duration: duration,
            fill: "both",
            easing: "linear"
        }),
    hojas.animate(
        [ 
            { transform: "translateY(0)" },
            { transform: "translateY(60vw)" }
        ],
        {
            duration: duration,
            fill: "both",
            easing: "linear"
        }
    ),      
]

for(let i = 0; i < animacion.length; i++){
    animacion[i].pause();
}

/*
calcular el progreso de la animacion
    0 - 1 el progreso de animacion
*/ 

function actualizarParallax() {
    const distancia = contenedor.offsetHeight;
    const progreso = Math.min(window.scrollY / distancia, 1);
    const tiempo = progreso * distancia;

    animacion.forEach((elemento)=>{
       elemento.currentTime = tiempo; 
    })
}

window.addEventListener("scroll", actualizarParallax);

actualizarParallax();

//animacion.pausa();
//animacion.play();
//animacion.cancel();
//animacion.reverse();