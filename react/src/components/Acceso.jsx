import { useState } from "react";
import { esRutValido, formatearRut } from "../datos/rut.js";

function Acceso({ onIniciar, onRegistrar, onCambiarContrasena }) {
  const [mensajeLogin, setMensajeLogin] = useState("");
  const [mensajeRegistro, setMensajeRegistro] = useState("");
  const [mensajeClave, setMensajeClave] = useState("");
  const [rut, setRut] = useState("");
  const [mensajeRut, setMensajeRut] = useState("");

  function iniciarSesion(evento) {
    evento.preventDefault();
    const datos = new FormData(evento.target);
    const usuario = onIniciar(datos.get("correo"), datos.get("contrasena"));

    if (!usuario) {
      setMensajeLogin("Correo o contraseña incorrectos.");
      return;
    }

    setMensajeLogin("");
  }

  function registrarCuenta(evento) {
    evento.preventDefault();
    const datos = new FormData(evento.target);

    if (!esRutValido(rut)) {
      setMensajeRut("Ingresa un RUT válido con su dígito verificador.");
      return;
    }

    const usuario = {
      nombre: datos.get("nombre").trim(),
      rut: formatearRut(rut),
      correo: datos.get("correo").trim().toLowerCase(),
      contrasena: datos.get("contrasena"),
      rol: "comprador",
    };

    if (!onRegistrar(usuario)) {
      setMensajeRegistro("Ya existe una cuenta con ese RUT o correo.");
      return;
    }

    evento.target.reset();
    setRut("");
    setMensajeRut("");
    setMensajeRegistro("Cuenta creada. Ya puedes iniciar sesión.");
  }

  function revisarRut() {
    if (rut.length === 0) {
      setMensajeRut("");
    } else if (esRutValido(rut)) {
      setRut(formatearRut(rut));
      setMensajeRut("RUT válido.");
    } else {
      setMensajeRut("Revisa el RUT y su dígito verificador.");
    }
  }

  function cambiarContrasena(evento) {
    evento.preventDefault();
    const datos = new FormData(evento.target);
    const cambioCorrecto = onCambiarContrasena(
      datos.get("correo").trim().toLowerCase(),
      datos.get("actual"),
      datos.get("nueva"),
    );

    if (!cambioCorrecto) {
      setMensajeClave("No pudimos validar el correo y la contraseña actual.");
      return;
    }

    evento.target.reset();
    setMensajeClave("Contraseña actualizada.");
  }

  return (
    <section className="pantalla-formularios">
      <div className="titulo-pantalla">
        <p className="etiqueta">TU CUENTA GRANO</p>
        <h1>Tu pausa empieza aquí.</h1>
      </div>

      <div className="columnas-formularios">
        <section className="panel-formulario">
          <h2>Iniciar sesión</h2>
          <form onSubmit={iniciarSesion}>
            <label htmlFor="login-correo">Correo electrónico</label>
            <input id="login-correo" name="correo" type="email" required />

            <label htmlFor="login-contrasena">Contraseña</label>
            <input
              id="login-contrasena"
              name="contrasena"
              type="password"
              required
            />

            <button type="submit">Iniciar sesión</button>
          </form>
          <p className="mensaje-formulario" role="status">{mensajeLogin}</p>
          <p className="ayuda-formulario">
            Acceso de prueba: admin@duocuc.cl · 1234
          </p>
          <details className="cambiar-clave">
            <summary>Cambiar contraseña</summary>
            <form onSubmit={cambiarContrasena}>
              <label htmlFor="clave-correo">Correo electrónico</label>
              <input id="clave-correo" name="correo" type="email" required />
              <label htmlFor="clave-actual">Contraseña actual</label>
              <input
                id="clave-actual"
                name="actual"
                type="password"
                required
              />
              <label htmlFor="clave-nueva">Nueva contraseña</label>
              <input
                id="clave-nueva"
                name="nueva"
                type="password"
                minLength="6"
                required
              />
              <button type="submit">Actualizar contraseña</button>
            </form>
            <p className="mensaje-formulario" role="status">{mensajeClave}</p>
          </details>
        </section>

        <section className="panel-formulario panel-registro">
          <h2>Crear cuenta</h2>
          <form onSubmit={registrarCuenta}>
            <label htmlFor="registro-nombre">Nombre</label>
            <input
              id="registro-nombre"
              name="nombre"
              autoComplete="name"
              maxLength="80"
              required
            />

            <label htmlFor="registro-rut">RUT</label>
            <input
              id="registro-rut"
              name="rut"
              value={rut}
              onChange={(evento) => setRut(evento.target.value)}
              onBlur={revisarRut}
              placeholder="12.345.678-5"
              maxLength="12"
              required
            />
            <p className="ayuda-formulario">{mensajeRut}</p>

            <label htmlFor="registro-correo">Correo electrónico</label>
            <input
              id="registro-correo"
              name="correo"
              type="email"
              autoComplete="email"
              required
            />

            <label htmlFor="registro-contrasena">Contraseña</label>
            <input
              id="registro-contrasena"
              name="contrasena"
              type="password"
              minLength="6"
              required
            />
            <p className="ayuda-formulario">Mínimo 6 caracteres.</p>

            <button type="submit">Crear cuenta</button>
          </form>
          <p className="mensaje-formulario" role="status">
            {mensajeRegistro}
          </p>
        </section>
      </div>
    </section>
  );
}

export default Acceso;
