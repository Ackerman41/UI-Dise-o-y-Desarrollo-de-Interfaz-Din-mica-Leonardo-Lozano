/*
async function funcionAsyc() {
    try{
        await esperar(2000).then(()=>{
            console.log("pasaron 2 segundos")
        });
        console.log("hola")
    }
    catch(error){
        throw new Error("No funciono esto")
    }
    finally{
        console.log("finalizo la tarea")
    }
}

function esperar(tiempo) {
    const promesa = new Promise((resolve)=>{
        setTimeout(resolve, tiempo);
    });
    return promesa;
} 

funcionAsyc();*/

function peticion(url) {
    const promesa = new Promise((resolve, reject) => {
        fetch(url).then(
            (resultado) => {
                if (!resultado.ok) {
                    reject(new Error("Error en la peticion HTTP: " + resultado.status));
                }
                return resultado.json();
            }
        ).then((datos) => {
            resolve(datos);
        }).catch((error) => {
            reject(error);
        });
    });

    return promesa;
}

const pokemones = peticion("https://pokeapi.co/api/v2/pokemon/")
    .then((datos) => {
        console.log(datos);
    })