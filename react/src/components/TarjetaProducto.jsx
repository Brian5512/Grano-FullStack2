function TarjetaProducto({ producto, onVerDetalle, onAgregar }) {
  return (
    <article className="tarjeta">
      <p className="etiqueta">{producto.categoria}</p>
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p className="precio">${producto.precio.toLocaleString("es-CL")} CLP</p>
      <button type="button" onClick={() => onVerDetalle(producto)}>
        Ver detalle
      </button>
      <button
        className="boton-secundario"
        type="button"
        onClick={() => onAgregar(producto)}
      >
        Añadir al carrito
      </button>
    </article>
  );
}

export default TarjetaProducto;
