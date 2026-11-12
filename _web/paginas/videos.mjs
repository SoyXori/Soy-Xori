import { config } from "../config.mjs";
import { icono } from "../iconos.mjs";
import { cabezaPagina, tarjetasRedes, insignia, esc, fechaLarga } from "../plantilla.mjs";

// El vídeo de YouTube solo se carga cuando se pulsa.
export const tarjetaVideo = (v) => `<article class="video">
  <button class="video-fachada" type="button" data-youtube="${esc(v.youtubeId)}" aria-label="Reproducir: ${esc(v.titulo)}">
    <span class="video-play">${icono.play}</span>
  </button>
  <div class="video-texto">
    ${insignia(v.nivel ?? "sin-spoilers")}
    <h3>${esc(v.titulo)}</h3>
    <p>${fechaLarga(v.fecha)} · <a href="https://www.youtube.com/watch?v=${esc(v.youtubeId)}" target="_blank" rel="noopener">Ver en YouTube</a></p>
  </div>
</article>`;

export const videos = {
  ruta: "/videos/",
  titulo: "Vídeos de GTA VI sin spoilers",
  descripcion: "Los vídeos de Xori jugando a GTA VI, sin spoilers en títulos ni miniaturas, y dónde ver los tráileres oficiales de Rockstar.",
  cuerpo: (ctx) => `
${cabezaPagina({
  etiqueta: "Vídeos",
  titulo: "Lo descubro jugando, y lo grabo",
  entradilla: "Desde el 19 de noviembre subo vídeos cada día. Títulos y miniaturas sin spoilers: lo que pasa en el vídeo, lo ves dentro.",
})}
<section class="banda">
  <div class="contenedor pila-grande">
    <h2 class="titulo-seccion">Mis vídeos</h2>
    ${
      config.videos.length
        ? `<div class="rejilla-videos">${config.videos.map(tarjetaVideo).join("")}</div>`
        : `<div class="vacio">
            <span class="vacio-icono">${icono.play}</span>
            <div class="pila"><h3>El primero sale el día del lanzamiento</h3><p>Suscríbete donde más te guste y te llega en cuanto lo suba.</p></div>
          </div>`
    }
    ${tarjetasRedes()}
  </div>
</section>
<section class="banda banda-suave">
  <div class="contenedor dos-columnas dos-columnas-texto">
    <div class="pila">
      <p class="antetitulo">Tráileres oficiales</p>
      <h2 class="titulo-seccion">Donde los publica Rockstar</h2>
      <p class="texto-grande">Aquí no subo copias de los tráileres. Se ven en la web y en el canal de Rockstar Games, que es donde tienen que estar.</p>
    </div>
    <div class="pila">
      <a class="enlace-tarjeta" href="https://www.rockstargames.com/VI" target="_blank" rel="noopener"><b>Web oficial de GTA VI</b><small>rockstargames.com/VI</small>${icono.externo}</a>
      <a class="enlace-tarjeta" href="https://www.youtube.com/@RockstarGames" target="_blank" rel="noopener"><b>Canal de Rockstar Games</b><small>YouTube</small>${icono.externo}</a>
    </div>
  </div>
</section>
`,
};
