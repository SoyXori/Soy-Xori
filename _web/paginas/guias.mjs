import { config, niveles } from "../config.mjs";
import { icono } from "../iconos.mjs";
import { cabezaPagina, tarjetaGuia, insignia, bloqueAfiliado, anuncio, esc, fechaLarga } from "../plantilla.mjs";

const categorias = [...new Set(config.guias.map((g) => g.categoria))];

export const guias = {
  ruta: "/guias/",
  titulo: "Guías de GTA VI sin spoilers",
  descripcion: "Guías de GTA VI en español, escritas por Xori después de jugarlo. Cada guía dice si tiene spoilers y los tapa hasta que tú decidas verlos.",
  cuerpo: (ctx) => `
${cabezaPagina({
  etiqueta: "Guías",
  titulo: "Lo que funciona, probado en mi partida",
  entradilla: "Cada guía lleva su aviso: si nombra un sitio o una misión, lo ves tapado hasta que lo pulses.",
})}
<section class="banda">
  <div class="contenedor pila-grande" data-guias>
    <div class="filtros">
      <div class="chips" role="group" aria-label="Tema">
        <button class="chip" type="button" aria-pressed="true" data-guias-categoria="">Todas</button>
        ${categorias.map((c) => `<button class="chip" type="button" aria-pressed="false" data-guias-categoria="${esc(c)}">${esc(c)}</button>`).join("")}
      </div>
      <label class="buscador" for="guias-buscar">${icono.buscar}<span class="solo-lectores">Buscar una guía</span>
        <input id="guias-buscar" type="search" placeholder="Buscar una guía" autocomplete="off" data-guias-buscar>
      </label>
    </div>
    <div class="rejilla-guias" data-guias-lista>${config.guias.map((g) => tarjetaGuia(g, ctx)).join("")}</div>
    <p class="vacio-linea" data-guias-vacio hidden>No hay ninguna guía con eso todavía. Si quieres que la haga, pídemela en TikTok.</p>
    <div class="proximamente">
      <span class="etiqueta">Se abren a partir del 19 de noviembre</span>
      <div class="chips">${config.proximamente.map((t) => `<span class="chip chip-apagado">${esc(t)}</span>`).join("")}</div>
    </div>
  </div>
</section>
<section class="banda banda-suave">
  <div class="contenedor dos-columnas dos-columnas-texto">
    <div class="pila"><p class="antetitulo">Los avisos</p><h2 class="titulo-seccion">Sabes lo que vas a leer antes de leerlo</h2></div>
    <dl class="niveles">
      ${Object.entries(niveles).map(([id, n]) => `<div><dt>${insignia(id)}</dt><dd>${esc(n.descripcion)}</dd></div>`).join("")}
      <div><dt><span class="insignia insignia-nunca">${icono.ojoTachado}Historia</span></dt><dd>Argumento, giros y final. Eso no lo publico.</dd></div>
    </dl>
  </div>
</section>
`,
};

// ---------- Plantilla de guía ----------

