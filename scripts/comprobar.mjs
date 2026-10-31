// Revisa la web generada (dist/) antes de publicarla:
// - enlaces internos rotos (también en las imágenes),
// - recursos cargados desde otros dominios (imágenes, guiones, estilos, incrustados),
// - palabras de la lista prohibida (~/.config/econplebs/prohibido.txt),
// - artículos de muestra si se va a publicar de verdad (con --produccion).
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dist = path.join(raiz, "dist");
const produccion = process.argv.includes("--produccion");
// En el servidor de GitHub no está la lista (está solo en el Mac del autor, a propósito)
const sinLista = process.argv.includes("--sin-lista");
if (!fs.existsSync(dist)) { console.error("Primero hay que generar la web (npm run build)."); process.exit(1); }

const archivos = [];
(function recorrer(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) recorrer(p); else archivos.push(p);
  }
})(dist);

const existe = (url) => {
  const limpio = decodeURIComponent(url.split("#")[0].split("?")[0]);
  if (!limpio) return true;
  const f = path.join(dist, limpio);
  return fs.existsSync(f) && (fs.statSync(f).isFile() || fs.existsSync(path.join(f, "index.html")));
};

const problemas = [];
const lista = path.join(os.homedir(), ".config/econplebs/prohibido.txt");
const prohibidas = fs.existsSync(lista)
  ? fs.readFileSync(lista, "utf8").split("\n").map((s) => s.trim()).filter((s) => s && !s.startsWith("#"))
  : null;
if (!prohibidas && !sinLista) problemas.push(`No encuentro ${lista}: no he podido buscar datos personales.`);

let paginas = 0;
for (const f of archivos) {
  const rel = "/" + path.relative(dist, f);
  if (/\.(html|xml|js|css|json|txt)$/.test(f) && prohibidas) {
    const t = fs.readFileSync(f, "utf8").toLowerCase();
    for (const p of prohibidas) if (t.includes(p.toLowerCase())) problemas.push(`«${p}» aparece en ${rel}`);
  }
  if (!f.endsWith(".html")) continue;
  paginas++;
  const html = fs.readFileSync(f, "utf8");
  for (const [, u] of html.matchAll(/<(?:img|script|iframe|source|video|audio|embed)\b[^>]*\ssrc="(https?:\/\/[^"]+)"/g))
    problemas.push(`Recurso de otro dominio en ${rel}: ${u}`);
  for (const [, tag] of html.matchAll(/(<link\b[^>]*>)/g))
    if (/href="https?:/.test(tag) && /rel="(stylesheet|preload|icon|modulepreload)"/.test(tag)) problemas.push(`Recurso de otro dominio en ${rel}: ${tag}`);
  for (const [, u] of html.matchAll(/\s(?:href|src)="(\/[^"]*)"/g))
    if (!existe(u)) problemas.push(`Enlace roto en ${rel}: ${u}`);
  for (const [, s] of html.matchAll(/\ssrcset="([^"]+)"/g))
    for (const parte of s.split(",")) { const u = parte.trim().split(" ")[0]; if (!existe(u)) problemas.push(`Imagen que falta en ${rel}: ${u}`); }
  if (produccion && html.includes('data-muestra')) problemas.push(`Hay texto de muestra en ${rel}`);
}

if (problemas.length) {
  console.error(`Revisadas ${paginas} páginas. Problemas:`);
  for (const p of [...new Set(problemas)]) console.error(" -", p);
  process.exit(1);
}
console.log(`Revisadas ${paginas} páginas: sin enlaces rotos, sin recursos de otros dominios y sin palabras prohibidas.`);
