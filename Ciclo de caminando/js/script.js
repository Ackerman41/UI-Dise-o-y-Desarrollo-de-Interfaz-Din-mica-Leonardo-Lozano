const personaje = document.querySelector("#personaje");

const animacion = personaje.animate(
    [
        {
            backgroundImage: "url(../recursos/gatito_corriendo/1-01.png)",
            offset: 0
        },
        {
            backgroundImage: "url(../recursos/gatito_corriendo/2-01.png)",
            offset: 0.20
        },
        {
            backgroundImage: "url(../recursos/gatito_corriendo/3-01.png)",
            offset: 0.40
        },
        {
            backgroundImage: "url(../recursos/gatito_corriendo/4-01.png)",
            offset: 0.60
        },
        {
            backgroundImage: "url(../recursos/gatito_corriendo/5-01.png)",
            offset: 0.80
        },
        {
            backgroundImage: "url(../recursos/gatito_corriendo/6-01.png)",
            offset: 1
        }
    ],
    {
        duration: 1000,
        easing: "steps(1,end)"
    });

animacion.play();
