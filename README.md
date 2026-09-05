Copia & Pego — Catálogo web (PWA)

Catálogo online de Copia & Pego. Es un sitio estático (HTML/CSS/JS puro,
sin frameworks) que además funciona como app instalable en el celular.

Actualizar el sitio ya instalado

El sitio queda guardado en caché para que funcione sin conexión. Si hacés
cambios grandes y no se actualizan en el celular de un cliente, subí el
número de versión en la primera línea de `service-worker.js`
(`CACHE_VERSION`), por ejemplo de `"v1"` a `"v2"`.
