import { useEffect, useState } from "react";
import Catalogo from "./components/Catalogo.jsx";
import DetalleProducto from "./components/DetalleProducto.jsx";
import Carrito from "./components/Carrito.jsx";

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
      <header className="encabezado">
        <a
          className="marca"
          href="#productos"
          onClick={volverAlCatalogo}
        >
          grano
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
              <p className="etiqueta">CAFÉ DE ESPECIALIDAD</p>
              <h1>Un buen café para cada día.</h1>
              <p>Encuentra un café o un accesorio para tu próxima pausa.</p>
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
