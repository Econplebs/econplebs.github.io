# Econplebs (web estática)

Web bilingüe (castellano / valenciano) de Econplebs, el cuaderno de
investigación económica de un profesor de Economía de secundaria.
Menú por públicos (02-11-2026): **Investigación** (investigación aplicada
`investigacion`, cuaderno de teoría `teoria`, Datos y código, Publicaciones),
**Intervención** (opinión `opinion`, coyuntura `coyuntura`, cuaderno sindical
`sindical`), **Docencia** (didáctica `didactica`, propuestas de aula `aula`,
Materiales, Observatorio) y **Sobre mí**. Cada pestaña enlaza a su página
general; las secciones vacías no salen en el menú. Subtítulo: «Economía política desde abajo».
Lo educativo para el alumnado vive en el Observatorio (otra web), enlazado
desde el menú (decisión del autor, 01-11-2026).
El encargo completo está en `ENCARGO.md` del paquete de traspaso
(`Web-personal/paso-a-code/` en el vault de Obsidian del autor).

## Reglas

- **Anonimato en la web.** El nombre del autor no aparece nunca en la web
  publicada (páginas, metadatos, RSS, índice del buscador), ni en el contenido,
  el código, los nombres de archivo o este archivo. Todo se firma «Econplebs».
  Commits con `user.name = Econplebs` y `noreply@econplebs.org`.
  Decisión del autor (31-10-2026): la cuenta de GitHub que aloja el
  repositorio sí puede llevar su nombre; el anonimato estricto se limita a la
  web.
- **Sin terceros.** Nada de Google Fonts, analítica, CDN ni incrustados. Las
  fuentes van en el propio proyecto.
- **Web de herramientas del alumnado (Observatorio).** Econplebs la enlaza con
  «Herramientas ↗» mediante `HERRAMIENTAS_URL` (decisión del autor, 31-10-2026,
  que deja sin efecto la regla de no enlazarlas). Vaciar esa variable quita el enlace.
- **Imágenes solo del banco**, con crédito y enlace a la ficha. Fotos en gris;
  obras y carteles en color (ya adaptado a la paleta).
- **Diseño (estética industrial del tema 4.0, W-19):** hormigón `#E6E7E3`,
  esmalte `#EFEFEC`, grafito `#1F2224` / `#16181A`, rojo `#C8412F` solo como
  acento (texto en rojo `#B03826` y gris `#5F6361` por contraste AA).
  Archivo Narrow en mayúsculas (titulares), Source Serif 4 (lectura),
  IBM Plex Mono (rótulos), IBM Plex Sans (interfaz). Sin sombras ni esquinas
  redondeadas. Movimiento breve y nulo con `prefers-reduced-motion`.
- **Accesibilidad** WCAG 2.1 AA.
- **El autor no programa.** Explica en castellano sencillo; cualquier cambio de
  contenido debe poder hacerse editando Markdown. Los textos de la interfaz
  van siempre en los dos idiomas.
- **Contenido de muestra:** los artículos con `sample: true` son de prueba y
  no se publican en producción sin que el autor lo diga.

## Publicar

El autor escribe en Obsidian (`Web-personal/publicar/`) y dice «publica X».
Claude copia el archivo al repositorio (nunca enlaza el vault), comprueba el
frontmatter y la ausencia de datos personales, genera, revisa y despliega.
Procedimiento paso a paso: `docs/PUBLICAR.md` (scripts `npm run publicar` y
`npm run comprobar`).

## Antes de dar algo por terminado

- Generar la web y abrir las páginas tocadas en escritorio y móvil.
- Comprobar que no hay peticiones a otros dominios.
- Buscar el nombre del autor en el HTML generado: debe dar cero resultados.

## Estructura del proyecto

- `contenido/`: todo lo que se edita a mano (Markdown). Artículos y páginas en
  `es/` y `ca/`; `publicaciones/`, `recursos/` y `agenda/` llevan un `_LEEME.md`
  con la plantilla. Publicaciones y Agenda no se muestran mientras estén vacías.
- `src/configuracion.mjs`: único archivo de ajustes (correo público,
  `HERRAMIENTAS_URL`, mostrar muestras).
- `src/lib/sitio.ts`: textos de la interfaz en los dos idiomas y direcciones.
- `src/pages/[...ruta].astro` genera todas las páginas; las plantillas están en
  `src/vistas/` y las piezas en `src/components/`.
- Generar: `npm run build` (Astro + índice del buscador Pagefind en `dist/`).
  Node está en `~/.local/node/bin` (añadirlo al PATH).
