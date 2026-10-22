function Carrito({ carrito, onQuitar }) {
  return (
    <section className="carrito">
      <h1>Mi carrito</h1>

      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul className="lista-carrito">
          {carrito.map((producto, indice) => (
            <li className="producto-carrito" key={`${producto.id}-${indice}`}>
              <div>
                <h2>{producto.nombre}</h2>
                <p>${producto.precio.toLocaleString("es-CL")} CLP</p>
              </div>
              <button
                className="boton-secundario"
                type="button"
                onClick={() => onQuitar(indice)}
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Carrito;
