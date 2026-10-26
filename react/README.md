# React separado para practicar

Esta carpeta contiene una aplicación independiente para aprender y preparar la migración. No usa las páginas HTML ni los archivos JavaScript o CSS del sitio principal. Las imágenes que necesita están copiadas dentro de `src/assets`.

## Probar la aplicación

Desde esta carpeta, instala las dependencias y ejecuta el servidor:

```bash
npm install
npm run dev
```

La aplicación incluye Inicio, una página de productos con sus fichas, un carrito con imágenes y total, acceso y registro con validación del RUT, cuenta de comprador, contacto y un panel de administración. Usuarios, sesión y mensajes de esta práctica se guardan en `localStorage`; el acceso de prueba es `admin@duocuc.cl` con contraseña `1234`.

Un comprador que inició sesión puede pulsar **Realizar compra**. Esto registra un pedido de prueba en el historial de su cuenta y vacía el carrito. No hay pagos ni servidor. Al cerrar sesión, el carrito también se vacía.

Desde administración se pueden agregar productos de prueba con una imagen JPG, PNG o WebP de hasta 500 KB. Sus datos se guardan en `localStorage` bajo `granoProductosReact` y aparecen en el catálogo al instante, incluso después de recargar. Si no se elige imagen, se muestra una de ejemplo. También se pueden quitar los productos agregados en esta práctica.

Si el navegador integrado de VS Code no permite escribir `@` en los campos de correo, abre la dirección que entrega Vite en Chrome o Edge. El formulario usa un campo de correo normal y no cambia el teclado.

## Archivos que se integran

Al pasar el trabajo al proyecto principal se revisará qué archivos fuente y configuración hacen falta. `node_modules/` y `dist/` son carpetas generadas y están excluidas de Git.
