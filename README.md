# Copia & Pego — Catálogo web (PWA)

Catálogo online de Copia & Pego. Es un sitio estático (HTML/CSS/JS puro,
sin frameworks) que además funciona como app instalable en el celular.

## Estructura

```
index.html          -> la página (una sola)
css/styles.css       -> todos los estilos
js/productos.js      -> ACÁ SE CARGAN LOS PRODUCTOS (ver instrucciones abajo)
js/app.js            -> lógica del sitio (filtros, WhatsApp, instalación)
manifest.json        -> configuración de la PWA (nombre, ícono, colores)
service-worker.js     -> hace que el sitio funcione sin conexión
icons/               -> íconos de la app
images/               -> fotos de productos (por ahora, placeholders)
```

## Cómo publicarlo gratis en GitHub Pages

1. Creá un repositorio nuevo en GitHub (puede llamarse `catalogo` o como quieras).
2. Subí **todo** el contenido de esta carpeta a la raíz del repositorio.
3. Andá a **Settings → Pages**.
4. En "Source" elegí la rama `main` y la carpeta `/ (root)`. Guardá.
5. En un par de minutos el sitio queda publicado en:
   `https://<tu-usuario>.github.io/<nombre-del-repo>/`

Con ese link ya podés compartirlo en la bio de Instagram, en WhatsApp, etc.

> Nota: si el sitio termina publicado en una subcarpeta (como el ejemplo de
> arriba, con `/nombre-del-repo/` al final), no hay que cambiar nada: todos
> los enlaces del sitio son relativos y van a funcionar igual.

## Cómo agregar o editar productos

Todo el catálogo vive en **`js/productos.js`**. No hace falta tocar el HTML.

1. Abrí `js/productos.js`.
2. Copiá un bloque `{ ... }` completo de un producto parecido al nuevo.
3. Pegalo dentro del array `PRODUCTOS`, antes del `];` final.
4. Cambiá `nombre`, `descripcion`, `tamanios`, `categoria` e `imagen`.
5. Guardá y subí el cambio al repositorio (o editalo directo en GitHub,
   con el lápiz ✏️ de "Edit file").

Las categorías válidas son: `impresiones`, `stickers`, `etiquetas`,
`libros-colorear`, `remeras`, `cuadros`, `papeleria`. Tienen que escribirse
exactamente así (son las que arman los botones de filtro arriba del catálogo).

## Cómo reemplazar las fotos placeholder

Cada producto usa por ahora una imagen genérica de su categoría
(`images/impresiones.svg`, `images/stickers.svg`, etc. con marcas de
imprenta y el texto "REEMPLAZAR IMAGEN").

Para poner la foto real de un producto:

1. Subí la foto a la carpeta `images/` (formato `.jpg`, `.png` o `.webp`,
   lo más cuadrada posible para que se vea prolija en las tarjetas).
2. En `js/productos.js`, cambiá el campo `imagen` de ese producto por la
   ruta nueva, por ejemplo: `imagen: "images/sticker-gato.jpg"`.

No hace falta reemplazar todas de una — podés ir cambiándolas de a una,
el resto sigue mostrando el placeholder mientras tanto.

## Cambiar el número de WhatsApp

En `js/app.js`, primera línea útil:

```js
const WHATSAPP_NUMERO = "59891511170";
```

## Instalar como app

- **Android/Chrome**: aparece un botón "Instalar app" en la barra superior.
- **iPhone/Safari**: no hay botón automático (Apple no lo permite), por eso
  el sitio muestra un aviso con las instrucciones: Compartir → "Agregar a
  pantalla de inicio".

## Actualizar el sitio ya instalado

El sitio queda guardado en caché para que funcione sin conexión. Si hacés
cambios grandes y no se actualizan en el celular de un cliente, subí el
número de versión en la primera línea de `service-worker.js`
(`CACHE_VERSION`), por ejemplo de `"v1"` a `"v2"`.
