const formualario = document.querySelector("#formulario");
const input_file = document.querySelector("#file_imagen");

function ObtenerDatos(){
    const datosFormulario = new FormData(formualario);
    const datos = Object.fromEntries(datosFormulario.entries());

    if(datos.nombre !== "" && datos.apellido !== "" && datos.correo !== ""){
       
       console.log(input_file.files[0]);
       if(input_file.files[0]){
            if(input_file.files[0].type === "image/jpeg"||
                input_file.files[0].type === "image/png"
            ){
                const imagen = input_file.files[0];
                const lectorImagen = new FileReader();

                lectorImagen.onload = (dato) => {
                    console.log(dato.target.result);
                    const url = dato.target.result; 
                    crearTerjeta(datos, url);
                }

                lectorImagen.readAsDataURL(imagen);
            }
       }
    }
}

function crearTerjeta(datos, urlImagen){
    const tarjeta = document.createElement("div");
    const nombre = document.createElement("p");
    const apellido = document.createElement("p");
    const correo = document.createElement("p");
    const imagen = document.createElement("img");

    nombre.textContent = datos.nombre;
    apellido.textContent = datos.apellido;
    correo.textContent = datos.correo;
    imagen.src = urlImagen;

    tarjeta.appendChild(nombre);
    tarjeta.appendChild(apellido);  
    tarjeta.appendChild(correo);
    tarjeta.appendChild(imagen);

    document.body.appendChild(tarjeta);
}