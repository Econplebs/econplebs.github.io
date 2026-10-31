# Procedimiento «publica X»

El autor escribe en Obsidian, en `Web-personal/publicar/` (vault), y pide
«publica X». Esa carpeta nunca se enlaza con este repositorio: se **copia**.
Su `LEEME.md` es la versión para el autor de este mismo procedimiento.

## «Prepara el valenciano de X»

1. Lee `publicar/X.md`.
2. Escribe `publicar/X-va.md` con el mismo frontmatter, más:
   - `lang: ca`
   - `translationKey:` el slug de la versión castellana (el que saldría del
     título, o el campo `slug` si lo tiene),
   - título, extracto y etiquetas traducidos (etiquetas existentes:
     Trabajo → Treball),
   - la misma `image`, `category` y fechas.
3. Valenciano normativo de la AVL (formas como «servixen», «estiga»,
   «este/aquest» según registro; el de la web es formal-cercano). No toques
   los componentes `<PasoAPaso>`, etc., salvo sus textos.
4. Avisa al autor para que lo revise. No publiques sin su visto bueno.

## «Publica X»

1. Comprueba que existen `publicar/X.md` y `publicar/X-va.md` (si falta el
   valenciano, ofrece prepararlo; publicar en un solo idioma solo si el
   autor lo pide).
2. Copia con el script (lee, comprueba y escribe en `contenido/`):
   ```
   npm run publicar -- "<vault>/Web-personal/publicar/X.md"
   npm run publicar -- "<vault>/Web-personal/publicar/X-va.md"
   ```
   Para corregir uno ya publicado: añade `--actualizar` (y pon `updated:`).
   Si el script da errores, explícaselos al autor en castellano sencillo.
3. Genera y revisa:
   ```
   npm run build
   npm run comprobar
   ```
4. Abre el artículo y la portada en escritorio y móvil, y enséñaselos.
5. Commit (identidad Econplebs, ya configurada en el repositorio).
6. Mueve `X.md` y `X-va.md` a `publicar/publicado/` (sobrescribe si ya
   estaban: es una actualización).
7. Despliegue: cuando exista (hito 5), súbelo. La primera vez, pregunta.

## Datos personales

`scripts/publicar.mjs` y `scripts/comprobar.mjs` leen la lista de palabras
prohibidas de `~/.config/econplebs/prohibido.txt` (fuera del repo a
propósito: la lista contiene el nombre del autor). Si no existe, avisan.
Nunca copies esa lista dentro del repositorio.

## Muestras

Los artículos de muestra (`sample: true`) se ven mientras
`MOSTRAR_MUESTRAS` sea `true` en `src/configuracion.mjs`. Antes de publicar
de verdad: ponlo en `false` y ejecuta `npm run comprobar -- --produccion`.
