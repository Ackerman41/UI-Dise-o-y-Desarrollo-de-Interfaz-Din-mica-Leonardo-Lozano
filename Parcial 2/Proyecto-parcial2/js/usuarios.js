export class Usuario {
    constructor(id, nombre, correo, contrasena, foto = "https://picsum.photos/150") {
        this.id = id ?? 0;
        this.nombre = nombre ?? "";
        this.correo = correo ?? "";
        this.contrasena = contrasena ?? "";
        this.foto = foto || "https://picsum.photos/150";
    }

    MostrarDatos() {
        console.log(`ID: ${this.id} | Nombre: ${this.nombre} | Correo: ${this.correo}`);
    }
}