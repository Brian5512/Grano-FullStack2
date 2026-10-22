# React separado para practicar

Esta carpeta contiene una aplicación independiente para aprender y preparar la migración. No usa las páginas HTML ni los archivos JavaScript o CSS del sitio principal.

## Probar la aplicación

Desde esta carpeta, instala las dependencias y ejecuta el servidor:

```bash
npm install
npm run dev
```

La primera pantalla muestra un catálogo sencillo. Los productos de `src/datos/productos.js` son datos de ejemplo para aprender cómo React los muestra en tarjetas.

## Archivos que se integran

Al pasar el trabajo al proyecto principal se revisará qué archivos fuente y configuración hacen falta. `node_modules/` y `dist/` son carpetas generadas y están excluidas de Git.
