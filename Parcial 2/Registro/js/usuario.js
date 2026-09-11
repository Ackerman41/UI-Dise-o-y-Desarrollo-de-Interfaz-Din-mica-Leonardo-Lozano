export class Usuario {
    constructor(id, nombre, correo, contrasena) {
        this.id = id,
        this.nombre = nombre,
        this.correo = correo,
        this.contrasena = contrasena
    }
    MostrarDatos() {
        console.log("ID: " + this.id);
        console.log("Nombre: " + this.nombre);
        console.log("Correo: " + this.correo);
        console.log("Contraseña: " + this.contrasena);
    }
}


const usuario = new Usuario(1, "Leonardo Lozano", "leonardo.lozano@example.com", "123");

console.log(usuario);
usuario.MostrarDatos();