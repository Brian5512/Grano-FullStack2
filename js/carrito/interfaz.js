// Esta parte muestra el carrito y escucha los botones de la página.
(() => {
  const carrito = window.Grano.carrito;

  function actualizarContador() {
    document.querySelectorAll(".contador-carrito").forEach((contador) => {
      contador.textContent = carrito.contar();
    });
  }

  function mostrar() {
    const lista = document.querySelector("#lista-carrito");

    if (!lista) {
      return;
    }

    const productos = carrito.obtener();
    lista.innerHTML = "";

    if (productos.length === 0) {
      lista.innerHTML = '<p class="mb-0">Todavía no agregas productos al carrito.</p>';
      return;
    }

    productos.forEach((producto) => {
      const item = document.createElement("article");
      item.className = "item-carrito";

      const imagen = document.createElement("img");
      imagen.src = producto.imagen;
      imagen.alt = producto.nombre;

      const detalle = document.createElement("div");
      const nombre = document.createElement("h2");
      nombre.className = "h5";
      nombre.textContent = producto.nombre;

      const precio = document.createElement("p");
      precio.className = "mb-0";
      precio.textContent = `$${producto.precio.toLocaleString("es-CL")} CLP · Cantidad: ${producto.cantidad}`;

      const botonQuitar = document.createElement("button");
      botonQuitar.className = "btn btn-outline-success btn-sm";
      botonQuitar.type = "button";
      botonQuitar.dataset.quitar = producto.id;
      botonQuitar.textContent = "Quitar";

      detalle.append(nombre, precio);
      item.append(imagen, detalle, botonQuitar);
      lista.appendChild(item);
    });
  }

  document.addEventListener("click", (evento) => {
    const agregar = evento.target.closest("[data-agregar-carrito]");
    const quitar = evento.target.closest("[data-quitar]");

    if (agregar) {
      const textoOriginal = agregar.textContent;
      carrito.agregar({
        id: agregar.dataset.id,
        nombre: agregar.dataset.nombre,
        precio: Number(agregar.dataset.precio),
        imagen: agregar.dataset.imagen,
      });
      actualizarContador();
      agregar.textContent = "Añadido";
      setTimeout(() => (agregar.textContent = textoOriginal), 900);
    }

    if (quitar) {
      carrito.quitar(quitar.dataset.quitar);
      actualizarContador();
      mostrar();
    }
  });

  actualizarContador();
  mostrar();
})();
