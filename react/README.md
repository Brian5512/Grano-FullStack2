# React separado para practicar

Esta carpeta contiene una aplicación independiente para aprender y preparar la migración. No usa las páginas HTML ni los archivos JavaScript o CSS del sitio principal. Las imágenes que necesita están copiadas dentro de `src/assets`.

## Probar la aplicación

Desde esta carpeta, instala las dependencias y ejecuta el servidor:

```bash
npm install
npm run dev
```

La pantalla muestra un catálogo sencillo con seis productos de ejemplo. Cada tarjeta abre la ficha del producto y permite volver al catálogo. También se pueden agregar productos al carrito y quitarlos; el contador y la lista se manejan con el estado de React (`useState`). El carrito se guarda en `localStorage` para que siga ahí al recargar. Esta práctica no procesa compras.

## Archivos que se integran

Al pasar el trabajo al proyecto principal se revisará qué archivos fuente y configuración hacen falta. `node_modules/` y `dist/` son carpetas generadas y están excluidas de Git.
