// Datos de la web que cambian sin tocar el diseño. Tras editar: node _web/construir.mjs

export const config = {
  dominio: "https://soyxori.com",
  nombre: "Soy Xori",
  lema: "Juego, opino y te cuento lo que sé. Sin rodeos.",

  // Hora de España (CET). La cuenta atrás y el «Día N en Leonida» salen de aquí.
  lanzamiento: "2026-11-19T00:00:00+01:00",
  inicioCuentaAtras: "2026-07-15T00:00:00+02:00",

  redes: [
    { id: "youtube", nombre: "YouTube", usuario: "@soy_xori", url: "https://youtube.com/@soy_xori", texto: "Vídeos largos y guías" },
    { id: "tiktok", nombre: "TikTok", usuario: "@soy_xori", url: "https://www.tiktok.com/@soy_xori", texto: "Lo que descubro, en corto" },
    { id: "twitch", nombre: "Twitch", usuario: "@soy_xori", url: "https://www.twitch.tv/soy_xori", texto: "Directos para descubrirlo juntos" },
    { id: "instagram", nombre: "Instagram", usuario: "@soyxori", url: "https://www.instagram.com/soyxori/", texto: "El día a día" },
  ],

  // Pendiente de Xori. Mientras esté vacío, la web no enseña el botón.
  whatsappCanal: "",

  // Email para marcas y para el aviso legal. Vacío = se marca como pendiente.
  emailContacto: "",

  // Etiqueta de afiliado de Amazon España (p. ej. "soyxori-21"). Vacío = enlaces sin etiqueta.
  amazonTag: "",

  // Huecos de publicidad. Se encienden cuando haya red de anuncios.
  anuncios: false,

  // Vídeo de fondo de la portada. Solo grabaciones propias de Xori, nunca tráileres de Rockstar.
  // Ejemplo: { mp4: "/recursos/video/fondo.mp4", poster: "/recursos/video/fondo.jpg" }
  videoFondo: null,

  // Vídeos de Xori para la portada y /videos/.
  // { youtubeId: "xxxxxxxxxxx", titulo: "…", fecha: "2026-11-19", nivel: "sin-spoilers" }
  videos: [],

  // Aviso legal (LSSI). Lo rellena el titular de la web.
  legal: { titular: "", nif: "", domicilio: "", email: "" },

  guias: [
    {
      slug: "gta-6-fecha-plataformas",
      titulo: "GTA VI: fecha, plataformas y lo que se sabe sin spoilers",
      corto: "Fecha, plataformas y lo que se sabe",
      resumen: "Cuándo sale, en qué consolas y qué ha enseñado Rockstar de forma oficial. Nada filtrado.",
      categoria: "Antes de jugar",
      nivel: "sin-spoilers",
      fecha: "2026-11-12",
      minutos: 3,
    },
    {
      slug: "evitar-spoilers-gta-6",
      titulo: "Cómo llegar al 19 de noviembre sin spoilers de GTA VI",
      corto: "Cómo evitar spoilers",
      resumen: "Las palabras que conviene silenciar y dónde se silencian, para llegar al lanzamiento sin que te cuenten nada.",
      categoria: "Antes de jugar",
      nivel: "sin-spoilers",
      fecha: "2026-11-12",
      minutos: 4,
    },
  ],

  // Temas que se abren cuando empiece a jugar.
  proximamente: ["Dinero", "Coches", "Coleccionables", "Misiones secundarias", "Ajustes", "Trofeos y logros"],
};

export const niveles = {
  "sin-spoilers": { nombre: "Sin spoilers", descripcion: "Mecánicas, ajustes, dinero, coches. Nada de historia." },
  "aviso": { nombre: "Spoiler avisado", descripcion: "Nombra sitios o misiones. Va oculto hasta que pulses." },
};
