import { useState } from "react";

function Administracion({ usuarios, mensajes, pedidos, onCrearUsuario }) {
  const [estado, setEstado] = useState("");

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

  return (
    <section className="pantalla-admin">
      <p className="etiqueta">PANEL DE ADMINISTRACIÓN</p>
      <h1>Pedidos y usuarios.</h1>

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
