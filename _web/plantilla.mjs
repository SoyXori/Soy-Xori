// Documento HTML común: <head>, cabecera, pie y piezas compartidas.
import { config, niveles } from "./config.mjs";
import { icono } from "./iconos.mjs";

export const esc = (t) =>
  String(t)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const navegacion = [
  { ruta: "/guias/", texto: "Guías" },
  { ruta: "/videos/", texto: "Vídeos" },
  { ruta: "/sin-spoilers/", texto: "Sin spoilers" },
];

export function amazon(busqueda) {
  const p = new URLSearchParams({ k: busqueda });
  if (config.amazonTag) p.set("tag", config.amazonTag);
  return `https://www.amazon.es/s?${p}`;
}

export const fechaLarga = (iso) =>
  new Date(iso + "T12:00:00").toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });

// ---------- Piezas compartidas ----------

export function insignia(nivel) {
  const n = niveles[nivel];
  return `<span class="insignia insignia-${nivel}">${nivel === "sin-spoilers" ? icono.escudo : icono.ojo}${esc(n.nombre)}</span>`;
}

export function tarjetaGuia(g, ctx) {
  return `<a class="tarjeta-guia" href="${ctx.url(`/guias/${g.slug}/`)}" data-categoria="${esc(g.categoria)}" data-texto="${esc((g.titulo + " " + g.resumen).toLowerCase())}">
  <span class="tarjeta-guia-arriba"><span class="etiqueta">${esc(g.categoria)}</span>${insignia(g.nivel)}</span>
  <span class="tarjeta-guia-titulo">${esc(g.titulo)}</span>
  <span class="tarjeta-guia-resumen">${esc(g.resumen)}</span>
  <span class="tarjeta-guia-pie">${icono.reloj}${g.minutos} min · ${fechaLarga(g.fecha)}<span class="tarjeta-guia-flecha">${icono.flecha}</span></span>
</a>`;
}

export function cuentaAtras(variante = "") {
  return `<div class="cuenta ${variante}" data-cuenta data-lanzamiento="${config.lanzamiento}" data-inicio="${config.inicioCuentaAtras}">
  <p class="cuenta-titulo" data-cuenta-titulo>Sale el 19 de noviembre</p>
  <div class="cuenta-digitos" data-cuenta-digitos role="timer" aria-label="Tiempo que falta para el lanzamiento">
    <span><b data-d>--</b><small>días</small></span>
    <span><b data-h>--</b><small>horas</small></span>
    <span><b data-m>--</b><small>min</small></span>
    <span><b data-s>--</b><small>seg</small></span>
  </div>
  <div class="cuenta-barra" data-cuenta-barra aria-hidden="true"><i data-cuenta-relleno></i></div>
  <p class="cuenta-pie" data-cuenta-pie>PS5 y Xbox Series X|S</p>
</div>`;
}

export function bloqueAfiliado(ctx, { titulo = "¿Aún no lo tienes?", compacto = false } = {}) {
  const item = (nombre, busqueda) => `<a class="afiliado-item" href="${amazon(busqueda)}" rel="sponsored nofollow noopener" target="_blank">
      <span class="afiliado-icono">${icono.mando}</span>
      <span class="afiliado-texto"><b>${nombre}</b><small>Ver precio en Amazon</small></span>
      ${icono.externo}
    </a>`;
  return `<aside class="afiliado${compacto ? " afiliado-compacto" : ""}" aria-label="Comprar GTA VI">
  <div class="afiliado-cabeza"><h2 class="afiliado-titulo">${titulo}</h2><span class="etiqueta">Enlace de afiliado</span></div>
  <div class="afiliado-lista">
    ${item("GTA VI · PS5", "GTA VI PS5")}
    ${item("GTA VI · Xbox Series X|S", "GTA VI Xbox Series X")}
  </div>
  <p class="nota">Si lo compras desde aquí, Xori se lleva una pequeña comisión. A ti te cuesta lo mismo.</p>
</aside>`;
}

