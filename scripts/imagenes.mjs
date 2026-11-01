// Tratamiento automático de las imágenes del banco (se ejecuta al generar la web).
// - Fotos (color: false): pasan a gris con un poco más de contraste.
// - Obras y carteles (color: true): se dejan como están; si llevan "adaptar": true,
//   se adaptan a la paleta de la web (papel, grafito y rojo; el resto, grises).
// - De cada imagen se hacen copias ligeras (WebP) en varios anchos.
// Original: imagenes/<archivo>.jpg  →  copias: public/imagenes/<archivo>-<ancho>.webp
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { anchosDe, nombreCopia } from "../src/lib/anchos.mjs";

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const banco = JSON.parse(fs.readFileSync(path.join(raiz, "src/datos/imagenes.json"), "utf8"));
const salida = path.join(raiz, "public/imagenes");
fs.mkdirSync(salida, { recursive: true });

const PAPEL = [244, 243, 239], GRAFITO = [31, 34, 36], ROJO = [200, 65, 47];

// Adapta una obra a la paleta: los rojos y naranjas vivos pasan al rojo de la web;
// todo lo demás, a una escala de grises entre el grafito y el papel.
async function adaptarPaleta(entrada) {
  const { data, info } = await sharp(entrada).median(3).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 3) {
    const r = data[i] / 255, g = data[i + 1] / 255, b = data[i + 2] / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const sat = max === 0 ? 0 : (max - min) / max;
    let tono = 0;
    if (max !== min) {
      if (max === r) tono = (60 * ((g - b) / (max - min)) + 360) % 360;
      else if (max === g) tono = 60 * ((b - r) / (max - min)) + 120;
      else tono = 60 * ((r - g) / (max - min)) + 240;
    }
    const luz = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    let c;
    if (sat > 0.38 && max > 0.3 && (tono >= 335 || tono <= 35)) c = ROJO;
    else c = GRAFITO.map((v, k) => Math.round(v + (PAPEL[k] - v) * Math.min(1, Math.max(0, (luz - 0.08) / 0.8))));
    data[i] = c[0]; data[i + 1] = c[1]; data[i + 2] = c[2];
  }
  return sharp(data, { raw: info });
}

let hechas = 0, saltadas = 0;
for (const img of banco.images) {
  const origen = path.join(raiz, "imagenes", img.file);
  if (!fs.existsSync(origen)) { console.warn(`Falta la imagen ${img.file}`); continue; }
  // Se rehace si cambia la foto o la ficha (imagenes.json), por ejemplo al ajustar un recorte
  const fechaOrigen = Math.max(fs.statSync(origen).mtimeMs, fs.statSync(path.join(raiz, "src/datos/imagenes.json")).mtimeMs);
  for (const w of anchosDe(img.width)) {
    const destino = path.join(salida, nombreCopia(img.file, w));
    if (fs.existsSync(destino) && fs.statSync(destino).mtimeMs > fechaOrigen) { saltadas++; continue; }
    let tubo = img.adaptar ? await adaptarPaleta(origen) : sharp(origen);
    // Quitar el marco del negativo escaneado (medidas en imagenes.json → recorte)
    if (img.recorte) {
      const r = img.recorte;
      tubo = sharp(await tubo.extract({ left: r.izq, top: r.arr, width: img.width, height: img.height }).toBuffer());
    }
    if (!img.color) tubo = tubo.grayscale().linear(1.08, -10);
    await tubo.resize({ width: w, withoutEnlargement: true }).webp({ quality: 74 }).toFile(destino);
    hechas++;
  }
}
console.log(`Imágenes: ${hechas} copias nuevas, ${saltadas} ya estaban al día.`);
