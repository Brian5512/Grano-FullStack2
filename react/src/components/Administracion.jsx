import { useState } from "react";

function Administracion({
  usuarios,
  mensajes,
  pedidos,
  productosNuevos,
  onCrearUsuario,
  onCrearProducto,
  onQuitarProducto,
}) {
  const [estado, setEstado] = useState("");
  const [estadoProducto, setEstadoProducto] = useState("");

  function crearUsuario(evento) {
    evento.preventDefault();
    const datos = new FormData(evento.target);
    const usuario = {
      nombre: datos.get("nombre").trim(),
      correo: datos.get("correo").trim().toLowerCase(),
      contrasena: datos.get("contrasena"),
      rol: datos.get("rol"),
    };

    if (!onCrearUsuario(usuario)) {
      setEstado("Ya existe una cuenta con ese correo.");
      return;
    }

    evento.target.reset();
    setEstado("Usuario creado correctamente.");
  }

  function crearProducto(evento) {
    evento.preventDefault();
    const datos = new FormData(evento.target);
    const producto = {
      nombre: datos.get("nombre"),
      categoria: datos.get("categoria"),
      descripcion: datos.get("descripcion"),
      detalle: datos.get("detalle"),
      precio: datos.get("precio"),
    };

    if (!onCrearProducto(producto)) {
      setEstadoProducto("Revisa el precio o usa otro nombre de producto.");
      return;
    }

    evento.target.reset();
    setEstadoProducto("Producto agregado al catálogo.");
  }

  return (
    <section className="pantalla-admin">
      <p className="etiqueta">PANEL DE ADMINISTRACIÓN</p>
      <h1>Productos, pedidos y usuarios.</h1>

      <section className="panel-formulario">
        <h2>Agregar producto</h2>
        <form onSubmit={crearProducto}>
          <label htmlFor="producto-nombre">Nombre</label>
          <input id="producto-nombre" name="nombre" maxLength="80" required />
          <label htmlFor="producto-categoria">Categoría</label>
          <select id="producto-categoria" name="categoria">
            <option>Café en grano</option>
            <option>Métodos</option>
            <option>Accesorios</option>
          </select>
          <label htmlFor="producto-descripcion">Descripción corta</label>
          <input
            id="producto-descripcion"
            name="descripcion"
            maxLength="120"
            required
          />
          <label htmlFor="producto-detalle">Detalle</label>
          <textarea
            id="producto-detalle"
            name="detalle"
            rows="3"
            maxLength="500"
            required
          />
          <label htmlFor="producto-precio">Precio en pesos</label>
          <input
            id="producto-precio"
            name="precio"
            type="number"
            min="1"
            step="1"
            required
          />
          <button type="submit">Agregar al catálogo</button>
        </form>
        <p className="ayuda-formulario">
          Los productos nuevos usan una imagen de ejemplo.
        </p>
        <p className="mensaje-formulario" role="status">{estadoProducto}</p>
        {productosNuevos.length > 0 && (
          <ul className="lista-productos-admin">
            {productosNuevos.map((producto) => (
              <li key={producto.id}>
                <span>{producto.nombre} · ${producto.precio.toLocaleString("es-CL")}</span>
                <button
                  className="boton-secundario"
                  type="button"
                  onClick={() => onQuitarProducto(producto.id)}
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="panel-formulario">
        <h2>Pedidos de clientes</h2>
        {pedidos.length === 0 ? (
          <p>Aún no hay pedidos realizados.</p>
        ) : (
          <ul>
            {pedidos.map((pedido) => (
              <li key={pedido.id}>
                {pedido.id} · {pedido.comprador} · {pedido.estado}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="panel-formulario">
        <h2>Mensajes recibidos</h2>
        {mensajes.length === 0 ? (
          <p>Aún no hay mensajes recibidos.</p>
        ) : (
          <ul>
            {mensajes.map((mensaje, indice) => (
              <li key={`${mensaje.fecha}-${indice}`}>
                {mensaje.fecha} · {mensaje.nombre} ({mensaje.correo}): {mensaje.texto}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="panel-formulario">
        <h2>Usuarios registrados</h2>
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.correo}>
              {usuario.nombre} · {usuario.correo} · {usuario.rol}
            </li>
          ))}
        </ul>
      </section>

      <section className="panel-formulario">
        <h2>Crear usuario</h2>
        <form onSubmit={crearUsuario}>
          <label htmlFor="admin-nombre">Nombre</label>
          <input id="admin-nombre" name="nombre" required />
          <label htmlFor="admin-correo">Correo electrónico</label>
          <input id="admin-correo" name="correo" type="email" required />
          <label htmlFor="admin-clave">Contraseña</label>
          <input
            id="admin-clave"
            name="contrasena"
            type="password"
            minLength="6"
            required
          />
          <label htmlFor="admin-rol">Rol</label>
          <select id="admin-rol" name="rol">
            <option value="comprador">Comprador</option>
            <option value="admin">Administrador</option>
          </select>
          <button type="submit">Crear usuario</button>
        </form>
        <p className="mensaje-formulario" role="status">{estado}</p>
      </section>
    </section>
  );
}

export default Administracion;
