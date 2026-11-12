// Iconos en línea. Los de trazo heredan el color del texto; los de marca van rellenos.

const trazo = (cuerpo, tam = 20) =>
  `<svg class="icono" width="${tam}" height="${tam}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${cuerpo}</svg>`;

const marca = (d, extra = "") =>
  `<svg class="icono" width="22" height="22" viewBox="0 0 48 48" fill="currentColor" aria-hidden="true"><path ${extra} d="${d}"></path></svg>`;

export const icono = {
  sol: trazo('<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>'),
  luna: trazo('<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"></path>'),
  menu: trazo('<path d="M4 7h16M4 12h16M4 17h16"></path>', 22),
  cerrar: trazo('<path d="M6 6l12 12M18 6L6 18"></path>', 22),
  mapa: trazo('<path d="M9 4 3 6.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5L9 4z"></path><path d="M9 4v13.5M15 6.5V20"></path>'),
  guia: trazo('<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15z"></path><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"></path>'),
  play: trazo('<path d="M7 4.5v15l12-7.5-12-7.5z" fill="currentColor"></path>'),
  ojo: trazo('<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"></path><circle cx="12" cy="12" r="3"></circle>'),
  ojoTachado: trazo('<path d="M3 3l18 18"></path><path d="M10.6 5.1A10.8 10.8 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-3.2 4.1M6.6 6.6A17.4 17.4 0 0 0 2 12s3.6 7 10 7a10.4 10.4 0 0 0 5.4-1.6"></path><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"></path>'),
  escudo: trazo('<path d="M12 2.5 4 5.5v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10v-6l-8-3z"></path><path d="M8.5 12l2.5 2.5 4.5-5"></path>'),
  flecha: trazo('<path d="M5 12h14M13 6l6 6-6 6"></path>', 18),
  externo: trazo('<path d="M14 4h6v6M20 4l-9 9"></path><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"></path>', 16),
  copiar: trazo('<rect x="8" y="8" width="12" height="12" rx="2.5"></rect><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"></path>', 18),
  whatsapp: trazo('<path d="M20.5 11.6a8.6 8.6 0 0 1-12.7 7.5L3.5 20.5l1.4-4.2a8.6 8.6 0 1 1 15.6-4.7z"></path><path d="M9 8.8c0 3.2 2.6 6 6 6.3l1.3-1.4-1.9-1-1 .9a4.4 4.4 0 0 1-2.4-2.4l.9-1-1-1.9L9 8.8z"></path>'),
  carrito: trazo('<circle cx="9" cy="20" r="1.5"></circle><circle cx="18" cy="20" r="1.5"></circle><path d="M2.5 3h3l2.4 12.2a1.5 1.5 0 0 0 1.5 1.3h8.4a1.5 1.5 0 0 0 1.5-1.2L21 8H7"></path>'),
  check: trazo('<path d="M5 12.5l4.5 4.5L19 7.5"></path>', 18),
  mas: trazo('<path d="M12 5v14M5 12h14"></path>', 20),
  menos: trazo('<path d="M5 12h14"></path>', 20),
  centrar: trazo('<circle cx="12" cy="12" r="3"></circle><path d="M12 2v4M12 18v4M2 12h4M18 12h4"></path>', 20),
  buscar: trazo('<circle cx="11" cy="11" r="7"></circle><path d="M20 20l-4-4"></path>', 18),
  reloj: trazo('<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>', 16),
  niebla: trazo('<path d="M4 9h12M7 13h13M3 17h11M9 5h8"></path>'),
  mando: trazo('<rect x="2.5" y="7" width="19" height="11" rx="5.5"></rect><path d="M7 11v3M5.5 12.5h3M15.5 11.5h.01M18 13.5h.01"></path>'),
  correo: trazo('<rect x="3" y="5" width="18" height="14" rx="2.5"></rect><path d="m4 7 8 6 8-6"></path>'),
  youtube: marca("M46 14.5s-.5-3.3-1.9-4.7c-1.8-1.9-3.9-1.9-4.8-2C32.9 7.3 24 7.3 24 7.3h0s-8.9 0-15.3.5c-.9.1-3 .1-4.8 2C2.5 11.2 2 14.5 2 14.5S1.5 18.4 1.5 22.3v3.5c0 3.9.5 7.8.5 7.8s.5 3.3 1.9 4.7c1.8 1.9 4.2 1.8 5.3 2 3.8.4 16.3.5 16.3.5s8.9 0 15.3-.5c.9-.1 3-.1 4.8-2 1.4-1.4 1.9-4.7 1.9-4.7s.5-3.9.5-7.8v-3.5c0-3.9-.5-7.8-.5-7.8zM19.5 29.5v-13l12 6.5-12 6.5z"),
  tiktok: marca("M28 4h7c.6 4.7 3.3 7.6 8 8.3v7c-3-.1-5.7-1-8-2.7v13.6c0 7.7-6.2 13.8-14 13.8S1 37.9 1 30.2 7.2 16.4 15 16.4c1 0 2 .1 3 .3v7.2c-.9-.3-1.9-.5-3-.5-3.7 0-6.7 3-6.7 6.7S11.3 37 15 37s6.7-3 6.7-6.7V4H28z"),
  instagram: marca("M14 4h20c5.5 0 10 4.5 10 10v20c0 5.5-4.5 10-10 10H14C8.5 44 4 39.5 4 34V14C4 8.5 8.5 4 14 4zm0 4c-3.3 0-6 2.7-6 6v20c0 3.3 2.7 6 6 6h20c3.3 0 6-2.7 6-6V14c0-3.3-2.7-6-6-6H14zm10 6a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm11-6.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z", 'fill-rule="evenodd"'),
  twitch: marca("M6 4 2 14v24h12v6l6-6h9l11-11V4H6zm26 22-7 7h-8l-6 6v-6H6V8h26v18zM26 14h4v10h-4V14zm-9 0h4v10h-4V14z"),
};
