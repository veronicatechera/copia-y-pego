/* ============================================================
   COPIA & PEGO — service-worker.js

   Dos estrategias distintas, para no tener que estar "limpiando caché"
   cada vez que se edita el catálogo:

   1) ESQUELETO del sitio (index.html, css, js) -> NETWORK FIRST.
      Siempre intenta traer la versión más nueva de internet. Si no hay
      conexión, usa la última que guardó. Así, cuando subís un cambio a
      productos.js, con un simple refresh ya se ve — no hace falta
      unregister ni borrar site data.

   2) Fotos e íconos -> CACHE FIRST.
      Casi no cambian, así que sirven rápido desde el caché y de paso
      quedan disponibles sin conexión.

   IMPORTANTE: solo hace falta subir el número de CACHE_VERSION si vos
   modificás ESTE archivo (service-worker.js) o la lista ARCHIVOS_BASE.
   Para cambios normales de contenido (productos, textos, fotos) no
   hace falta tocarlo.
   ============================================================ */

const CACHE_VERSION = "v2";
const CACHE_NAME = `copiaypego-${CACHE_VERSION}`;

const ARCHIVOS_BASE = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./js/app.js",
  "./js/productos.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

const EXTENSIONES_ESTATICAS = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".ico"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARCHIVOS_BASE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((nombres) =>
      Promise.all(
        nombres
          .filter((nombre) => nombre.startsWith("copiaypego-") && nombre !== CACHE_NAME)
          .map((nombre) => caches.delete(nombre))
      )
    )
  );
  self.clients.claim();
});

function esArchivoEstatico(url){
  return EXTENSIONES_ESTATICAS.some((ext) => url.pathname.endsWith(ext));
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const mismoOrigen = url.origin === self.location.origin;

  if (mismoOrigen && esArchivoEstatico(url)) {
    event.respondWith(
      caches.match(request).then((cacheado) => {
        if (cacheado) return cacheado;
        return fetch(request).then((respuesta) => {
          if (respuesta && respuesta.status === 200) {
            const copia = respuesta.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copia));
          }
          return respuesta;
        });
      })
    );
    return;
  }

  event.respondWith(
    fetch(request)
      .then((respuesta) => {
        if (respuesta && respuesta.status === 200 && mismoOrigen) {
          const copia = respuesta.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copia));
        }
        return respuesta;
      })
      .catch(() =>
        caches.match(request).then((cacheado) => {
          if (cacheado) return cacheado;
          if (request.mode === "navigate") return caches.match("./index.html");
        })
      )
  );
});
