// Copia un artículo escrito en Obsidian al proyecto, después de comprobarlo.
// Uso:  node scripts/publicar.mjs <archivo.md> [--actualizar] [--muestra]
//   --actualizar  permite sustituir un artículo que ya existe (mismo idioma y slug)
// No toca el archivo original: solo lo lee.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import YAML from "yaml";

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const args = process.argv.slice(2);
const origen = args.find((a) => !a.startsWith("--"));
const actualizar = args.includes("--actualizar");
if (!origen || !fs.existsSync(origen)) {
  console.error("Uso: node scripts/publicar.mjs <archivo.md> [--actualizar]");
  process.exit(1);
}

const errores = [];
const avisos = [];
const texto = fs.readFileSync(origen, "utf8").replace(/\r\n/g, "\n");
const m = texto.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
if (!m) { console.error("El archivo no empieza con el bloque de datos entre «---»."); process.exit(1); }
let datos;
try { datos = YAML.parse(m[1]) ?? {}; } catch (e) { console.error("El bloque de datos tiene un error de formato:", e.message); process.exit(1); }
let cuerpo = m[2].replace(/^\n+/, "");

// --- Valores por defecto ---
const slugDe = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
  .replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const hoy = new Date().toISOString().slice(0, 10);
const fechaTexto = (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v ? String(v) : "");

if (!datos.title) errores.push("Falta el título (title).");
const lang = datos.lang || "es";
if (!["es", "ca"].includes(lang)) errores.push("lang tiene que ser es o ca.");
const slug = datos.slug ? slugDe(datos.slug) : slugDe(datos.title ?? "");
const final = {
  title: String(datos.title ?? "").trim(),
  slug,
  lang,
  translationKey: datos.translationKey ? slugDe(datos.translationKey) : slug,
  date: fechaTexto(datos.date) || hoy,
  ...(datos.updated ? { updated: fechaTexto(datos.updated) } : {}),
  category: datos.category,
  tags: Array.isArray(datos.tags) ? datos.tags.map(String) : datos.tags ? [String(datos.tags)] : [],
  excerpt: String(datos.excerpt ?? "").trim(),
  featured: datos.featured === true,
  image: datos.image ? String(datos.image) : "",
  sample: args.includes("--muestra") || datos.sample === true,
  draft: datos.draft === true,
};

// --- Comprobaciones ---
if (!/^\d{4}-\d{2}-\d{2}$/.test(final.date)) errores.push(`La fecha «${final.date}» tiene que ser AAAA-MM-DD.`);
if (!["investigacion", "didactica", "aula", "opinion", "coyuntura"].includes(final.category))
  errores.push("category tiene que ser investigacion, didactica, aula, opinion o coyuntura.");
if (!final.excerpt) avisos.push("No hay extracto (excerpt): en portada y listas saldrá vacío.");
if (final.excerpt.length > 220) avisos.push("El extracto es largo (más de 220 caracteres).");
const banco = JSON.parse(fs.readFileSync(path.join(raiz, "src/datos/imagenes.json"), "utf8"));
if (final.image && !banco.images.some((i) => i.key === final.image))
  errores.push(`La imagen «${final.image}» no está en el banco (mira publicar/_imagenes-disponibles.md).`);
if (final.image === "cuna-roja") avisos.push("Has elegido la cuña roja de El Lissitzky: úsala con moderación.");

// Nada de recursos de otros dominios ni cosas de Obsidian que la web no entiende
if (/!\[[^\]]*\]\(\s*https?:/i.test(cuerpo) || /<(img|iframe|script|video|audio|embed|object)\b/i.test(cuerpo))
  errores.push("Hay imágenes, vídeos o incrustados de otras webs. Solo se pueden usar imágenes del banco.");
if (/!\[\[/.test(cuerpo)) errores.push("Hay imágenes pegadas de Obsidian (![[...]]). Usa una imagen del banco en «image».");
const wikis = [...cuerpo.matchAll(/\[\[([^\]]+)\]\]/g)].map((x) => x[0]);
if (wikis.length) errores.push(`Hay enlaces internos de Obsidian (${wikis.slice(0, 3).join(", ")}). Escríbelos como [texto](/articulos/slug/).`);
if (/%%[\s\S]*?%%/.test(cuerpo)) {
  cuerpo = cuerpo.replace(/%%[\s\S]*?%%/g, "").replace(/\n{3,}/g, "\n\n");
  avisos.push("He quitado los comentarios de Obsidian (%% … %%).");
}

// Palabras prohibidas (tu nombre, la web del alumnado…): lista guardada fuera del proyecto
const listaProhibida = path.join(os.homedir(), ".config/econplebs/prohibido.txt");
if (fs.existsSync(listaProhibida)) {
  const todo = `${m[1]}\n${cuerpo}`.toLowerCase();
  for (const palabra of fs.readFileSync(listaProhibida, "utf8").split("\n").map((s) => s.trim()).filter((s) => s && !s.startsWith("#")))
    if (todo.includes(palabra.toLowerCase())) errores.push(`Aparece una palabra de la lista prohibida («${palabra}»).`);
} else avisos.push(`No encuentro ${listaProhibida}: no he podido buscar datos personales.`);

// ¿Lleva componentes interactivos? Entonces se guarda como .mdx
const componentes = /<(PasoAPaso|Paso|SalarioReal|Cita)\b/.test(cuerpo);
const destino = path.join(raiz, "contenido", lang, "articulos", `${slug}${componentes ? ".mdx" : ".md"}`);
const otroFormato = destino.replace(/\.mdx?$/, componentes ? ".md" : ".mdx");
if ((fs.existsSync(destino) || fs.existsSync(otroFormato)) && !actualizar)
  errores.push(`Ya hay un artículo con el slug «${slug}» en ${lang}. Si es una actualización, usa --actualizar.`);

for (const a of avisos) console.log("Aviso:", a);
if (errores.length) {
  for (const e of errores) console.error("Error:", e);
  console.error("No he copiado nada.");
  process.exit(1);
}

if (fs.existsSync(otroFormato)) fs.rmSync(otroFormato);
const yaml = YAML.stringify(final, { lineWidth: 0 }).trim();
fs.writeFileSync(destino, `---\n${yaml}\n---\n${cuerpo.trimEnd()}\n`);
console.log(`Copiado: ${path.relative(raiz, destino)}  (${final.lang}, ${final.category}, ${final.date})`);
console.log(`Dirección: ${lang === "ca" ? "/ca/articles/" : "/articulos/"}${slug}/`);
