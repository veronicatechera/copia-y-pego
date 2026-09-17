
const WHATSAPP_NUMERO = "59891511170"; 
const CATEGORIAS = [
  { id: "todos",            label: "Todos" },
  { id: "impresiones",      label: "Impresiones" },
  { id: "stickers",         label: "Stickers" },
  { id: "etiquetas",        label: "Etiquetas" },
  { id: "libros-colorear",  label: "Libros para colorear" },
  { id: "kits",          label: "Kits" },
  { id: "cuadros",          label: "Cuadros" },
  { id: "papeleria",        label: "Papelería" },
];

function linkWhatsApp(mensaje){
  const base = `https://wa.me/${WHATSAPP_NUMERO}`;
  const texto = mensaje && mensaje.trim() ? mensaje : "Hola! Vi el catálogo de Copia & Pego y quiero hacer una consulta.";
  return `${base}?text=${encodeURIComponent(texto)}`;
}

function mensajePorDefecto(nombre){
  return `Hola! Vi el catálogo de Copia & Pego y quiero consultar por ${nombre}.`;
}
document.addEventListener("DOMContentLoaded", () => {
  const genericos = document.querySelectorAll("#waHero, #waTop, #waFooter");
  genericos.forEach(a => {
    a.href = linkWhatsApp("Hola! Vi el catálogo de Copia & Pego y quiero hacer una consulta.");
  });

  document.getElementById("anio").textContent = new Date().getFullYear();

  renderFiltros();
  renderProductos("todos");
});
function renderFiltros(){
  const cont = document.getElementById("filtros");
  cont.innerHTML = "";
  CATEGORIAS.forEach((cat, i) => {
    const btn = document.createElement("button");
    btn.className = "filtro";
    btn.textContent = cat.label;
    btn.dataset.categoria = cat.id;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", i === 0 ? "true" : "false");
    btn.addEventListener("click", () => {
      cont.querySelectorAll(".filtro").forEach(b => b.setAttribute("aria-selected", "false"));
      btn.setAttribute("aria-selected", "true");
      renderProductos(cat.id);
    });
    cont.appendChild(btn);
  });
}
function renderProductos(categoria){
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  const lista = (typeof PRODUCTOS !== "undefined" ? PRODUCTOS : [])
    .filter(p => categoria === "todos" || p.categoria === categoria);

  if (lista.length === 0){
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "Todavía no hay productos cargados en esta categoría.";
    grid.appendChild(empty);
    return;
  }

  const catLabel = id => (CATEGORIAS.find(c => c.id === id) || {}).label || id;

  lista.forEach(p => {
    const card = document.createElement("article");
    card.className = "card";

    const mensaje = (p.mensaje && p.mensaje.trim()) ? p.mensaje : mensajePorDefecto(p.nombre);
    const tamanios = (p.tamanios || []).map(t => `<span class="tag">${t}</span>`).join("");

    card.innerHTML = `
      <div class="card__media">
        <img src="${p.imagen}" alt="${p.nombre}" loading="lazy" width="400" height="400">
      </div>
      <div class="card__body">
        <p class="card__eyebrow">${catLabel(p.categoria)}</p>
        <h3 class="card__title">${p.nombre}</h3>
        <p class="card__desc">${p.descripcion}</p>
        ${tamanios ? `<div class="card__sizes">${tamanios}</div>` : ""}
        <a class="btn btn--whatsapp btn--card" href="${linkWhatsApp(mensaje)}" target="_blank" rel="noopener">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.06h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.14.82.84-3.06-.2-.31a8.15 8.15 0 0 1-1.26-4.35c0-4.5 3.67-8.16 8.19-8.16 2.19 0 4.24.85 5.79 2.4a8.11 8.11 0 0 1 2.4 5.78c0 4.5-3.68 8.15-8.13 8.15Zm4.47-6.1c-.24-.12-1.44-.71-1.67-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19-.71-.63-1.19-1.42-1.33-1.66-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z"/></svg>
          Consultar por WhatsApp
        </a>
      </div>
    `;
    grid.appendChild(card);
  });
}

let promptInstalacion = null;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  promptInstalacion = e;
  const btn = document.getElementById("btnInstalar");
  btn.hidden = false;
  btn.addEventListener("click", async () => {
    btn.hidden = true;
    promptInstalacion.prompt();
    await promptInstalacion.userChoice;
    promptInstalacion = null;
  });
});

(function tipInstalacionIOS(){
  const esIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const yaInstalada = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  const yaVisto = sessionStorage.getItem("cyp_tip_ios_visto");

  if (esIOS && !yaInstalada && !yaVisto){
    const tip = document.getElementById("toastInstalarIOS");
    setTimeout(() => { tip.hidden = false; }, 2500);
    document.getElementById("cerrarTipIOS").addEventListener("click", () => {
      tip.hidden = true;
      sessionStorage.setItem("cyp_tip_ios_visto", "1");
    });
  }
})();

if ("serviceWorker" in navigator){
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js")
      .then((registro) => {
        registro.update();
      })
      .catch(() => {
        /* si falla (ej. abierto como file://), seguimos sin offline */
      });
  });
}
