import { Usuario } from "./usuarios.js";

/**
 * CRUD: Create, Read, Update, Delete.
 * Implementación asíncrona limpia con cláusulas de guarda.
 */
class GestorUsuarios {
    #usuarios;
    constructor(listaUsuarios = []) {
        this.#usuarios = listaUsuarios;
    }

    async #buscarPorNombre(nombre) {
        return this.#usuarios.find(usuario => usuario.nombre === nombre) || null;
    }

    async #buscarPorCorreo(correo) {
        return this.#usuarios.find(usuario => usuario.correo === correo) || null;
    }

    async #buscarPorID(id) {
        return this.#usuarios.find(usuario => usuario.id === id) || null;
    }

    get usuarios() {
        return this.#usuarios;
    }

    async crearUsuario(nombre, correo, contrasenia, confirmarContrasenia) {
        if (contrasenia !== confirmarContrasenia) {
            throw new Error("Las contraseñas no coinciden");
        }

        if (contrasenia.toString().length < 6) {
            throw new Error("La contraseña es demasiado corta");
        }

        if (await this.#buscarPorNombre(nombre)) {
            throw new Error("El nombre de usuario ya existe");
        }

        if (await this.#buscarPorCorreo(correo)) {
            throw new Error("El correo ya se registró");
        }

        const usuario = new Usuario(this.#usuarios.length + 1, nombre, correo, contrasenia);
        this.#usuarios.push(usuario);
        return usuario;
    }
    //retornar el inicio de sesion con un callback 

    async actualizarCorreo(id, correo) {
        const usuario = await this.#buscarPorID(id);

        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }

        usuario.correo = correo;
        return usuario;
    }

    async eliminarUsuario(id) {
        const usuario = await this.#buscarPorID(id);

        if (!usuario) {
            throw new Error("No se encontró un usuario con ese ID");
        }

        this.#usuarios = this.#usuarios.filter(u => u.id !== id);
        return usuario;
    }
}


// Inicialización de datos de prueba
const gestor = new GestorUsuarios([
    new Usuario(1, "Amancio", "amancio@uacj.mx", 123456),
    new Usuario(2, "Beatriz", "beatriz@uacj.mx", 234567),
    new Usuario(3, "Carlos", "carlos@uacj.mx", 345678),
    new Usuario(4, "Daniela", "daniela@uacj.mx", 456789),
    new Usuario(5, "Eduardo", "eduardo@uacj.mx", 567890),
    new Usuario(6, "Fernanda", "fernanda@uacj.mx", 678901),
    new Usuario(7, "Gerardo", "gerardo@uacj.mx", 789012),
    new Usuario(8, "Hilda", "hilda@uacj.mx", 890123),
    new Usuario(9, "Iván", "ivan@uacj.mx", 901234),
    new Usuario(10, "Julia", "julia@uacj.mx", 102345)
]);

async function probarGestor() {
    console.log("Total de usuarios iniciales:", gestor.usuarios.length);
    try {
        await gestor.actualizarCorreo(4, "nuevo@gmail.com");
        console.log("Correo del ID 4 actualizado con éxito.");

        const usuario_nuevo1 = await gestor.crearUsuario("Pedro", "pedro@uacj.mx", "12345678", "12345678");
        console.log("Usuario creado correctamente:", usuario_nuevo1.nombre);

        const usuario_nuevo2 = await gestor.crearUsuario("Maria", "maria@uacj.mx", "abcdef", "abcdef");
        console.log("Usuario creado correctamente:", usuario_nuevo2.nombre);

        const usuario_nuevo3 = await gestor.crearUsuario("Leo", "leo@uacj.mx", "987654", "987654");
        console.log("Usuario creado correctamente:", usuario_nuevo3.nombre);

    } catch (error) {
        console.error("Error crítico (se detuvo la creación):", error.message);
    }

    try {
        console.log("Error intencional:");
        await gestor.crearUsuario("leo", "leo@uacj.mx", "987654", "000000");
        
    } catch (error) {
        console.warn(" Aviso (Error manejado):", error.message); 
    }

    console.log("Total de usuarios al final:", gestor.usuarios.length);
}

probarGestor();