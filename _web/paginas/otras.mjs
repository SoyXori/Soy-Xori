import { config, niveles } from "../config.mjs";
import { icono } from "../iconos.mjs";
import { cabezaPagina, insignia, tarjetasRedes, botonWhatsapp, cuentaAtras, fondoAnimado, esc } from "../plantilla.mjs";

const pendiente = (texto) => `<span class="pendiente">[${texto}]</span>`;

const email = () =>
  config.emailContacto
    ? `<div class="copiable"><span data-copiable-texto>${esc(config.emailContacto)}</span><button class="boton boton-secundario" type="button" data-copiar="${esc(config.emailContacto)}">${icono.copiar}Copiar</button></div>`
    : `<p>${pendiente("Email de contacto pendiente")}</p>`;

export const sinSpoilers = {
  ruta: "/sin-spoilers/",
  titulo: "Sin spoilers, sin rodeos",
  descripcion: "Pese a las filtraciones, Xori quiere descubrir GTA VI jugando. Cómo trata los spoilers esta web, cómo se mantiene y cómo contactar.",
  cuerpo: (ctx) => `
${cabezaPagina({
  etiqueta: "Mi promesa",
  titulo: "Sin spoilers, sin rodeos",
  entradilla: "Pese a las filtraciones, quiero descubrir GTA VI jugando, como tú. Así que esta web funciona con tres reglas sencillas.",
})}
<section class="banda">
  <div class="contenedor contenedor-estrecho pila-grande texto-largo">
    <div class="pila">
      <h2 class="titulo-seccion">1. Aquí no hay nada filtrado</h2>
      <p>Ni mapas, ni misiones, ni finales, ni capturas que no sean mías. Tampoco los comento ni los enlazo. Si algo de GTA VI aparece en esta web, es porque lo ha enseñado Rockstar o porque lo he visto yo jugando.</p>
    </div>
    <div class="pila">
      <h2 class="titulo-seccion">2. Los spoilers se avisan y se tapan</h2>
      <p>Cada guía lleva una etiqueta arriba para que sepas lo que vas a leer antes de leerlo:</p>
      <dl class="niveles">
        ${Object.entries(niveles).map(([id, n]) => `<div><dt>${insignia(id)}</dt><dd>${esc(n.descripcion)}</dd></div>`).join("")}
        <div><dt><span class="insignia insignia-nunca">${icono.ojoTachado}Historia</span></dt><dd>Argumento, giros y final. Eso no lo publico.</dd></div>
      </dl>
      <p>Un aviso se ve así. Pruébalo:</p>
      <div class="escudo" data-escudo>
        <button class="escudo-boton" type="button" aria-expanded="false">${icono.ojoTachado}<span><b>Spoiler avisado:</b> nombra un sitio del juego</span><span class="escudo-accion">Mostrar</span></button>
        <div class="escudo-contenido" hidden><p>Esto es solo una muestra. Lo que haya debajo de un aviso real, solo lo ves si pulsas.</p></div>
      </div>
    </div>
    <div class="pila">
      <h2 class="titulo-seccion">3. Solo cuento lo que he jugado</h2>
      <p>Cada guía la escribo después de probarlo en mi partida. Ni antes, ni de oídas. Si algo aún no está, es que todavía no he llegado.</p>
    </div>
  </div>
</section>

<section class="banda banda-suave" id="transparencia">
  <div class="contenedor contenedor-estrecho pila-grande texto-largo">
    <div class="pila">
      <p class="antetitulo">Transparencia</p>
      <h2 class="titulo-seccion">Cómo se mantiene esta web</h2>
      <p>Hacer guías y vídeos lleva horas, así que esta web gana algo de dinero. Te cuento cómo, sin letra pequeña:</p>
    </div>
    <ul class="lista-ventajas">
      <li>${icono.carrito}<span><b>Enlaces de afiliado.</b> Los botones para comprar el juego van a Amazon. Si compras desde ahí, me llevo una pequeña comisión y a ti te cuesta lo mismo. Siempre van marcados.</span></li>
      <li>${icono.guia}<span><b>Publicidad.</b> Cuando la haya, irá en huecos marcados como «Publicidad», nunca en medio de una explicación.</span></li>
    </ul>
  </div>
</section>

<section class="banda" id="contacto">
  <div class="contenedor dos-columnas dos-columnas-texto">
    <div class="pila">
      <p class="antetitulo">Quién soy</p>
      <h2 class="titulo-seccion">Xori</h2>
      <p class="texto-grande">${esc(config.lema)} Juego a GTA VI y a Fortnite, en español, y lo cuento tal cual: lo que me gusta, lo que no y lo que funciona.</p>
      <div class="pila">
        <h3 class="subtitulo">Para marcas</h3>
        <p>Si quieres colaborar, escríbeme. Solo acepto lo que encaja con lo que hago, y siempre lo marco como publicidad.</p>
        ${email()}
      </div>
    </div>
    <div class="pila">${tarjetasRedes()}${botonWhatsapp() ? `<div class="botones">${botonWhatsapp()}</div>` : ""}</div>
  </div>
</section>
`,
};

