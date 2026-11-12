// Todas las páginas de la web. Una página nueva se añade aquí.
import { inicio } from "./inicio.mjs";
import { guias, guiaFecha, guiaSpoilers } from "./guias.mjs";
import { videos } from "./videos.mjs";
import { sinSpoilers, enlaces, legal, noEncontrada } from "./otras.mjs";

export const paginas = [inicio, guias, guiaFecha, guiaSpoilers, videos, sinSpoilers, enlaces, legal, noEncontrada];
