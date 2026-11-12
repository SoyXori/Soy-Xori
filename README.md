# soyxori.com

La guía de GTA VI de Soy Xori, sin spoilers. Web estática: HTML, CSS y JavaScript sin dependencias.

## Cómo se edita

Las páginas se escriben en `_web/` y se generan con Node (22 o superior):

```bash
node _web/construir.mjs
```

Eso reescribe los HTML publicados (`index.html`, `guias/`, `videos/`…), `sitemap.xml` y `robots.txt`.
**No edites esos HTML a mano**: se pisan en la siguiente generación.

```bash
node _web/construir.mjs --vista-previa ../vista-previa   # copia con enlaces relativos, para abrir sin servidor
```

## Qué hay en cada sitio

| Ruta | Qué es |
|------|--------|
| `_web/config.mjs` | Redes, fecha de lanzamiento, guías, vídeos, afiliado de Amazon, anuncios, datos legales |
| `_web/plantilla.mjs` | `<head>`, cabecera, pie, fondo animado y piezas compartidas |
| `_web/paginas/` | Una página por fichero; se registran en `indice.mjs` |
| `recursos/css/estilos.css` | Todo el estilo; tokens de color claro (atardecer) y oscuro (noche) arriba del todo |
| `recursos/js/principal.js` | Tema, menú, cuenta atrás, avisos de spoiler, filtros, vídeos |

## Pendiente de rellenar en `_web/config.mjs`

- `whatsappCanal`: enlace al canal de WhatsApp (sin él, el botón no sale).
- `emailContacto` y `legal`: titular, NIF, domicilio y email para el aviso legal (LSSI).
- `amazonTag`: etiqueta de afiliado de Amazon España.
- `videos`: los vídeos de Xori (id de YouTube, título, fecha).
- `videoFondo`: solo grabaciones propias de Xori. Nunca tráileres ni material de Rockstar.


Regla de la casa: solo lo que Xori ha jugado. Nada filtrado.