function guia(slug, { secciones, enCorto, fuentes = [] }) {
  const g = config.guias.find((x) => x.slug === slug);
  const relacionadas = config.guias.filter((x) => x.slug !== slug);
  return {
    ruta: `/guias/${slug}/`,
    titulo: g.titulo,
    descripcion: g.resumen,
    tipo: "articulo",
    fecha: g.fecha,
    jsonld: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: g.titulo,
      description: g.resumen,
      inLanguage: "es-ES",
      datePublished: g.fecha,
      dateModified: g.fecha,
      author: { "@type": "Person", name: "Soy Xori", url: config.dominio + "/" },
      mainEntityOfPage: `${config.dominio}/guias/${slug}/`,
    },
    cuerpo: (ctx) => `
<article class="articulo">
  <header class="articulo-cabeza">
    <div class="cabeza-pagina-fondo" aria-hidden="true"></div>
    <div class="contenedor contenedor-estrecho pila">
      <nav class="migas" aria-label="Estás en"><a href="${ctx.url("/")}">Inicio</a><span aria-hidden="true">/</span><a href="${ctx.url("/guias/")}">Guías</a><span aria-hidden="true">/</span><span>${esc(g.categoria)}</span></nav>
      <div class="fila-insignias">${insignia(g.nivel)}<span class="etiqueta">${esc(g.categoria)}</span></div>
      <h1 class="titulo-articulo">${esc(g.titulo)}</h1>
      <div class="firma">
        <img src="${ctx.rec("/recursos/img/avatar-xori-96.webp")}" alt="" width="40" height="42">
        <span>Por <b>Xori</b> · Actualizada el ${fechaLarga(g.fecha)} · ${g.minutos} min de lectura</span>
      </div>
    </div>
  </header>
  <div class="contenedor articulo-rejilla">
    <aside class="indice" aria-label="En esta guía">
      <p class="etiqueta">En esta guía</p>
      <ol>${secciones.map((s) => `<li><a href="#${s.id}">${esc(s.titulo)}</a></li>`).join("")}</ol>
    </aside>
    <div class="articulo-texto">
      <div class="en-corto">
        <p class="etiqueta">En corto</p>
        <ul>${enCorto.map((t) => `<li>${t}</li>`).join("")}</ul>
      </div>
      ${secciones
        .map(
          (s, i) => `<section id="${s.id}" aria-labelledby="${s.id}-t">
        <h2 id="${s.id}-t">${esc(s.titulo)}</h2>
        ${s.html(ctx)}
      </section>${i === 1 ? anuncio("articulo") : ""}`
        )
        .join("")}
      ${fuentes.length ? `<p class="fuentes"><span class="etiqueta">Fuentes oficiales</span> ${fuentes.map((f) => `<a href="${f.url}" target="_blank" rel="noopener">${esc(f.texto)}</a>`).join(" · ")}</p>` : ""}
      ${bloqueAfiliado(ctx, { compacto: true })}
      <aside class="autor">
        <img src="${ctx.rec("/recursos/img/avatar-xori.webp")}" alt="" width="72" height="75">
        <div class="pila">
          <b>Xori</b>
          <p>${esc(config.lema)} Pese a las filtraciones, descubro GTA VI jugando y aquí cuento lo que funciona.</p>
          <a class="enlace-flecha" href="${ctx.url("/sin-spoilers/")}">Cómo trato los spoilers${icono.flecha}</a>
        </div>
      </aside>
    </div>
  </div>
  ${
    relacionadas.length
      ? `<section class="banda banda-suave"><div class="contenedor pila-grande"><h2 class="titulo-seccion">Sigue con</h2><div class="rejilla-guias rejilla-guias-estrecha">${relacionadas.map((x) => tarjetaGuia(x, ctx)).join("")}</div></div></section>`
      : ""
  }
</article>
`,
  };
}

export const guiaFecha = guia("gta-6-fecha-plataformas", {
  enCorto: [
    "Sale el <b>19 de noviembre de 2026</b>.",
    "En <b>PS5 y Xbox Series X|S</b>. En PC, Rockstar no lo ha anunciado.",
    "Transcurre en <b>Leonida</b>, con <b>Vice City</b>, y los protagonistas son <b>Lucia y Jason</b>. Es lo que Rockstar ha enseñado; de ahí no paso.",
  ],
  fuentes: [{ texto: "rockstargames.com/VI", url: "https://www.rockstargames.com/VI" }],
  secciones: [
    {
      id: "fecha",
      titulo: "¿Cuándo sale GTA VI?",
      html: () => `<p>El <b>19 de noviembre de 2026</b>. Es la fecha oficial que ha dado Rockstar. En España, a medianoche del 18 al 19 ya es día 19, así que la cuenta atrás de esta web llega a cero a las 00:00 hora peninsular.</p>
      <p>Si lo compras en digital, lo normal es que puedas descargarlo antes para jugar en cuanto se desbloquee. Mira en la tienda de tu consola si tiene precarga.</p>`,
    },
    {
      id: "plataformas",
      titulo: "¿En qué consolas se puede jugar?",
      html: () => `<p>En <b>PlayStation 5</b> y en <b>Xbox Series X|S</b>. No sale en PS4 ni en Xbox One.</p>
      <p>En PC, Rockstar no ha anunciado nada. Con GTA V y con Red Dead Redemption 2 la versión de PC llegó más tarde que la de consola, pero eso no garantiza que vaya a pasar lo mismo. Cuando haya algo oficial, lo pongo aquí.</p>`,
    },
    {
      id: "donde",
      titulo: "¿Dónde transcurre y quién sale?",
      html: () => `<p>En <b>Leonida</b>, un estado inspirado en Florida, con <b>Vice City</b> como ciudad principal. Los protagonistas son <b>Lucia y Jason</b>.</p>
      <p>Todo eso lo ha enseñado Rockstar en sus tráileres oficiales. Lo que no ha enseñado Rockstar no lo cuento, aunque circule por ahí: ni el mapa entero, ni misiones, ni cómo acaba.</p>`,
    },
    {
      id: "precio",
      titulo: "¿Cuánto cuesta?",
      html: () => `<p>Depende de la tienda y de la edición. Los precios cambian, así que no los pongo aquí a mano: mira el de hoy en tu tienda o en los enlaces de abajo.</p>`,
    },
    {
      id: "aqui",
      titulo: "¿Qué va a haber en esta web el día 19?",
      html: (ctx) => `<p>Las <a href="${ctx.url("/guias/")}">guías</a> de dinero, coches y coleccionables, a medida que las pruebe en mi partida. Y los <a href="${ctx.url("/videos/")}">vídeos</a>, cada día en mis redes. Nada antes de haberlo jugado.</p>`,
    },
  ],
});

