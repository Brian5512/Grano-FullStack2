# Grano

Tienda de café de especialidad, métodos de preparación y accesorios.

## Abrir el sitio

Abre `index.html` en el navegador. El menú principal lleva a Inicio, Nuestro café, Nosotros, Contacto e Iniciar sesión.

La página `login.html` presenta los campos de correo y contraseña y permite volver al catálogo. Por ahora es una pantalla de diseño: el botón no autentica usuarios ni envía los datos.

El carrito usa `localStorage` para guardar los productos en el navegador. Solo permite agregar, ver y quitar productos; no incluye compra ni pago.

El JavaScript está separado por responsabilidades: el carrito tiene almacenamiento e interfaz, usuarios tiene validación de RUT y registro, y contacto guarda los mensajes.

El registro y el formulario de contacto guardan sus datos solo en el navegador. No hay servidor, autenticación ni envío de mensajes a un correo.

## Organización del JavaScript

- `js/carrito/`: almacenamiento y elementos visuales del carrito.
- `js/usuarios/`: validación del RUT y registro de usuarios.
- `js/contacto/`: guardado de mensajes del formulario.

## Preparación para pasar a React

La estructura actual sirve para aprender y presentar el sitio, pero al migrar conviene dejar de repetir el menú y el pie de página en cada HTML. Se pueden convertir en componentes compartidos (`Header`, `Footer` y `Layout`) y mantener las pantallas separadas: Inicio, Catálogo, Detalle del producto, Carrito, Registro y Contacto. La pantalla de inicio de sesión puede incorporarse como otra página cuando se defina qué debe hacer.

El catálogo y los detalles deberían leer una sola lista de productos. Así, cada tarjeta y página de detalle muestran los mismos datos y el carrito recibe el producto seleccionado sin duplicar información. En React, el carrito puede quedar como un estado compartido entre catálogo, detalle y encabezado, conservando `localStorage` para esta etapa. El registro y los mensajes pueden seguir como formularios separados; guardar datos en el navegador no equivale a tener inicio de sesión ni envío real.

Para avanzar sin enredarse, conviene migrar en este orden: preparar el proyecto React con la herramienta que indique la asignatura, crear navegación y componentes comunes, pasar el catálogo y los detalles, conectar el carrito y al final migrar los formularios. En cada paso se puede comprobar que los enlaces y los datos sigan funcionando antes de retirar los HTML antiguos. No es necesario agregar servidor, pagos ni autenticación para esta migración.

## Archivos

- Las páginas están en archivos HTML.
- `css/estilos.css` contiene los estilos comunes y las otras hojas separan inicio, productos, formularios y carrito.
- `assets/` contiene las ilustraciones.
- `docs/` contiene las planillas de requisitos y la ERS.

Bootstrap se carga mediante un enlace a su CSS. Se necesita internet para cargarlo. Se usa JavaScript para el carrito, el registro de usuarios, la validación del RUT y el formulario de contacto. No se necesitan instalaciones ni herramientas de compilación.

La tienda todavía no procesa compras ni pagos. Las cuentas y los mensajes quedan guardados localmente en el navegador y no se comparten entre dispositivos.
