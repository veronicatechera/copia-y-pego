/*
  ============================================================
  PRODUCTOS — Copia & Pego
  ============================================================
  Acá vive todo el catálogo. Para sumar un producto nuevo:

  1) Copiá un bloque { ... } entero (desde la { hasta la } con la coma).
  2) Pegalo dentro del array, antes del corchete final "];".
  3) Cambiá los datos. No hace falta tocar el HTML ni el CSS.

  Campos:
  - id          -> identificador único, sin espacios (ej: "sticker-troquelado").
                   No puede repetirse entre productos.
  - categoria   -> debe ser EXACTAMENTE una de estas (así arma los filtros):
                   "impresiones" | "stickers" | "etiquetas" |
                   "libros-colorear" | "kits" | "cuadros" | "papeleria"
  - nombre      -> nombre del producto, así se muestra en la tarjeta
  - descripcion -> 1-2 frases cortas
  - tamanios    -> lista de tamaños/variantes disponibles (array de texto)
  - imagen      -> ruta a la foto. Mientras no tengas fotos propias, dejá
                   el placeholder de la categoría (images/<categoria>.svg).
                   Cuando tengas la foto real, poné el archivo en la carpeta
                   "images/" y cambiá esta ruta (ej: "images/sticker-gato.jpg")
  - mensaje     -> (opcional) texto del WhatsApp para ESTE producto en particular.
                   Si lo dejás vacío (""), se arma solo con el nombre del producto.
  ============================================================
*/

const PRODUCTOS = [
  {
    id: "impresion-a4-color",
    categoria: "impresiones",
    nombre: "Impresiones a color",
    descripcion: "Impresión de alta calidad para trabajos, apuntes, planos y proyectos. Papel común.",
    tamanios: ["A4", "A3", "Oficio"],
    imagen: "images/1.png",
    mensaje: "Hola! Vi el catálogo de Copia & Pego y quiero realizar una impresión a color."
  },
  {
    id: "stickers",
    categoria: "stickers",
    nombre: "Stickers",
    descripcion: "Stickers full color con forma personalizada, puede ser resistentes al agua. Ideales para emprendimientos y uso personal.",
    tamanios: ["3 cm", "5 cm", "7 cm", "10 cm", "A medida"],
    imagen: "images/2.png",
    mensaje: "Hola! Vi el catálogo de Copia & Pego y quiero consultar por los stickers"
  },
  {
    id: "etiqueta",
    categoria: "etiquetas",
    nombre: "Etiquetas",
    descripcion: "Etiquetas para productos o packaging. Distintos materiales y terminaciones.",
    tamanios: ["3x3 cm", "5x5 cm", "8x5 cm", "A medida"],
    imagen: "images/3.png",
    mensaje: "Hola! Vi el catálogo de Copia & Pego y quiero consultar por las etiquetas"
  },
  {
    id: "libro-colorear-personalizado",
    categoria: "libros-colorear",
    nombre: "Libro para colorear personalizado",
    descripcion: "Cuadernillo de láminas para colorear, con diseños propios o a pedido. Ideal para regalos y eventos.",
    tamanios: ["A5", "A medida"],
    imagen: "images/4.png",
    mensaje: "Hola! Vi el catálogo de Copia & Pego y quiero consultar por el libro para colorear personalizado"
  },
  {
    id: "colonia-para-colorear",
    categoria: "libros-colorear",
    nombre: "Colonia para colorear",
    descripcion: "Producto Exclusivo de Copia&Pego, Colonia para colorear es ideal para regalarte o regalar.",
    tamanios: ["A5"],
    imagen: "images/5.png",
    mensaje: "Hola! Vi el catálogo de Copia & Pego y quiero consultar por El libro Colonia para colorear"
  },
  {
    id: "cuadro-decorativo",
    categoria: "cuadros",
    nombre: "Cuadros decorativos",
    descripcion: "Impresión y montaje de láminas, fotos o ilustraciones sobre distintos soportes para decorar.",
    tamanios: ["20x30 cm", "30x40 cm", "A medida"],
    imagen: "images/6.png",
    mensaje: "Hola! Vi el catálogo de Copia & Pego y quiero consultar por los cuadros decorativos"
  },
  {
    id: "papeleria",
    categoria: "papeleria",
    nombre: "Papelería personalizada",
    descripcion: "Tarjetas, invitaciones, agendas y sets de papelería a medida para tu evento o marca.",
    tamanios: ["A6", "A5", "A medida"],
    imagen: "images/7.png",
    mensaje: ""
  },
  {
    id: "kit-fiestas",
    categoria: "kits",
    nombre: "Kit para fiestas personalizado",
    descripcion: "Kit personalizado para hacer especial tu celebracion o evento. Incluye: Toppers, tags, stickers, invitaciones y mucho más.",
    tamanios: ["A medida"],
    imagen: "images/8.png",
    mensaje: "Hola! Vi el catálogo de Copia & Pego y quiero consultar por los kits para fiestas personalizados"
  },
  {
    id: "kit-notitas",
    categoria: "kits",
    nombre: "Kits notitas",
    descripcion: "Producto Exclusivo de Copia&Pego, Kits notitas es un combo de Libreta, block de notitas, goma y lapiz que es ideal para regalarte o regalar.",
    tamanios: ["Personalizados"],
    imagen: "images/9.png",
    mensaje: "Hola! Vi el catálogo de Copia & Pego y quiero consultar por los kits notitas"
  },
];
