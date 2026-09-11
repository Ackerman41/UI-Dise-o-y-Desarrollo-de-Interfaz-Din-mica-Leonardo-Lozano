const urlAPI = "https://pokeapi.co/api/v2/pokemon";

fetch(urlAPI).then(respuesta => {
    if(respuesta.ok){
        return respuesta.json();
    }
}).then(
    
);