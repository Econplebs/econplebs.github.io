# Banco de imágenes

Aquí están los originales. Para añadir una imagen:

1. Copia el archivo .jpg en esta carpeta (sin datos personales en el nombre).
2. Añade su ficha en `src/datos/imagenes.json` (clave, archivo, textos alternativos
   en los dos idiomas, crédito, enlace a la ficha, ancho, alto, color y grupo).
   - `"color": false` → foto: se pasa a gris automáticamente.
   - `"color": true` → obra o cartel: se deja en color.
   - `"adaptar": true` (solo obras nuevas) → se adapta a la paleta de la web.
3. Al generar la web se crean las copias ligeras en `public/imagenes/`.
