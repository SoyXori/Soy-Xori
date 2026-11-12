// Soy Xori · comportamiento común a todas las páginas.
(function () {
  "use strict";

  var metaRaiz = document.querySelector('meta[name="xori:raiz"]');
  var raiz = metaRaiz ? metaRaiz.getAttribute("content") : "/";
  window.xoriRaiz = raiz;

  function leer(clave) {
    try { return localStorage.getItem(clave); } catch (e) { return null; }
  }
  function guardar(clave, valor) {
    try { localStorage.setItem(clave, valor); } catch (e) { /* sin almacenamiento: no pasa nada */ }
  }

  // ---------- Tema claro / oscuro ----------
  var raizDoc = document.documentElement;
  var sistemaOscuro = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function temaActual() {
    var t = raizDoc.getAttribute("data-theme");
    if (t === "light" || t === "dark") return t;
    return sistemaOscuro && sistemaOscuro.matches ? "dark" : "light";
  }
  function etiquetarBotonesTema() {
    var oscuro = temaActual() === "dark";
    document.querySelectorAll("[data-tema-boton]").forEach(function (b) {
      b.setAttribute("aria-label", oscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    });
  }
  var menosMovimiento = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Punto desde el que se abre la luz: el sol si se ve en pantalla, si no el propio botón.
  function origenDeLaLuz(boton) {
    var sol = document.querySelector(".fondo-sol");
    var r = sol && sol.getBoundingClientRect();
    if (r && r.bottom > 0 && r.top < window.innerHeight && r.width) {
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }
    var b = boton.getBoundingClientRect();
    return { x: b.left + b.width / 2, y: b.top + b.height / 2 };
  }

  function ponerTema(nuevo) {
    raizDoc.setAttribute("data-theme", nuevo);
    guardar("xori:tema", nuevo);
    etiquetarBotonesTema();
  }

  document.querySelectorAll("[data-tema-boton]").forEach(function (b) {
    b.addEventListener("click", function () {
      var nuevo = temaActual() === "dark" ? "light" : "dark";
      if (!document.startViewTransition || menosMovimiento) { ponerTema(nuevo); return; }
      if (nuevo === "dark") { document.startViewTransition(function () { ponerTema(nuevo); }); return; }

      // Amanece: la página nueva se descubre en un círculo que crece desde el sol.
      var o = origenDeLaLuz(b);
      var radio = Math.hypot(Math.max(o.x, window.innerWidth - o.x), Math.max(o.y, window.innerHeight - o.y));
      raizDoc.classList.add("amaneciendo");
      var transicion = document.startViewTransition(function () { ponerTema(nuevo); });
      transicion.ready.then(function () {
        raizDoc.animate(
          { clipPath: ["circle(0px at " + o.x + "px " + o.y + "px)", "circle(" + radio + "px at " + o.x + "px " + o.y + "px)"] },
          { duration: 1100, easing: "cubic-bezier(0.3, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" }
        );
      });
      transicion.finished.then(function () { raizDoc.classList.remove("amaneciendo"); });
    });
  });
  if (sistemaOscuro && sistemaOscuro.addEventListener) sistemaOscuro.addEventListener("change", etiquetarBotonesTema);
  etiquetarBotonesTema();

  // ---------- Menú en el móvil ----------
  var cabecera = document.querySelector("[data-cabecera]");
  var botonMenu = document.querySelector("[data-menu-boton]");
  function cerrarMenu() {
    if (!cabecera) return;
    cabecera.classList.remove("menu-abierto");
    botonMenu.setAttribute("aria-expanded", "false");
    botonMenu.setAttribute("aria-label", "Abrir menú");
  }
  if (cabecera && botonMenu) {
    botonMenu.addEventListener("click", function () {
      var abierto = cabecera.classList.toggle("menu-abierto");
      botonMenu.setAttribute("aria-expanded", String(abierto));
      botonMenu.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") cerrarMenu(); });
    cabecera.querySelectorAll(".nav a").forEach(function (a) { a.addEventListener("click", cerrarMenu); });
  }

  // ---------- Cuenta atrás hasta el lanzamiento ----------
  var cuentas = document.querySelectorAll("[data-cuenta]");
  function dosCifras(n) { return String(n).padStart(2, "0"); }
  function actualizarCuentas() {
    var ahora = Date.now();
    cuentas.forEach(function (c) {
      var fin = Date.parse(c.dataset.lanzamiento);
      var inicio = Date.parse(c.dataset.inicio);
      var resto = fin - ahora;
      if (resto <= 0) {
        var dia = Math.floor((ahora - fin) / 86400000) + 1;
        c.classList.add("ya-salio");
        c.querySelector("[data-cuenta-titulo]").textContent = "Día " + dia + " en Leonida";
        c.querySelector("[data-cuenta-pie]").textContent = "Ya está aquí. Mapa y guías, según lo voy descubriendo.";
        return;
      }
      var d = Math.floor(resto / 86400000);
      var h = Math.floor((resto % 86400000) / 3600000);
      var m = Math.floor((resto % 3600000) / 60000);
      var s = Math.floor((resto % 60000) / 1000);
      c.querySelector("[data-d]").textContent = dosCifras(d);
      c.querySelector("[data-h]").textContent = dosCifras(h);
      c.querySelector("[data-m]").textContent = dosCifras(m);
      c.querySelector("[data-s]").textContent = dosCifras(s);
      c.querySelector("[data-cuenta-titulo]").textContent = d === 0 ? "Sale esta noche" : "Faltan " + d + (d === 1 ? " día" : " días");
      var relleno = c.querySelector("[data-cuenta-relleno]");
      if (relleno && inicio < fin) relleno.style.width = Math.max(0, Math.min(100, (resto / (fin - inicio)) * 100)) + "%";
    });
  }
  if (cuentas.length) {
    actualizarCuentas();
    setInterval(actualizarCuentas, 1000);
  }

  // ---------- Avisos de spoiler ----------
  document.querySelectorAll("[data-escudo]").forEach(function (escudo) {
    var boton = escudo.querySelector(".escudo-boton");
    var contenido = escudo.querySelector(".escudo-contenido");
    var accion = escudo.querySelector(".escudo-accion");
    boton.addEventListener("click", function () {
      var abrir = contenido.hidden;
      contenido.hidden = !abrir;
      escudo.classList.toggle("abierto", abrir);
      boton.setAttribute("aria-expanded", String(abrir));
      accion.textContent = abrir ? "Ocultar" : "Mostrar";
    });
  });

  // ---------- Copiar al portapapeles ----------
  window.xoriCopiar = function (texto, boton, origen) {
    function hecho(ok) {
      if (!boton) return;
      var antes = boton.dataset.textoOriginal || boton.innerHTML;
      boton.dataset.textoOriginal = antes;
      boton.textContent = ok ? "Copiado" : "Selecciónalo y cópialo";
      setTimeout(function () { boton.innerHTML = antes; }, 2200);
    }
    function aMano() {
      if (origen && origen.select) { origen.focus(); origen.select(); }
      hecho(false);
    }
    try {
      navigator.clipboard.writeText(texto).then(function () { hecho(true); }, aMano);
    } catch (e) { aMano(); }
  };
  document.querySelectorAll("[data-copiar]").forEach(function (b) {
    b.addEventListener("click", function () { window.xoriCopiar(b.dataset.copiar, b); });
  });

  // ---------- Filtro de guías ----------
  var guias = document.querySelector("[data-guias]");
  if (guias) {
    var categoria = "";
    var busqueda = "";
    var tarjetas = guias.querySelectorAll("[data-guias-lista] .tarjeta-guia");
    var vacio = guias.querySelector("[data-guias-vacio]");
    var aplicar = function () {
      var visibles = 0;
      tarjetas.forEach(function (t) {
        var ok = (!categoria || t.dataset.categoria === categoria) && (!busqueda || t.dataset.texto.indexOf(busqueda) !== -1);
        t.hidden = !ok;
        if (ok) visibles++;
      });
      vacio.hidden = visibles !== 0;
    };
    guias.querySelectorAll("[data-guias-categoria]").forEach(function (chip) {
      chip.addEventListener("click", function () {
        categoria = chip.dataset.guiasCategoria;
        guias.querySelectorAll("[data-guias-categoria]").forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
        aplicar();
      });
    });
    guias.querySelector("[data-guias-buscar]").addEventListener("input", function (e) {
      busqueda = e.target.value.trim().toLowerCase();
      aplicar();
    });
  }

  // ---------- Vídeos: YouTube solo se carga al pulsar ----------
  document.querySelectorAll("[data-youtube]").forEach(function (b) {
    b.addEventListener("click", function () {
      var id = b.dataset.youtube;
      if (!/^[\w-]{6,20}$/.test(id)) return;
      var marco = document.createElement("iframe");
      marco.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
      marco.title = b.getAttribute("aria-label") || "Vídeo";
      marco.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      marco.allowFullscreen = true;
      b.replaceChildren(marco);
    });
  });

  // ---------- Vídeo de fondo: quieto si se pide menos movimiento ----------
  var video = document.querySelector("[data-fondo-video]");
  if (video && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    video.removeAttribute("autoplay");
    video.pause();
  }
})();
