// Importamos la clase Usuario y la clase GestorUsuarios
import { Usuario } from "./usuarios.js";
import { GestorUsuarios } from "./gestorusuarios.js";

// $: Un atajo muy usado en JS para evitar escribir 'document.querySelector' a cada rato.
const $ = selector => document.querySelector(selector);

// Arreglo con datos iniciales para no empezar con la base de datos vacía.
const usuariosIniciales = [
    new Usuario(1, "Ana López", "ana.lopez@example.com", "Luna#4821", "https://picsum.photos/id/1025/150"),
    new Usuario(2, "Carlos Martínez", "carlos.martinez@example.com", "Sol@7392", "https://picsum.photos/id/1005/150"),
    new Usuario(3, "María González", "maria.gonzalez@example.com", "Nube$6154", "https://picsum.photos/id/1011/150"),
    new Usuario(4, "Jorge Ramírez", "jorge.ramirez@example.com", "Rio!9273", "https://picsum.photos/id/1027/150")
];

// Instanciamos el gestor de usuarios con la lista inicial.
const gestor = new GestorUsuarios(usuariosIniciales);

// Variable global donde guardamos al usuario que logro iniciar sesión.
let usuarioLogueado = null;

// Objeto clave-valor que agrupa las cuatro pantallas principales del DOM.
const vistas = { 
    login: $("#view-login"), 
    registro: $("#view-registro"), 
    feed: $("#view-feed"), 
    perfil: $("#view-perfil") 
};

// En lugar de hacer multiples createElement y appendChild, inyectamos toda la estructura con innerHTML.
function construirFormularioRegistro() {
    vistas.registro.innerHTML = `
        <h2>Registro de Usuario</h2>
        <form id="form-registro-dinamico">
            <label for="reg-nombre">Nombre de Usuario</label>
            <input type="text" id="reg-nombre" name="nombre" required>

            <label for="reg-correo">Correo Electrónico</label>
            <input type="email" id="reg-correo" name="correo" required>

            <label for="reg-password">Contraseña (mínimo 6 caracteres)</label>
            <input type="password" id="reg-password" name="pass" required>

            <label for="reg-confirmar">Confirmar Contraseña</label>
            <input type="password" id="reg-confirmar" name="confirm" required>

            <label for="reg-foto">URL de Foto (Opcional)</label>
            <input type="url" id="reg-foto" name="foto" placeholder="https://picsum.photos/150">

            <button type="submit" class="btn-primary">Registrarse</button>
        </form>
        <p>¿Ya tienes cuenta? <a href="#" id="link-ir-login">Inicia sesión</a></p>
        <div id="registro-msg" class="msg"></div>
    `;

    // Escuchamos el envio del formulario dinamico y el enlace de regreso al login.
    $("#form-registro-dinamico").addEventListener("submit", manejarRegistro);
    $("#link-ir-login").addEventListener("click",info => { 
        info.preventDefault(); 
        cambiarVista("login"); 
    });
}

function cambiarVista(vista) {
    // classList.toggle(clase, condición): Agrega la clase 'hidden' si la pantalla NO es la seleccionada.
    // Si la pantalla si coincide con vista, le quita la clase 'hidden' para mostrarla.
    Object.entries(vistas).forEach(([nombre, el]) => el.classList.toggle("hidden", nombre !== vista));
    
    // Oculta la barra de navegacion superior si estamos en la vista de login o registro.
    $("#nav-header").classList.toggle("hidden", ["login", "registro"].includes(vista));

    // Si hay un usuario activo, actualizamos la foto y el nombre en el encabezado.
    if (usuarioLogueado) {
        $("#header-avatar").src = usuarioLogueado.foto;
        $("#header-username").textContent = usuarioLogueado.nombre;
    }

    // Acciones automaticas al activar ciertas pantallas:
    if (vista === "feed") cargarAPIExterna(); 
    if (vista === "perfil") cargarDatosFormPerfil();
}

async function manejarRegistro(pagina) {
    pagina.preventDefault(); // Detiene el refresco automático de la pagina.
    const msg = $("#registro-msg");
    msg.textContent = "";

    // FormData + Object.fromEntries: Técnica para extraer todos los campos del formulario en un objeto JSON 
    // en una sola línea de código utilizando el atributo 'name' de los inputs.
    const { nombre, correo, pass, confirm, foto } = Object.fromEntries(new FormData(pagina.target));

    try {
        await gestor.crearUsuario(nombre, correo, pass, confirm, foto);
        alert("¡Registro exitoso!");
        pagina.target.reset();
        cambiarVista("login"); // Redirige al inicio de sesion.
    } catch (err) {
        msg.textContent = err.message;
        msg.className = "msg error";
    }
}

