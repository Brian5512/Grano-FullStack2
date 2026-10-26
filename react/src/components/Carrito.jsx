function Carrito({ carrito, sesion, mensajeCompra, onQuitar, onComprar, onIrAcceso }) {
  const total = carrito.reduce((suma, producto) => suma + producto.precio, 0);

  return (
    <section className="carrito">
      <h1>Mi carrito</h1>

      {carrito.length === 0 ? (
        <p>{mensajeCompra || "El carrito está vacío."}</p>
      ) : (
        <>
          <ul className="lista-carrito">
            {carrito.map((producto, indice) => (
              <li className="producto-carrito" key={`${producto.id}-${indice}`}>
                <img src={producto.imagen} alt={producto.nombre} />
                <div className="datos-producto-carrito">
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
          <div className="resumen-carrito">
            <p>Total: <strong>${total.toLocaleString("es-CL")} CLP</strong></p>
            {sesion?.rol === "comprador" ? (
              <button type="button" onClick={onComprar}>Realizar compra</button>
            ) : !sesion ? (
              <button type="button" onClick={onIrAcceso}>Inicia sesión para comprar</button>
            ) : (
              <p>Ingresa con una cuenta de comprador para realizar el pedido.</p>
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default Carrito;
