# React separado para practicar

Esta carpeta contiene una aplicación independiente para aprender y preparar la migración. No usa las páginas HTML ni los archivos JavaScript o CSS del sitio principal. Las imágenes que necesita están copiadas dentro de `src/assets`.

## Probar la aplicación

Desde esta carpeta, instala las dependencias y ejecuta el servidor:

```bash
npm install
npm run dev
```

La aplicación incluye el catálogo y las fichas de producto, un carrito que se guarda en `localStorage`, acceso y registro con validación del RUT, cuenta de comprador, contacto y un panel de administración. Usuarios, sesión y mensajes de esta práctica también se guardan en `localStorage`; el acceso de prueba es `admin@duocuc.cl` con contraseña `1234`. Como es una maqueta, no procesa compras ni usa un servidor.

Desde administración se pueden agregar productos de prueba. Sus datos se guardan en `localStorage` bajo `granoProductosReact` y aparecen en el catálogo al instante, incluso después de recargar. La imagen de ejemplo está incluida en `src/assets`; registrar un producto no crea archivos. También se pueden quitar los productos agregados en esta práctica.

## Archivos que se integran

Al pasar el trabajo al proyecto principal se revisará qué archivos fuente y configuración hacen falta. `node_modules/` y `dist/` son carpetas generadas y están excluidas de Git.
