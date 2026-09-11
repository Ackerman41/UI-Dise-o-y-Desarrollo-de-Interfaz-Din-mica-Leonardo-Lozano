const personaje = document.querySelector("#personaje");
const botonplay = document.querySelector("#play");
const botonpause = document.querySelector("#pause");

const animacion = personaje.animate(
    [
        {
            backgroundImage: 'url("../recursos/gatito_corriendo/1-01.png")',
            offset: 0,
            transform: "translateX(0)"
        },
        {
            backgroundImage: 'url("../recursos/gatito_corriendo/2-01.png")',
            offset: 1 / 6,
            transform: "translateX(200px)"
        },
        {
            backgroundImage: 'url("../recursos/gatito_corriendo/3-01.png")',
            offset: 2 / 6,
            transform: "translateX(400px)"
        },
        {
            backgroundImage: 'url("../recursos/gatito_corriendo/4-01.png")',
            offset: 3 / 6,
            transform: "translateX(600px)"
        },
        {
            backgroundImage: 'url("../recursos/gatito_corriendo/5-01.png")',
            offset: 4 / 6,
            transform: "translateX(800px)"
        },
        {
            backgroundImage: 'url("../recursos/gatito_corriendo/6-01.png")',
            offset: 5 / 6,
            transform: "translateX(1000px)"
        },
        {
            backgroundImage: 'url("../recursos/gatito_corriendo/1-01.png")',
            offset: 1,
            transform: "translateX(1200px)"
        }
    ],
    {
        duration: 600,
        iterations: Infinity,
        easing: "steps(6, end)"
    }
);

animacion.play();

botonplay.addEventListener("click", function(){
    animacion.play();
})

botonpause.addEventListener("click", function(){
    animacion.pause();
})

