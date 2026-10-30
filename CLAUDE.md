# Econplebs (web estática)

Web bilingüe (castellano / valenciano) de Econplebs, el cuaderno de un
profesor de Economía de secundaria que investiga la didáctica de la economía
desde la teoría de la actividad. Subtítulo: «De lo abstracto a lo concreto».
El encargo completo está en `ENCARGO.md` del paquete de traspaso
(`Web-personal/paso-a-code/` en el vault de Obsidian del autor).

## Reglas

- **Anonimato.** El nombre del autor no aparece nunca (tampoco en este archivo): ni en páginas,
  metadatos, RSS, comentarios del código, nombres de archivo ni historial de
  git. Todo se firma «Econplebs». Commits con `user.name = Econplebs` y un
  correo neutro.
- **Sin terceros.** Nada de Google Fonts, analítica, CDN ni incrustados. Las
  fuentes van en el propio proyecto.
- **Sin enlaces con la web de recursos del alumnado**, salvo el enlace
  «Herramientas» condicionado a `HERRAMIENTAS_URL` (vacía por defecto).
- **Imágenes solo del banco**, con crédito y enlace a la ficha. Fotos en gris;
  obras y carteles en color (ya adaptado a la paleta).
- **Diseño:** papel `#F4F3EF`, blanco, grafito `#1F2224`, rojo `#C8412F` solo
  como acento. Jost (títulos), Literata (lectura), Commissioner (rótulos). Sin
  sombras, sin esquinas redondeadas. Movimiento breve y nulo con
  `prefers-reduced-motion`.
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

## Antes de dar algo por terminado

- Generar la web y abrir las páginas tocadas en escritorio y móvil.
- Comprobar que no hay peticiones a otros dominios.
- Buscar el nombre del autor en el HTML generado: debe dar cero resultados.