export const guiaSpoilers = guia("evitar-spoilers-gta-6", {
  enCorto: [
    "Silencia unas cuantas palabras en X y en TikTok.",
    "En YouTube no hay filtro: quita de Inicio los canales que lo destripan.",
    "Silencia los grupos y los foros donde se hable del juego hasta que lo empieces.",
  ],
  secciones: [
    {
      id: "palabras",
      titulo: "Las palabras que conviene silenciar",
      html: () => `<p>Con estas cubres casi todo lo que se va a publicar estos días:</p>
      <div class="chips chips-texto">${["GTA 6", "GTA VI", "GTA6", "Leonida", "Vice City", "Lucia", "Jason", "Rockstar", "filtración", "leak", "final GTA", "mapa GTA"].map((p) => `<span class="chip">${p}</span>`).join("")}</div>
      <p>Si te parecen muchas, quédate con las cuatro primeras y «filtración». Cuando termines la historia, las quitas.</p>`,
    },
    {
      id: "x",
      titulo: "En X (Twitter)",
      html: () => `<ol class="pasos">
        <li>Entra en <b>Configuración y privacidad</b>.</li>
        <li>Ve a <b>Privacidad y seguridad</b> y luego a <b>Silenciar y bloquear</b>.</li>
        <li>Abre <b>Palabras silenciadas</b> y añade cada palabra.</li>
        <li>Elige que se silencie de cualquier cuenta y durante el tiempo que quieras.</li>
      </ol>
      <p class="nota">Los nombres de los menús cambian con cada versión de la app. Si no los encuentras, busca «palabras silenciadas» en los ajustes.</p>`,
    },
    {
      id: "tiktok",
      titulo: "En TikTok",
      html: () => `<ol class="pasos">
        <li>Ve a tu perfil y abre <b>Ajustes y privacidad</b>.</li>
        <li>Entra en <b>Preferencias de contenido</b>.</li>
        <li>Abre <b>Filtrar palabras clave</b> y añade las palabras para el feed <b>Para ti</b> y el de <b>Siguiendo</b>.</li>
      </ol>
      <p>Y cuando te salga un vídeo que huela a filtración, mantén pulsado y marca <b>No me interesa</b>.</p>`,
    },
    {
      id: "youtube",
      titulo: "En YouTube",
      html: () => `<p>YouTube no deja silenciar palabras. Lo que funciona es entrar por <b>Suscripciones</b> en vez de por Inicio estos días y, en cada vídeo sospechoso que te recomiende, usar los tres puntos y <b>No recomendar el canal</b>.</p>
      <p>Las miniaturas son lo más peligroso: muchas enseñan justo lo que no quieres ver. Las mías no.</p>`,
    },
    {
      id: "grupos",
      titulo: "Grupos, foros y amigos",
      html: () => `<p>En WhatsApp y Discord, silencia los grupos y canales de juegos hasta que empieces. En Reddit puedes silenciar comunidades enteras. Y a tus amigos, avísales: es más fácil que alguien se calle si sabe que no quieres saber nada.</p>`,
    },
    {
      id: "aqui",
      titulo: "Y aquí, ¿qué vas a encontrar?",
      html: (ctx) => `<p>Nada filtrado. Cada guía lleva su aviso y, si nombra un sitio o una misión, lo tapo hasta que pulses. Así funciona:</p>
      <div class="escudo" data-escudo>
        <button class="escudo-boton" type="button" aria-expanded="false">${icono.ojoTachado}<span><b>Spoiler avisado:</b> ejemplo de cómo se ve un aviso</span><span class="escudo-accion">Mostrar</span></button>
        <div class="escudo-contenido" hidden><p>Aquí iría lo que destripa algo. En esta guía no hay nada que destripar, así que solo es una muestra.</p></div>
      </div>
      <p>Lo cuento todo en <a href="${ctx.url("/sin-spoilers/")}">mi promesa sin spoilers</a>.</p>`,
    },
  ],
});
