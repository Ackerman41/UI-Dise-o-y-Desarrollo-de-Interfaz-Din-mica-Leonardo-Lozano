// Importamos la "plantilla" del Usuario desde su archivo.
import { Usuario } from "./usuarios.js";

// Esta clase es como el "cerebro" o administrador, Se encarga de guardar, buscar, editar y validar a todos los usuarios registrados.
export class GestorUsuarios {
    
    // El símbolo '#' significa que esta lista es PRIVADA. 
    // Nadie fuera de esta clase puede borrar o alterar los usuarios directamente.
    #usuarios;

    // El constructor es lo primero que se ejecuta cuando creamos el gestor.
    constructor(listaInicial = []) {
        // Intentamos buscar si ya hay usuarios guardados en la memoria del navegador
        const guardados = localStorage.getItem("gestor_usuarios");
        
        if (guardados) {
            // Si hay, los transformamos de texto a objetos de JavaScript reales.
            const datos = JSON.parse(guardados);
            
            // Reconstruimos la lista usando nuestra clase Usuario.
            // Nota: Se revisa 'contrasena' por si hay datos viejos guardados.
            this.#usuarios = datos.map(u => new Usuario(u.id, u.nombre, u.correo, u.contrasena || u.contrasenia, u.foto));
        } else {
            //  Si la memoria esta vacia, usamos la lista de prueba que le pasemos y la guardamos.
            this.#usuarios = listaInicial;
            this.#guardar();
        }
    }

    // Si el usuario recarga la pagina, no pierde su cuenta.
    #guardar() {
        localStorage.setItem("gestor_usuarios", JSON.stringify(this.#usuarios));
    }

    // Buscan coincidencias exactas y si no encuentran nada devuelven null.
    async #buscarPorNombre(nombre) {
        return this.#usuarios.find(u => u.nombre.toLowerCase() === nombre.toLowerCase()) || null;
    }

    async #buscarPorCorreo(correo) {
        return this.#usuarios.find(u => u.correo.toLowerCase() === correo.toLowerCase()) || null;
    }

    async #buscarPorID(id) {
        return this.#usuarios.find(u => u.id === Number(id)) || null;
    }

    // Permite que otros archivos vean la lista de usuarios.
    get usuarios() {
        return this.#usuarios;
    }

    // Se encarga de validar todas las reglas antes de registrar a alguien nuevo.
    async crearUsuario(nombre, correo, contrasena, confirmarContrasena, foto) {
        //  Si algo falla, lanzamos un Error y detenemos la función en seco.
        if (!nombre || !correo || !contrasena) {
            throw new Error("Por favor completa todos los campos requeridos");
        }

        if (contrasena !== confirmarContrasena) {
            throw new Error("Las contraseñas no coinciden");
        }

        if (contrasena.toString().length < 6) {
            throw new Error("La contraseña debe tener al menos 6 caracteres");
        }

        if (await this.#buscarPorNombre(nombre)) {
            throw new Error("El nombre de usuario ya existe");
        }

        if (await this.#buscarPorCorreo(correo)) {
            throw new Error("El correo ya está registrado");
        }

        // Si pasamos todos los filtros, asignamos la foto y creamos al usuario asignandole un ID basado en el tamaño de la lista.
        const fotoFinal = foto && foto.trim() !== "" ? foto : "https://picsum.photos/150";
        const nuevoUsuario = new Usuario(this.#usuarios.length + 1, nombre, correo, contrasena, fotoFinal);

        // Lo agregamos a la lista, guardamos en el navegador y devolvemos al usuario creado.
        this.#usuarios.push(nuevoUsuario);
        this.#guardar();
        return nuevoUsuario;
    }

    // Verifica que las credenciales sean correctas para dar acceso.
    async iniciarSesion(correo, contrasena) {
        // Verificamos que el correo exista.
        const usuario = await this.#buscarPorCorreo(correo);
        if (!usuario) {
            throw new Error("El correo no se encuentra registrado");
        }
        
        // Verificamos que la contraseña ingresada sea igual a la guardada.
        const passRegistrada = usuario.contrasena || usuario.contrasenia;
        if (passRegistrada.toString() !== contrasena.toString()) {
            throw new Error("Contraseña incorrecta");
        }
        
        // Si todo está bien, dejamos pasar al usuario.
        return usuario;
    }

    // Busca a un usuario existente y cambia los datos que le enviemos nuevos.
    async actualizarUsuario(id, datosNuevos) {
        // Primero confirmamos que el usuario realmente exista.
        const usuario = await this.#buscarPorID(id);
        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }

        // Reemplazamos los datos uno por uno solo si vienen incluidos en "datosNuevos".
        if (datosNuevos.nombre) usuario.nombre = datosNuevos.nombre;
        if (datosNuevos.correo) usuario.correo = datosNuevos.correo;
        if (datosNuevos.contrasena) {
            if (datosNuevos.contrasena.length < 6) throw new Error("La contraseña debe tener mínimo 6 caracteres");
            usuario.contrasena = datosNuevos.contrasena;
        }
        if (datosNuevos.foto) usuario.foto = datosNuevos.foto;

        // Guardamos los cambios en el navegador y devolvemos el usuario ya actualizado.
        this.#guardar();
        return usuario; 
    }
}