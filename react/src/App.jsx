import { useState } from "react";
import Catalogo from "./components/Catalogo.jsx";
import DetalleProducto from "./components/DetalleProducto.jsx";

function App() {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  return (
    <>
      <header className="encabezado">
        <a
          className="marca"
          href="#productos"
          onClick={() => setProductoSeleccionado(null)}
        >
          grano
        </a>
        <nav>
          <a
            href="#productos"
            onClick={() => setProductoSeleccionado(null)}
          >
            Nuestro café
          </a>
        </nav>
      </header>

      <main>
        {productoSeleccionado ? (
          <DetalleProducto
            producto={productoSeleccionado}
            volver={() => setProductoSeleccionado(null)}
          />
        ) : (
          <>
            <section className="presentacion">
              <p className="etiqueta">CAFÉ DE ESPECIALIDAD</p>
              <h1>Un buen café para cada día.</h1>
              <p>Encuentra un café o un accesorio para tu próxima pausa.</p>
            </section>

            <Catalogo onVerDetalle={setProductoSeleccionado} />
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