async function manejarLogin(pagina) {
    pagina.preventDefault();
    const msg = $("#login-msg");
    msg.textContent = "";

    try {
        // Consultamos las credenciales al gestor usando los valores ingresados.
        usuarioLogueado = await gestor.iniciarSesion($("#login-correo").value, $("#login-password").value);
        pagina.target.reset();
        cambiarVista("feed"); // Acceso concedido: ir a la pagina principal.
    } catch (err) {
        msg.textContent = err.message;
        msg.className = "msg error";
    }
}

async function manejarPerfilUpdate(pagina) {
    pagina.preventDefault();
    const msg = $("#perfil-msg");
    msg.textContent = "";

    try {
        const datos = {
            nombre: $("#perfil-nombre").value,
            correo: $("#perfil-correo").value,
            foto: $("#perfil-foto").value
        };
        // Si el campo de contraseña no esta vacio, lo incluimos en la actualizacion.
        if ($("#perfil-password").value.trim()) datos.contrasena = $("#perfil-password").value;

        // Actualizamos los datos del usuario logueado en la memoria del gestor.
        usuarioLogueado = await gestor.actualizarUsuario(usuarioLogueado.id, datos);
        cambiarVista("perfil");
        msg.textContent = "Datos actualizados correctamente";
        msg.className = "msg exito";
    } catch (err) {
        msg.textContent = err.message;
        msg.className = "msg error";
    }
}

// Rellena los campos del formulario de perfil con los datos actuales del usuario logueado.
function cargarDatosFormPerfil() {
    if (!usuarioLogueado) return;
    $("#perfil-nombre").value = usuarioLogueado.nombre;
    $("#perfil-correo").value = usuarioLogueado.correo;
    $("#perfil-foto").value = usuarioLogueado.foto;
    $("#perfil-avatar-preview").src = usuarioLogueado.foto;
    $("#perfil-password").value = "";
}

async function cargarAPIExterna() {
    const contenedor = $("#api-cards-container");
    contenedor.innerHTML = "<p>Cargando ofertas de videojuegos...</p>";

    try {
        // Hacemos la peticion a la API externa de CheapShark.
        const res = await fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&sortBy=Metacritic&pageSize=12");
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

        const ofertas = await res.json();
        
        // .map().join(''): Mapeamos la lista de ofertas a cadenas HTML y las unimos en una sola.
        // Esto permite renderizar todas las tarjetas de un solo golpe en el DOM sin bucles largos.
        contenedor.innerHTML = ofertas.map(juego => `
            <div class="card-item game-card">
                <div class="card-header-img">
                    <img src="${juego.thumb}" alt="${juego.title}">
                    <span class="badge platform">🎮 Score: ${juego.metacriticScore || "N/A"}</span>
                </div>
                <div class="card-body">
                    <span class="badge genre">Oferta de Steam</span>
                    <h3>${juego.title}</h3>
                    <p class="description">
                        Precio original: <s>$${juego.normalPrice} USD</s><br>
                        <strong>Oferta actual: $${juego.salePrice} USD</strong>
                    </p>
                    <a href="https://www.cheapshark.com/redirect?dealID=${juego.dealID}" target="_blank" rel="noopener noreferrer" class="btn-play">
                        Ver Oferta
                    </a>
                </div>
            </div>
        `).join("");
    } catch (err) {
        contenedor.innerHTML = `<p class="error">Error al conectar con la API: ${err.message}</p>`;
    }
}

function init() {
    //  Generamos el HTML del registro en el DOM.
    construirFormularioRegistro();

    // 2. Asociamos los manejadores de eventos a los formularios estáticos del HTML.
    $("#form-login").addEventListener("submit", manejarLogin);
    $("#form-perfil").addEventListener("submit", manejarPerfilUpdate);
    $("#link-ir-registro").addEventListener("click", e => { 
        e.preventDefault(); 
        cambiarVista("registro"); 
    });

    // Asociamos los botones del menú de navegación.
    $("#btn-nav-feed").addEventListener("click", () => cambiarVista("feed"));
    $("#btn-nav-perfil").addEventListener("click", () => cambiarVista("perfil"));
    $("#btn-nav-logout").addEventListener("click", () => { 
        usuarioLogueado = null; 
        cambiarVista("login"); 
    });

    // Establecemos la pantalla inicial en Login.
    cambiarVista("login");
}

// Arrancamos la aplicación.
init();