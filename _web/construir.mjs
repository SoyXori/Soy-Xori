// Genera la web estática a partir de _web/.
//   node _web/construir.mjs                         → escribe las páginas en la raíz del repo (lo que se publica)
//   node _web/construir.mjs --vista-previa <carpeta> → copia autocontenida con enlaces relativos
import { mkdir, writeFile, cp, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "./config.mjs";
import { documento } from "./plantilla.mjs";
import { paginas } from "./paginas/indice.mjs";

const aqui = path.dirname(fileURLToPath(import.meta.url));
const raizRepo = path.resolve(aqui, "..");
const argumentos = process.argv.slice(2);
const i = argumentos.indexOf("--vista-previa");
const vistaPrevia = i >= 0 ? path.resolve(argumentos[i + 1] ?? "vista-previa") : null;
const destino = vistaPrevia ?? raizRepo;

const archivoDe = (ruta) => (ruta === "/404" ? "404.html" : path.join(ruta.slice(1), "index.html"));

function contexto(ruta) {
  if (!vistaPrevia) return { ruta, fragmento: false, raiz: "/", url: (r) => r, rec: (r) => r };
  const profundidad = path.dirname(archivoDe(ruta)).split(path.sep).filter((s) => s && s !== ".").length;
  const subir = "../".repeat(profundidad);
  const url = (r) => {
    const [base, ancla] = r.split("#");
    const destinoRel = base === "/" ? "index.html" : base.slice(1) + (base.endsWith("/") ? "index.html" : "");
    return subir + destinoRel + (ancla ? `#${ancla}` : "");
  };
  return { ruta, fragmento: ruta === "/", raiz: subir, url, rec: (r) => subir + r.slice(1) };
}

if (vistaPrevia) await rm(vistaPrevia, { recursive: true, force: true });

for (const p of paginas) {
  const archivo = path.join(destino, archivoDe(p.ruta));
  await mkdir(path.dirname(archivo), { recursive: true });
  await writeFile(archivo, documento(p, contexto(p.ruta)));
}

if (vistaPrevia) {
  for (const carpeta of ["recursos"]) {
    await cp(path.join(raizRepo, carpeta), path.join(vistaPrevia, carpeta), { recursive: true });
  }
  await cp(path.join(raizRepo, "og-image.jpg"), path.join(vistaPrevia, "og-image.jpg"));
} else {
  const hoy = new Date().toISOString().slice(0, 10);
  const urls = paginas
    .filter((p) => p.ruta !== "/404")
    .map((p) => `  <url><loc>${config.dominio}${p.ruta}</loc><lastmod>${p.fecha ?? hoy}</lastmod></url>`)
    .join("\n");
  await writeFile(
    path.join(destino, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );
  await writeFile(path.join(destino, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /_web/\n\nSitemap: ${config.dominio}/sitemap.xml\n`);
}

console.log(`[Web] ${paginas.length} páginas en ${path.relative(process.cwd(), destino) || "."}`);
