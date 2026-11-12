import { config } from "../config.mjs";
import { icono } from "../iconos.mjs";
import { fondoAnimado, cuentaAtras, tarjetaGuia, bloqueAfiliado, bandaRedes, botonWhatsapp, anuncio, esc } from "../plantilla.mjs";
import { tarjetaVideo } from "./videos.mjs";

export const inicio = {
  ruta: "/",
  titulo: "Soy Xori · GTA VI sin spoilers",
  descripcion: "Guías y vídeos de GTA VI en español, sin filtraciones y sin spoilers. Xori lo descubre jugando y te cuenta lo que funciona, sin rodeos.",
  claseMain: "portada",
  jsonld: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Soy Xori",
    url: config.dominio + "/",
    inLanguage: "es-ES",
    author: { "@type": "Person", name: "Soy Xori", sameAs: config.redes.map((r) => r.url) },
  },
  cuerpo: (ctx) => `
<section class="heroe">
  ${fondoAnimado(ctx)}
  <div class="contenedor heroe-dentro">
    <div class="heroe-texto">
      <p class="antetitulo antetitulo-heroe">Soy Xori · GTA VI en español</p>
      <h1 class="heroe-titulo">Leonida se descubre <span class="degradado-texto">jugando.</span></h1>
      <p class="heroe-entradilla">Pese a las filtraciones, quiero llegar a GTA VI sin saber nada, como tú. Aquí te cuento lo que voy descubriendo: guías que funcionan y vídeos cada día. Sin spoilers y sin rodeos.</p>
      <div class="botones">
        <a class="boton boton-primario" href="${ctx.url("/guias/")}">${icono.guia}Ver las guías</a>
        <a class="boton boton-cristal" href="${ctx.url("/sin-spoilers/")}">${icono.escudo}Mi promesa sin spoilers</a>
      </div>
    </div>
    <div class="heroe-tarjeta">
      <div class="heroe-persona">
        <span class="aro aro-pequeno"><img src="${ctx.rec("/recursos/img/avatar-xori-96.webp")}" alt="" width="64" height="67"></span>
        <span><b>Xori</b><small>Llego sin saber nada, como tú</small></span>
      </div>
      ${cuentaAtras("cuenta-heroe")}
    </div>
  </div>
</section>

${bandaRedes()}

<section class="banda banda-promesa" aria-labelledby="t-promesa">
  <div class="contenedor">
    <h2 id="t-promesa" class="titulo-seccion">Pese a las filtraciones, quiero descubrir GTA VI por mí mismo.</h2>
    <div class="promesas">
      <article class="promesa">
        <span class="promesa-icono">${icono.ojoTachado}</span>
        <h3>Nada filtrado</h3>
        <p>No publico mapas, misiones ni finales filtrados. Tampoco los comento ni los enlazo.</p>
      </article>
      <article class="promesa">
        <span class="promesa-icono">${icono.escudo}</span>
        <h3>Spoilers siempre avisados</h3>
        <p>Si una guía nombra un sitio o una misión, va tapado hasta que tú decidas verlo.</p>
      </article>
      <article class="promesa">
        <span class="promesa-icono">${icono.mando}</span>
        <h3>Solo lo que he jugado</h3>
        <p>Cada guía la escribo después de probarlo en mi partida. Ni antes, ni de oídas.</p>
      </article>
    </div>
  </div>
</section>

<section class="banda banda-suave" aria-labelledby="t-guias">
  <div class="contenedor pila-grande">
    <div class="fila-titulo">
      <div class="pila"><p class="antetitulo">Guías</p><h2 id="t-guias" class="titulo-seccion">Para antes del 19</h2></div>
      <a class="enlace-flecha" href="${ctx.url("/guias/")}">Todas las guías${icono.flecha}</a>
    </div>
    <div class="rejilla-guias">${config.guias.map((g) => tarjetaGuia(g, ctx)).join("")}</div>
    <div class="proximamente">
      <span class="etiqueta">A partir del 19</span>
      <div class="chips">${config.proximamente.map((t) => `<span class="chip chip-apagado">${esc(t)}</span>`).join("")}</div>
    </div>
  </div>
</section>

${anuncio("horizontal")}

${
  config.videos.length
    ? `<section class="banda" aria-labelledby="t-videos"><div class="contenedor pila-grande">
        <div class="fila-titulo"><div class="pila"><p class="antetitulo">Vídeos</p><h2 id="t-videos" class="titulo-seccion">Lo último que he descubierto</h2></div><a class="enlace-flecha" href="${ctx.url("/videos/")}">Todos los vídeos${icono.flecha}</a></div>
        <div class="rejilla-videos">${config.videos.slice(0, 3).map((v) => tarjetaVideo(v)).join("")}</div>
      </div></section>`
    : ""
}

<section class="banda" aria-labelledby="t-xori">
  <div class="contenedor presentacion">
    <div class="aro aro-grande"><img src="${ctx.rec("/recursos/img/avatar-xori.webp")}" alt="Soy Xori" width="240" height="251"></div>
    <div class="pila-grande">
      <div class="pila">
        <p class="antetitulo">Quién soy</p>
        <h2 id="t-xori" class="titulo-seccion">Soy Xori. Juego, opino y te cuento lo que sé.</h2>
        <p class="texto-grande">GTA VI y Fortnite, en español y sin rodeos: lo que me gusta, lo que no y lo que funciona. Desde el 19 subo cada día lo que voy descubriendo, sin spoilers en títulos ni miniaturas.</p>
      </div>
      ${botonWhatsapp() ? `<div class="botones">${botonWhatsapp()}</div>` : ""}
    </div>
  </div>
</section>

<section class="banda banda-suave">
  <div class="contenedor">${bloqueAfiliado(ctx)}</div>
</section>
`,
};
