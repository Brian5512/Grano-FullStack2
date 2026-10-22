import { useEffect, useState } from "react";
import Catalogo from "./components/Catalogo.jsx";
import DetalleProducto from "./components/DetalleProducto.jsx";
import Carrito from "./components/Carrito.jsx";
import imagenHero from "./assets/hero.svg";

function App() {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem("granoCarritoReact");

    if (carritoGuardado) {
      return JSON.parse(carritoGuardado);
    }

    return [];
  });
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  useEffect(() => {
    localStorage.setItem("granoCarritoReact", JSON.stringify(carrito));
  }, [carrito]);

  function agregarAlCarrito(producto) {
    setCarrito([...carrito, producto]);
  }

  function quitarDelCarrito(indiceProducto) {
    const carritoActualizado = carrito.filter(
      (producto, indice) => indice !== indiceProducto,
    );
    setCarrito(carritoActualizado);
  }

  function volverAlCatalogo() {
    setProductoSeleccionado(null);
    setMostrarCarrito(false);
  }

  return (
    <>
      <div className="franja">Café de especialidad, a tu ritmo.</div>
      <header className="encabezado">
        <a
          className="marca"
          href="#productos"
          onClick={volverAlCatalogo}
        >
          grano
          <span className="marca-sub">CAFÉ &amp; RITUALES</span>
        </a>
        <nav>
          <a
            href="#productos"
            onClick={volverAlCatalogo}
          >
            Nuestro café
          </a>
          <button
            className="boton-carrito"
            type="button"
            onClick={() => {
              setProductoSeleccionado(null);
              setMostrarCarrito(true);
            }}
          >
            Carrito ({carrito.length})
          </button>
        </nav>
      </header>

      <main>
        {mostrarCarrito ? (
          <Carrito carrito={carrito} onQuitar={quitarDelCarrito} />
        ) : productoSeleccionado ? (
          <DetalleProducto
            producto={productoSeleccionado}
            volver={() => setProductoSeleccionado(null)}
            onAgregar={agregarAlCarrito}
          />
        ) : (
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
              onVerDetalle={setProductoSeleccionado}
              onAgregar={agregarAlCarrito}
            />
          </>
        )}
      </main>

      <footer className="pie">
        <p>Grano · Café y rituales</p>
      </footer>
    </>
  );
}

export default App;
