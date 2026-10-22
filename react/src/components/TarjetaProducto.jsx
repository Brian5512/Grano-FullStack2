function TarjetaProducto({ producto }) {
  return (
    <article className="tarjeta">
      <p className="etiqueta">{producto.categoria}</p>
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p className="precio">${producto.precio.toLocaleString("es-CL")} CLP</p>
    </article>
  );
}

export default TarjetaProducto;
