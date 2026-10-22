import { productos } from "../datos/productos.js";
import TarjetaProducto from "./TarjetaProducto.jsx";

function Catalogo({ onVerDetalle, onAgregar }) {
  return (
    <section id="productos" className="catalogo">
      <h2>Nuestros cafés</h2>
      <div className="lista-productos">
        {productos.map((producto) => (
          <TarjetaProducto
            key={producto.id}
            producto={producto}
            onVerDetalle={onVerDetalle}
            onAgregar={onAgregar}
          />
        ))}
      </div>
    </section>
  );
}

export default Catalogo;