export const enlaces = {
  ruta: "/enlaces/",
  titulo: "Enlaces de Soy Xori",
  descripcion: "Todas las redes de Soy Xori: YouTube, TikTok, Twitch e Instagram, y la guía de GTA VI sin spoilers.",
  sinCabecera: true,
  sinPie: true,
  claseMain: "enlaces-pagina",
  cuerpo: (ctx) => `
${fondoAnimado(ctx)}
<div class="enlaces-tarjeta">
  <div class="aro"><img src="${ctx.rec("/recursos/img/avatar-xori.webp")}" alt="Soy Xori" width="160" height="167"></div>
  <h1 class="enlaces-nombre">SOY XORI</h1>
  <p class="enlaces-lema">${esc(config.lema)}</p>
  ${cuentaAtras("cuenta-compacta")}
  <nav class="enlaces-lista" aria-label="Enlaces">
    <a class="enlace-grande enlace-destacado" href="${ctx.url("/guias/")}">${icono.guia}<span><b>Guías de GTA VI</b><small>Sin spoilers, probadas en mi partida</small></span>${icono.flecha}</a>
    <a class="enlace-grande" href="${ctx.url("/videos/")}">${icono.play}<span><b>Vídeos</b><small>Lo que voy descubriendo</small></span>${icono.flecha}</a>
    ${config.redes.map((r) => `<a class="enlace-grande red-${r.id}" href="${r.url}" target="_blank" rel="noopener">${icono[r.id]}<span><b>${r.nombre}</b><small>${esc(r.usuario)}</small></span>${icono.externo}</a>`).join("")}
    ${config.whatsappCanal ? `<a class="enlace-grande" href="${config.whatsappCanal}" target="_blank" rel="noopener">${icono.whatsapp}<span><b>Canal de WhatsApp</b><small>Lo nuevo, cada mañana</small></span>${icono.externo}</a>` : ""}
  </nav>
  <div class="enlaces-pie">
    <button class="boton-icono" type="button" data-tema-boton aria-label="Cambiar a modo oscuro"><span class="si-claro">${icono.luna}</span><span class="si-oscuro">${icono.sol}</span></button>
    <a href="${ctx.url("/")}">soyxori.com</a>
  </div>
</div>
`,
};

export const legal = {
  ruta: "/legal/",
  titulo: "Aviso legal y privacidad",
  descripcion: "Aviso legal y privacidad de soyxori.com.",
  cuerpo: () => {
    const l = config.legal;
    return `
${cabezaPagina({ etiqueta: "Legal", titulo: "Aviso legal y privacidad" })}
<section class="banda">
  <div class="contenedor contenedor-estrecho pila-grande texto-largo">
    <section class="pila" id="aviso-legal">
      <h2 class="titulo-seccion">Aviso legal</h2>
      <p>En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información (LSSI-CE):</p>
      <dl class="datos-legales">
        <div><dt>Titular</dt><dd>${l.titular ? esc(l.titular) : pendiente("Nombre y apellidos")}</dd></div>
        <div><dt>NIF</dt><dd>${l.nif ? esc(l.nif) : pendiente("NIF")}</dd></div>
        <div><dt>Domicilio</dt><dd>${l.domicilio ? esc(l.domicilio) : pendiente("Domicilio")}</dd></div>
        <div><dt>Email</dt><dd>${l.email ? esc(l.email) : pendiente("Email de contacto")}</dd></div>
        <div><dt>Web</dt><dd>soyxori.com</dd></div>
      </dl>
      <p>Soy Xori no tiene relación con Rockstar Games ni con Take-Two Interactive. Grand Theft Auto, GTA VI y los nombres relacionados son marcas de sus propietarios y se citan solo para identificar el juego del que se habla. Esta web no aloja tráileres, capturas ni otro material de Rockstar.</p>
    </section>
    <section class="pila" id="privacidad">
      <h2 class="titulo-seccion">Privacidad</h2>
      <p>Para leer esta web no tienes que darme ningún dato. Si me escribes al email de contacto, uso tu mensaje solo para responderte.</p>
    </section>
    <section class="pila" id="afiliacion">
      <h2 class="titulo-seccion">Afiliación</h2>
      <p>Como afiliado de Amazon, Soy Xori obtiene ingresos por las compras adscritas que cumplen los requisitos aplicables. Los enlaces de afiliado van marcados.</p>
    </section>
  </div>
</section>
`;
  },
};

export const noEncontrada = {
  ruta: "/404",
  titulo: "Te has salido del mapa",
  descripcion: "Esta página no existe.",
  cuerpo: (ctx) => `
<section class="heroe heroe-404">
  ${fondoAnimado(ctx)}
  <div class="contenedor heroe-dentro heroe-dentro-centrado">
    <div class="heroe-texto">
      <p class="antetitulo antetitulo-heroe">Error 404</p>
      <h1 class="heroe-titulo">Te has salido <span class="degradado-texto">del mapa.</span></h1>
      <p class="heroe-entradilla">Esta página no existe. Vuelve al inicio o mira las guías.</p>
      <div class="botones">
        <a class="boton boton-primario" href="${ctx.url("/")}">Volver al inicio</a>
        <a class="boton boton-cristal" href="${ctx.url("/guias/")}">${icono.guia}Ver las guías</a>
      </div>
    </div>
  </div>
</section>
`,
};
