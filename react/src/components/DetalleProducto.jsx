function DetalleProducto({ producto, volver }) {
  return (
    <section className="detalle-producto">
      <p className="etiqueta">{producto.categoria}</p>
      <h1>{producto.nombre}</h1>
      <p>{producto.descripcion}</p>
      <p>{producto.detalle}</p>
      <p className="precio">${producto.precio.toLocaleString("es-CL")} CLP</p>
      <button type="button" onClick={volver}>
        Volver a nuestros productos
      </button>
    </section>
  );
}

export default DetalleProducto;
