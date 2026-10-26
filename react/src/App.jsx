import { useEffect, useState } from "react";
import Catalogo from "./components/Catalogo.jsx";
import DetalleProducto from "./components/DetalleProducto.jsx";
import Carrito from "./components/Carrito.jsx";
import Acceso from "./components/Acceso.jsx";
import Cuenta from "./components/Cuenta.jsx";
import Contacto from "./components/Contacto.jsx";
import Nosotros from "./components/Nosotros.jsx";
import Administracion from "./components/Administracion.jsx";
import imagenHero from "./assets/hero.svg";
import imagenProductoNuevo from "./assets/producto-nuevo.svg";
import { productos as productosIniciales } from "./datos/productos.js";

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
  const [pagina, setPagina] = useState("inicio");
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
  const [pedidos, setPedidos] = useState(() => leerDato("granoPedidosReact", []));
  const [mensajeCompra, setMensajeCompra] = useState("");
  const [productosNuevos, setProductosNuevos] = useState(() =>
    leerDato("granoProductosReact", []),
  );
  const productos = [
    ...productosIniciales,
    ...productosNuevos.map((producto) => ({
      ...producto,
      imagen: producto.imagen || imagenProductoNuevo,
    })),
  ];

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

  useEffect(() => {
    localStorage.setItem("granoPedidosReact", JSON.stringify(pedidos));
  }, [pedidos]);

  function agregarAlCarrito(producto) {
    setCarrito([...carrito, producto]);
    setMensajeCompra("");
  }

  function quitarDelCarrito(indiceProducto) {
    const carritoActualizado = carrito.filter(
      (producto, indice) => indice !== indiceProducto,
    );
    setCarrito(carritoActualizado);
  }

  function confirmarCompra() {
    if (!sesion || sesion.rol !== "comprador" || carrito.length === 0) {
      return;
    }

    const pedido = {
      id: `GR-${Date.now()}`,
      comprador: sesion.correo,
      fecha: new Date().toLocaleDateString("es-CL"),
      productos: carrito.map((producto) => ({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
      })),
      total: carrito.reduce((total, producto) => total + producto.precio, 0),
      estado: "Recibido",
    };

    setPedidos([pedido, ...pedidos]);
    setCarrito([]);
    setMensajeCompra(`Pedido ${pedido.id} registrado. Puedes verlo en Mi cuenta.`);
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

  function registrarYEntrar(usuarioNuevo) {
    if (!registrarUsuario(usuarioNuevo)) {
      return false;
    }

    setSesion({
      nombre: usuarioNuevo.nombre,
      correo: usuarioNuevo.correo,
      rol: usuarioNuevo.rol,
    });
    setPagina("cuenta");
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
    setCarrito([]);
    setMensajeCompra("");
    setPagina("inicio");
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

  function crearProducto(datosProducto) {
    const nombre = datosProducto.nombre.trim();
    const precio = Number(datosProducto.precio);
    const nombreExiste = productos.some(
      (producto) => producto.nombre.toLowerCase() === nombre.toLowerCase(),
    );

    if (!nombre || !Number.isFinite(precio) || precio <= 0 || nombreExiste) {
      return false;
    }

    const productosActualizados = [
      ...productosNuevos,
      {
        id: `nuevo-${Date.now()}`,
        nombre,
        categoria: datosProducto.categoria,
        descripcion: datosProducto.descripcion.trim(),
        detalle: datosProducto.detalle.trim(),
        precio,
        imagen: datosProducto.imagen || "",
      },
    ];

    try {
      localStorage.setItem("granoProductosReact", JSON.stringify(productosActualizados));
    } catch {
      return false;
    }

    setProductosNuevos(productosActualizados);
    return true;
  }

  function quitarProducto(idProducto) {
    const productosActualizados = productosNuevos.filter(
      (producto) => producto.id !== idProducto,
    );
    localStorage.setItem("granoProductosReact", JSON.stringify(productosActualizados));
    setProductosNuevos(productosActualizados);
  }

  function mostrarCatalogo() {
    setPagina("productos");
    setProductoSeleccionado(null);
  }

  function mostrarInicio() {
    setPagina("inicio");
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
    contenido = (
      <Carrito
        carrito={carrito}
        sesion={sesion}
        mensajeCompra={mensajeCompra}
        onQuitar={quitarDelCarrito}
        onComprar={confirmarCompra}
        onIrAcceso={() => setPagina("acceso")}
      />
    );
  } else if (pagina === "acceso") {
    contenido = (
      <Acceso
        onIniciar={iniciarSesion}
        onRegistrar={registrarYEntrar}
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
        productosNuevos={productosNuevos}
        onCrearProducto={crearProducto}
        onQuitarProducto={quitarProducto}
      />
    );
  } else if (pagina === "contacto") {
    contenido = <Contacto usuario={sesion} onEnviar={enviarMensaje} />;
  } else if (pagina === "nosotros") {
    contenido = <Nosotros onIrContacto={() => setPagina("contacto")} />;
  } else if (pagina === "productos") {
    contenido = (
      <Catalogo
        productos={productos}
        onVerDetalle={(producto) => {
          setProductoSeleccionado(producto);
          setPagina("detalle");
        }}
        onAgregar={agregarAlCarrito}
      />
    );
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
            <button className="boton-enlace" type="button" onClick={mostrarCatalogo}>
              Conoce nuestro café ↗
            </button>
          </div>
          <img
            src={imagenHero}
            alt="Bolsas de café Grano junto a una taza"
          />
        </section>

        <section className="inicio-destacados">
          <p className="etiqueta">CONOCE GRANO</p>
          <h2>Hay una historia detrás de cada taza.</h2>
          <button type="button" onClick={() => setPagina("nosotros")}>Sobre nosotros</button>
        </section>
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
        <button className="marca boton-marca" type="button" onClick={mostrarInicio}>
          grano
          <span className="marca-sub">CAFÉ &amp; RITUALES</span>
        </button>
        <nav>
          <button className="enlace-menu" type="button" onClick={mostrarInicio}>
            Inicio
          </button>
          <button className="enlace-menu" type="button" onClick={mostrarCatalogo}>
            Nuestro café
          </button>
          <button
            className="enlace-menu"
            type="button"
            onClick={() => setPagina("nosotros")}
          >
            Nosotros
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