export function anuncio(formato) {
  if (!config.anuncios) return "";
  return `<aside class="anuncio anuncio-${formato}" aria-label="Publicidad"><span>Publicidad</span></aside>`;
}

export function tarjetasRedes() {
  return `<div class="redes">${config.redes
    .map(
      (r) => `<a class="red red-${r.id}" href="${r.url}" target="_blank" rel="noopener">
    <span class="red-icono">${icono[r.id]}</span>
    <span class="red-texto"><b>${r.nombre}</b><small>${esc(r.usuario)} · ${esc(r.texto)}</small></span>
    ${icono.externo}
  </a>`
    )
    .join("")}</div>`;
}

export function bandaRedes() {
  const redes = [...config.redes.map((r) => ({ url: r.url, nombre: r.nombre, usuario: r.usuario, icono: icono[r.id] }))];
  if (config.whatsappCanal) redes.push({ url: config.whatsappCanal, nombre: "WhatsApp", usuario: "Canal de Xori", icono: icono.whatsapp });
  return `<section class="banda-redes" aria-label="Redes de Xori">
  <div class="contenedor banda-redes-fila">
    <p class="banda-redes-titulo">Sígueme en mis redes</p>
    <ul class="banda-redes-lista" style="--columnas: ${redes.length}">
      ${redes.map((r) => `<li><a class="pastilla-red" href="${r.url}" target="_blank" rel="noopener">${r.icono}<span><b>${r.nombre}</b><small>${esc(r.usuario)}</small></span></a></li>`).join("")}
    </ul>
  </div>
</section>`;
}

export function botonWhatsapp(clase = "boton boton-primario") {
  if (!config.whatsappCanal) return "";
  return `<a class="${clase}" href="${config.whatsappCanal}" target="_blank" rel="noopener">${icono.whatsapp}Canal de WhatsApp</a>`;
}

export function escudoSpoiler(aviso, contenido) {
  return `<div class="escudo" data-escudo>
  <button class="escudo-boton" type="button" aria-expanded="false">${icono.ojoTachado}<span><b>Spoiler avisado:</b> ${esc(aviso)}</span><span class="escudo-accion">Mostrar</span></button>
  <div class="escudo-contenido" hidden>${contenido}</div>
</div>`;
}

// Cabecera de página interior (todas menos la portada).
export function cabezaPagina({ etiqueta, titulo, entradilla, extra = "" }) {
  return `<section class="cabeza-pagina">
  <div class="cabeza-pagina-fondo" aria-hidden="true"></div>
  <div class="contenedor cabeza-pagina-dentro">
    <p class="antetitulo">${etiqueta}</p>
    <h1 class="titulo-pagina">${titulo}</h1>
    ${entradilla ? `<p class="entradilla">${entradilla}</p>` : ""}
    ${extra}
  </div>
</section>`;
}

// ---------- Fondo animado (original, sin material de Rockstar) ----------

