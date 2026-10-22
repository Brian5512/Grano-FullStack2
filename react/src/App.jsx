import { useEffect, useState } from "react";
import Catalogo from "./components/Catalogo.jsx";
import DetalleProducto from "./components/DetalleProducto.jsx";
import Carrito from "./components/Carrito.jsx";
import Acceso from "./components/Acceso.jsx";
import Cuenta from "./components/Cuenta.jsx";
import Contacto from "./components/Contacto.jsx";
import Administracion from "./components/Administracion.jsx";
import imagenHero from "./assets/hero.svg";

function leerDato(clave, valorInicial) {
  const datoGuardado = localStorage.getItem(clave);

  if (datoGuardado) {
    try {
      return JSON.parse(datoGuardado);
    } catch {
      return valorInicial;
    }
  }

  return valorInicial;
}

function cargarUsuarios() {
  const usuariosGuardados = leerDato("granoUsuariosReact", []);
  const existeAdmin = usuariosGuardados.some(
    (usuario) => usuario.correo === "admin@duocuc.cl",
  );

  if (!existeAdmin) {
    usuariosGuardados.push({
      nombre: "Administrador",
      correo: "admin@duocuc.cl",
      contrasena: "1234",
      rol: "admin",
    });
  }

  return usuariosGuardados;
}

