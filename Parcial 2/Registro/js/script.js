//esta es la forma de importar in elemento de un archivo
import {Usuario} from "./usuario.js";

const btn_registro = document.querySelector("#btn-registro");

const fomularioRegistro = document.querySelector("#formulario-registro");
const usuarios = [];

function Registrar(evento){
    const formData = new FormData(fomularioRegistro);
    const datos = Object.fromEntries(formData.entries());

    evento.preventDefault();
    
    if(!datos.nombre) 
    Console.error("falta el nombre");
    
    if(!datos.correo) 
    Console.error("falta el correo");
    
    if(!datos.contraseña) 
    Console.error("falta la contraseña");
    
    if(!datos.confirmacion) 
    Console.error("falta confirmar la contraseña");
    
    if(datos.contraseña !== datos.confirmacion){
        console.error("las contraseñas no coinciden");
    }
    else{
        usuarios.push(
            new Usuario(0, datos.nombre, datos.correo, datos.contraseña)      
        );
        console.log("Usuario registrado correctamente");
        console.log(usuarios);
        alert("Usuario registrado correctamente: " + datos.nombre);
    }

}

btn_registro.addEventListener("click", Registrar);

function obtenerDatos() {
    console.log(usuarios);
}