function azar(semilla) {
  let s = semilla;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

function horizonte() {
  const r = azar(19112026);
  let x = 0;
  let edificios = "";
  let ventanas = "";
  while (x < 1600) {
    const ancho = 34 + Math.floor(r() * 70);
    const centro = Math.abs(x - 1000) < 380;
    const alto = Math.floor((centro ? 110 : 40) + r() * (centro ? 170 : 90));
    const y = 300 - alto;
    edificios += `<rect x="${x}" y="${y}" width="${ancho - 4}" height="${alto}"></rect>`;
    if (centro && r() > 0.6) edificios += `<rect x="${x + ancho / 2 - 3}" y="${y - 22}" width="2" height="22"></rect>`;
    for (let wy = y + 10; wy < 290; wy += 14) {
      for (let wx = x + 6; wx < x + ancho - 10; wx += 10) {
        if (r() > 0.78) {
          const lenta = r() > 0.9 ? ` class="parpadea" style="animation-delay:${(r() * 6).toFixed(1)}s"` : "";
          ventanas += `<rect x="${wx}" y="${wy}" width="4" height="6"${lenta}></rect>`;
        }
      }
    }
    x += ancho;
  }
  return `<svg class="fondo-ciudad" viewBox="0 0 1600 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><g class="ciudad-edificios">${edificios}</g><g class="ciudad-ventanas">${ventanas}</g></svg>`;
}

const palmera = (clase) => `<svg class="fondo-palmera ${clase}" viewBox="0 0 220 420" aria-hidden="true">
  <path class="palmera-tronco" d="M112 420 C 110 330 98 240 118 140"></path>
  <g class="palmera-copa">
    <path d="M118 140 C 150 112 196 116 218 150 C 186 132 150 134 118 146 Z"></path>
    <path d="M118 140 C 140 100 182 86 214 100 C 176 104 146 118 118 146 Z"></path>
    <path d="M118 140 C 112 98 128 62 160 48 C 138 78 126 108 120 146 Z"></path>
    <path d="M118 140 C 92 106 52 100 22 118 C 58 116 90 124 116 146 Z"></path>
    <path d="M118 140 C 82 128 40 142 6 176 C 44 158 84 148 116 148 Z"></path>
    <path d="M118 140 C 100 160 92 196 96 230 C 104 198 112 168 122 148 Z"></path>
    <path d="M118 140 C 142 156 158 188 160 222 C 148 192 134 166 116 150 Z"></path>
  </g>
</svg>`;

export function fondoAnimado(ctx) {
  const v = config.videoFondo;
  const video = v
    ? `<video class="fondo-video" autoplay muted loop playsinline preload="metadata" poster="${ctx.rec(v.poster)}" data-fondo-video><source src="${ctx.rec(v.mp4)}" type="video/mp4"></video>`
    : "";
  return `<div class="fondo" aria-hidden="true">
  <div class="fondo-cielo"></div>
  <div class="fondo-estrellas"></div>
  <div class="fondo-sol"></div>
  ${horizonte()}
  <div class="fondo-mar"><i></i></div>
  ${palmera("palmera-izquierda")}
  ${palmera("palmera-derecha")}
  ${video}
  <div class="fondo-grano"></div>
  <div class="fondo-velo"></div>
</div>`;
}

// ---------- Documento ----------

function cabecera(ctx, activa) {
  const enlaces = navegacion
    .map((n) => {
      const actual = activa === n.ruta || (n.ruta !== "/" && activa.startsWith(n.ruta));
      return `<a href="${ctx.url(n.ruta)}"${actual ? ' aria-current="page"' : ""}>${n.texto}</a>`;
    })
    .join("");
  return `<a class="saltar" href="#contenido">Saltar al contenido</a>
<header class="cabecera" data-cabecera>
  <div class="contenedor cabecera-fila">
    <a class="marca" href="${ctx.url("/")}" aria-label="Soy Xori, inicio">
      <img src="${ctx.rec("/recursos/img/avatar-xori-96.webp")}" alt="" width="40" height="42">
      <span class="marca-nombre">SOY XORI</span>
      <span class="marca-chip">Guía GTA VI</span>
    </a>
    <nav class="nav" id="nav-principal" aria-label="Principal">${enlaces}
      <a class="nav-solo-movil" href="${ctx.url("/enlaces/")}">Todas mis redes</a>
    </nav>
    <div class="cabecera-acciones">
      <a class="sello" href="${ctx.url("/sin-spoilers/")}" title="Aquí no se publica nada filtrado">${icono.escudo}<span>Sin spoilers</span></a>
      <button class="boton-icono" type="button" data-tema-boton aria-label="Cambiar a modo oscuro"><span class="si-claro">${icono.luna}</span><span class="si-oscuro">${icono.sol}</span></button>
      <button class="boton-icono boton-menu" type="button" data-menu-boton aria-expanded="false" aria-controls="nav-principal" aria-label="Abrir menú"><span class="si-cerrado">${icono.menu}</span><span class="si-abierto">${icono.cerrar}</span></button>
    </div>
  </div>
</header>`;
}

function pie(ctx) {
  const redes = config.redes.map((r) => `<a href="${r.url}" target="_blank" rel="noopener">${r.nombre}</a>`).join("");
  return `<footer class="pie">
  <div class="contenedor pie-rejilla">
    <div class="pie-marca">
      <span class="marca-nombre">SOY XORI</span>
      <p>${esc(config.lema)}<br>GTA VI y Fortnite, en español.</p>
    </div>
    <nav class="pie-columna" aria-label="La guía"><h2>La guía</h2>
      <a href="${ctx.url("/guias/")}">Guías</a><a href="${ctx.url("/videos/")}">Vídeos</a>
    </nav>
    <nav class="pie-columna" aria-label="Xori"><h2>Xori</h2>
      <a href="${ctx.url("/sin-spoilers/")}">Sin spoilers</a><a href="${ctx.url("/enlaces/")}">Enlaces</a><a href="${ctx.url("/sin-spoilers/")}#contacto">Contacto para marcas</a>
    </nav>
    <nav class="pie-columna" aria-label="Redes"><h2>Redes</h2>${redes}</nav>
  </div>
  <div class="contenedor pie-legal">
    <p>Soy Xori no tiene relación con Rockstar Games ni con Take-Two Interactive. Grand Theft Auto, GTA VI y sus nombres son marcas de sus propietarios. Esta web no aloja material de Rockstar.</p>
    <p><a href="${ctx.url("/legal/")}">Aviso legal</a> · <a href="${ctx.url("/legal/")}#privacidad">Privacidad</a> · © ${new Date().getFullYear()} Soy Xori</p>
  </div>
</footer>`;
}

const scriptTema = `<script>(function(){try{var t=localStorage.getItem("xori:tema");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})();</script>`;

export function documento(p, ctx) {
  const titulo = ctx.fragmento ? "Guía GTA VI de Soy Xori" : p.ruta === "/" ? p.titulo : `${p.titulo} · Soy Xori`;
  const url = config.dominio + (p.ruta === "/404" ? "/" : p.ruta);
  const imagen = config.dominio + "/og-image.jpg";
  const jsonld = p.jsonld ? `<script type="application/ld+json">${JSON.stringify(p.jsonld)}</script>` : "";
  const cabeza = `<title>${esc(titulo)}</title>
<meta name="description" content="${esc(p.descripcion)}">
${ctx.fragmento ? '<meta name="claude:viewport-fit-sides" content="cover">' : ""}
<meta name="xori:raiz" content="${ctx.raiz}">
${p.ruta === "/404" ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`}
<meta name="theme-color" content="#fff4ec" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0d0919" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="${p.tipo === "articulo" ? "article" : "website"}">
<meta property="og:site_name" content="Soy Xori">
<meta property="og:locale" content="es_ES">
<meta property="og:title" content="${esc(p.titulo)}">
<meta property="og:description" content="${esc(p.descripcion)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${imagen}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" href="${ctx.rec("/recursos/img/favicon.png")}">
<link rel="apple-touch-icon" href="${ctx.rec("/recursos/img/apple-touch-icon.png")}">
<link rel="preload" href="${ctx.rec("/recursos/tipografias/montserrat-cursiva.woff2")}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${ctx.rec("/recursos/tipografias/inter.woff2")}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${ctx.rec("/recursos/css/estilos.css")}">
${scriptTema}
${jsonld}`;

  const scripts = ["/recursos/js/principal.js", ...(p.scripts ?? [])]
    .map((s) => `<script src="${ctx.rec(s)}" defer></script>`)
    .join("\n");

  const cuerpo = `${p.sinCabecera ? "" : cabecera(ctx, p.ruta)}
<main id="contenido" class="${p.claseMain ?? ""}">
${p.cuerpo(ctx)}
</main>
${p.sinPie ? "" : pie(ctx)}
${scripts}`;

  if (ctx.fragmento) return `${cabeza}\n${cuerpo}\n`;

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${cabeza}
</head>
<body>
${cuerpo}
</body>
</html>
`;
}