function App() {
  const [pagina, setPagina] = useState("catalogo");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [carrito, setCarrito] = useState(() =>
    leerDato("granoCarritoReact", []),
  );
  const [usuarios, setUsuarios] = useState(cargarUsuarios);
  const [sesion, setSesion] = useState(() =>
    leerDato("granoSesionReact", null),
  );
  const [mensajes, setMensajes] = useState(() =>
    leerDato("granoMensajesReact", []),
  );
  const [pedidos] = useState(() => leerDato("granoPedidosReact", []));

  useEffect(() => {
    localStorage.setItem("granoCarritoReact", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    localStorage.setItem("granoUsuariosReact", JSON.stringify(usuarios));
  }, [usuarios]);

  useEffect(() => {
    localStorage.setItem("granoSesionReact", JSON.stringify(sesion));
  }, [sesion]);

  useEffect(() => {
    localStorage.setItem("granoMensajesReact", JSON.stringify(mensajes));
  }, [mensajes]);

  function agregarAlCarrito(producto) {
    setCarrito([...carrito, producto]);
  }

  function quitarDelCarrito(indiceProducto) {
    const carritoActualizado = carrito.filter(
      (producto, indice) => indice !== indiceProducto,
    );
    setCarrito(carritoActualizado);
  }

  function iniciarSesion(correo, contrasena) {
    const usuarioEncontrado = usuarios.find(
      (usuario) =>
        usuario.correo === correo.trim().toLowerCase() &&
        usuario.contrasena === contrasena,
    );

    if (usuarioEncontrado) {
      setSesion({
        nombre: usuarioEncontrado.nombre,
        correo: usuarioEncontrado.correo,
        rol: usuarioEncontrado.rol,
      });
      setPagina(usuarioEncontrado.rol === "admin" ? "admin" : "cuenta");
    }

    return usuarioEncontrado;
  }

  function registrarUsuario(usuarioNuevo) {
    const usuarioExiste = usuarios.some(
      (usuario) =>
        usuario.correo === usuarioNuevo.correo ||
        (usuario.rut && usuario.rut === usuarioNuevo.rut),
    );

    if (usuarioExiste) {
      return false;
    }

    setUsuarios([...usuarios, usuarioNuevo]);
    return true;
  }

  function cambiarContrasena(correo, contrasenaActual, contrasenaNueva) {
    const usuarioEncontrado = usuarios.find(
      (usuario) =>
        usuario.correo === correo &&
        usuario.contrasena === contrasenaActual,
    );

    if (!usuarioEncontrado) {
      return false;
    }

    const usuariosActualizados = usuarios.map((usuario) =>
      usuario.correo === correo
        ? { ...usuario, contrasena: contrasenaNueva }
        : usuario,
    );
    setUsuarios(usuariosActualizados);
    return true;
  }

  function cerrarSesion() {
    setSesion(null);
    setPagina("catalogo");
  }

  function guardarPerfil(usuarioActualizado) {
    const usuariosActualizados = usuarios.map((usuario) =>
      usuario.correo === usuarioActualizado.correo
        ? usuarioActualizado
        : usuario,
    );
    setUsuarios(usuariosActualizados);
    setSesion({ ...sesion, nombre: usuarioActualizado.nombre });
  }

  function enviarMensaje(mensajeNuevo) {
    setMensajes([mensajeNuevo, ...mensajes]);
  }

  function mostrarCatalogo() {
    setPagina("catalogo");
    setProductoSeleccionado(null);
  }

  let contenido;

  if (pagina === "detalle" && productoSeleccionado) {
    contenido = (
      <DetalleProducto
        producto={productoSeleccionado}
        volver={mostrarCatalogo}
        onAgregar={agregarAlCarrito}
      />
    );
  } else if (pagina === "carrito") {
    contenido = <Carrito carrito={carrito} onQuitar={quitarDelCarrito} />;
  } else if (pagina === "acceso") {
    contenido = (
      <Acceso
        onIniciar={iniciarSesion}
        onRegistrar={registrarUsuario}
        onCambiarContrasena={cambiarContrasena}
      />
    );
  } else if (pagina === "cuenta" && sesion && sesion.rol === "comprador") {
    const pedidosUsuario = pedidos.filter(
      (pedido) => pedido.comprador === sesion.correo,
    );
    const usuarioActual = usuarios.find(
      (usuario) => usuario.correo === sesion.correo,
    );

    contenido = (
      <Cuenta
        usuario={usuarioActual}
        pedidos={pedidosUsuario}
        onGuardar={guardarPerfil}
      />
    );
  } else if (pagina === "admin" && sesion && sesion.rol === "admin") {
    contenido = (
      <Administracion
        usuarios={usuarios}
        mensajes={mensajes}
        pedidos={pedidos}
        onCrearUsuario={registrarUsuario}
      />
    );
  } else if (pagina === "contacto") {
    contenido = <Contacto usuario={sesion} onEnviar={enviarMensaje} />;
  } else {
    contenido = (
      <>
        <section className="presentacion">
          <div>
            <p className="etiqueta">CAFÉ &amp; RITUALES</p>
            <h1>Tu día empieza con un buen café.</h1>
            <p>
              Cafés de origen y pequeños detalles para disfrutar sin apuro.
              Encuentra tu próxima taza favorita.
            </p>
            <a className="boton-enlace" href="#productos">
              Conoce nuestro café ↗
            </a>
          </div>
          <img
            src={imagenHero}
            alt="Bolsas de café Grano junto a una taza"
          />
        </section>

        <Catalogo
          onVerDetalle={(producto) => {
            setProductoSeleccionado(producto);
            setPagina("detalle");
          }}
          onAgregar={agregarAlCarrito}
        />
      </>
    );
  }

  if (
    (pagina === "cuenta" && (!sesion || sesion.rol !== "comprador")) ||
    (pagina === "admin" && (!sesion || sesion.rol !== "admin"))
  ) {
    contenido = (
      <section className="pantalla-formularios">
        <h1>Inicia sesión para continuar.</h1>
        <button type="button" onClick={() => setPagina("acceso")}>
          Ir a iniciar sesión
        </button>
      </section>
    );
  }

  return (
    <>
      <div className="franja">Café de especialidad, a tu ritmo.</div>
      <header className="encabezado">
        <button className="marca boton-marca" type="button" onClick={mostrarCatalogo}>
          grano
          <span className="marca-sub">CAFÉ &amp; RITUALES</span>
        </button>
        <nav>
          <button className="enlace-menu" type="button" onClick={mostrarCatalogo}>
            Nuestro café
          </button>
          <button
            className="enlace-menu"
            type="button"
            onClick={() => setPagina("contacto")}
          >
            Contacto
          </button>
          {sesion ? (
            <>
              <button
                className="enlace-menu"
                type="button"
                onClick={() =>
                  setPagina(sesion.rol === "admin" ? "admin" : "cuenta")
                }
              >
                {sesion.rol === "admin" ? "Administración" : "Mi cuenta"}
              </button>
              <button className="enlace-menu" type="button" onClick={cerrarSesion}>
                Salir
              </button>
            </>
          ) : (
            <button
              className="enlace-menu"
              type="button"
              onClick={() => setPagina("acceso")}
            >
              Iniciar sesión
            </button>
          )}
          <button
            className="boton-carrito"
            type="button"
            onClick={() => setPagina("carrito")}
          >
            Carrito ({carrito.length})
          </button>
        </nav>
      </header>

      <main>{contenido}</main>

      <footer className="pie">
        <p>Grano · Café y rituales</p>
      </footer>
    </>
  );
}

export default App;
