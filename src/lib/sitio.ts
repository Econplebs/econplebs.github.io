import { getCollection, type CollectionEntry } from "astro:content";
import imagenes from "../datos/imagenes.json";
import taxonomia from "../datos/taxonomia.json";
import { MOSTRAR_MUESTRAS } from "../configuracion.mjs";

export type Lang = "es" | "ca";
export type Articulo = CollectionEntry<"articulos">;
export type Imagen = (typeof imagenes.images)[number];
type Categoria = keyof typeof taxonomia.categories;

// Textos de la interfaz en los dos idiomas (sacados de textos-interfaz.json).
const textos = {
  subtitulo: { es: "De lo abstracto a lo concreto", ca: "De l’abstracte al concret" },
  investigacion: { es: "Investigación", ca: "Recerca" },
  lineas: { es: "Líneas de investigación", ca: "Línies de recerca" },
  avances: { es: "Avances", ca: "Avanços" },
  publicaciones: { es: "Publicaciones", ca: "Publicacions" },
  enElAula: { es: "En el aula", ca: "A l’aula" },
  enfoque: { es: "Enfoque", ca: "Enfocament" },
  propuestas: { es: "Propuestas y experiencias", ca: "Propostes i experiències" },
  materiales: { es: "Materiales", ca: "Materials" },
  herramientas: { es: "Herramientas ↗", ca: "Eines ↗" },
  opinion: { es: "Opinión", ca: "Opinió" },
  todo: { es: "Todo", ca: "Tot" },
  coyuntura: { es: "Análisis de coyuntura", ca: "Anàlisi de conjuntura" },
  sobreMi: { es: "Sobre mí", ca: "Sobre mi" },
  queEs: { es: "Qué es Econplebs", ca: "Què és Econplebs" },
  contacto: { es: "Contacto", ca: "Contacte" },
  privacidad: { es: "Privacidad", ca: "Privacitat" },
  buscar: { es: "Buscar", ca: "Cercar" },
  menu: { es: "Menú", ca: "Menú" },
  menuPrincipal: { es: "Menú principal", ca: "Menú principal" },
  idioma: { es: "Idioma", ca: "Idioma" },
  saltar: { es: "Saltar al contenido", ca: "Botar al contingut" },
  portada: { es: "Portada de Econplebs", ca: "Portada d’Econplebs" },
  licencia: { es: "Licencia CC BY-SA 4.0", ca: "Llicència CC BY-SA 4.0" },
  creditosFotos: { es: "Fotos", ca: "Fotos" },
  copiasReducidas: { es: "(copias reducidas)", ca: "(còpies reduïdes)" },
  // Portada
  destacados: { es: "Artículos destacados", ca: "Articles destacats" },
  leerArticulo: { es: "Leer el artículo", ca: "Llegir l’article" },
  anterior: { es: "Artículo anterior", ca: "Article anterior" },
  siguiente: { es: "Artículo siguiente", ca: "Article següent" },
  pausar: { es: "Pausar", ca: "Pausar" },
  seguir: { es: "Seguir", ca: "Continuar" },
  elegir: { es: "Elegir artículo", ca: "Elegir article" },
  investigacionDidactica: { es: "Investigación en didáctica", ca: "Recerca en didàctica" },
  queInvestigo: { es: "Qué estoy investigando", ca: "Què estic investigant" },
  queInvestigoTexto: {
    es: "Cómo se forman los conceptos de economía y ciencias sociales en el aula, desde la teoría de la actividad de Vigotski, Iliénkov y Davídov.",
    ca: "Com es formen els conceptes d’economia i ciències socials a l’aula, des de la teoria de l’activitat de Vigotski, Iliénkov i Davídov.",
  },
  lineasCorto: { es: "Líneas", ca: "Línies" },
  abstracto: { es: "abstracto", ca: "abstracte" },
  concreto: { es: "concreto", ca: "concret" },
  ultimasLecturas: { es: "Últimas lecturas", ca: "Últimes lectures" },
  nuevasIdeas: { es: "Nuevas ideas, nuevos datos.", ca: "Noves idees, noves dades." },
  leer: { es: "Leer", ca: "Llegir" },
  archivoCompleto: { es: "Ver el archivo completo ↗", ca: "Veure l’arxiu complet ↗" },
  // Barra lateral
  quienEscribe: { es: "Quién escribe", ca: "Qui escriu" },
  quienEscribeTexto: {
    es: "Un profesor de Economía de secundaria que investiga cómo enseñar la economía y las ciencias sociales desde la teoría de la actividad: Vigotski, Iliénkov, Davídov.",
    ca: "Un professor d’Economia de secundària que investiga com ensenyar l’economia i les ciències socials des de la teoria de l’activitat: Vigotski, Iliénkov, Davídov.",
  },
  masSobreMi: { es: "Más sobre mí", ca: "Més sobre mi" },
  porTemas: { es: "Por temas", ca: "Per temes" },
  seguirNovedades: { es: "Seguir las novedades", ca: "Seguir les novetats" },
  rssTexto: {
    es: "Suscríbete con cualquier lector de RSS y te llegará cada texto nuevo. Sin correo y sin registro.",
    ca: "Subscriu-te amb qualsevol lector de RSS i t’arribarà cada text nou. Sense correu i sense registre.",
  },
  rssBoton: { es: "Suscribirse por RSS", ca: "Subscriure’s per RSS" },
  agenda: { es: "Agenda", ca: "Agenda" },
  // Artículo
  articulos: { es: "Artículos", ca: "Articles" },
  actualizado: { es: "Actualizado", ca: "Actualitzat" },
  porEconplebs: { es: "Econplebs", ca: "Econplebs" },
  finArticulo: { es: "Fin del artículo", ca: "Final de l’article" },
  etiquetas: { es: "Etiquetas", ca: "Etiquetes" },
  licenciaTexto: {
    es: "Texto publicado con licencia CC BY-SA 4.0. Puedes citarlo y compartirlo.",
    ca: "Text publicat amb llicència CC BY-SA 4.0. Pots citar-lo i compartir-lo.",
  },
  seguirLeyendo: { es: "Seguir leyendo", ca: "Continuar llegint" },
  anteriorCorto: { es: "Anterior", ca: "Anterior" },
  siguienteCorto: { es: "Siguiente", ca: "Següent" },
  enEsteArticulo: { es: "En este artículo", ca: "En aquest article" },
  notas: { es: "Notas", ca: "Notes" },
  volverReferencia: { es: "Volver a la llamada", ca: "Tornar a la crida" },
  progreso: { es: "Progreso de lectura", ca: "Progrés de lectura" },
  textoMuestra: { es: "Texto de muestra", ca: "Text de mostra" },
} as const;

export function t(clave: keyof typeof textos, lang: Lang): string {
  return textos[clave][lang];
}

// Direcciones (ver ENCARGO §4).
const rutas = {
  portada: { es: "/", ca: "/ca/" },
  investigacion: { es: "/investigacion/", ca: "/ca/recerca/" },
  avances: { es: "/investigacion/avances/", ca: "/ca/recerca/avancos/" },
  publicaciones: { es: "/publicaciones/", ca: "/ca/publicacions/" },
  enElAula: { es: "/en-el-aula/", ca: "/ca/a-laula/" },
  propuestas: { es: "/en-el-aula/propuestas/", ca: "/ca/a-laula/propostes/" },
  recursos: { es: "/recursos/", ca: "/ca/recursos/" },
  opinion: { es: "/opinion/", ca: "/ca/opinio/" },
  coyuntura: { es: "/opinion/coyuntura/", ca: "/ca/opinio/conjuntura/" },
  sobreMi: { es: "/sobre-mi/", ca: "/ca/sobre-mi/" },
  contacto: { es: "/contacto/", ca: "/ca/contacte/" },
  privacidad: { es: "/privacidad/", ca: "/ca/privacitat/" },
  articulos: { es: "/articulos/", ca: "/ca/articles/" },
  buscar: { es: "/buscar/", ca: "/ca/cercar/" },
  rss: { es: "/rss.xml", ca: "/ca/rss.xml" },
} as const;

export function ruta(clave: keyof typeof rutas, lang: Lang): string {
  return rutas[clave][lang];
}

export function rutaArticulo(a: Articulo): string {
  return `${ruta("articulos", a.data.lang)}${a.data.slug}/`;
}

const etiquetaSlug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function rutaEtiqueta(etiqueta: string, lang: Lang): string {
  return `${lang === "ca" ? "/ca" : ""}/etiqueta/${etiquetaSlug(etiqueta)}/`;
}

// Página de cada categoría (las de investigación y didáctica son las listas de avances y propuestas).
export function rutaCategoria(cat: Categoria, lang: Lang): string {
  const mapa = { investigacion: "avances", didactica: "propuestas", opinion: "opinion", coyuntura: "coyuntura" } as const;
  return ruta(mapa[cat], lang);
}

export function nombreCategoria(cat: Categoria, lang: Lang): string {
  return taxonomia.categories[cat][lang].name;
}

// Artículos visibles en un idioma, del más reciente al más antiguo.
export async function articulosDe(lang: Lang): Promise<Articulo[]> {
  const todos = await getCollection(
    "articulos",
    (a) => a.data.lang === lang && !a.data.draft && (MOSTRAR_MUESTRAS || !a.data.sample),
  );
  return todos.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// Fechas: «20 de septiembre de 2026» / «20 de setembre de 2026».
export function fecha(d: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "ca" ? "ca-ES" : "es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

export function fechaISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

// «Actualizado» solo si la diferencia es de más de 7 días.
export function mostrarActualizado(a: Articulo): boolean {
  const { date, updated } = a.data;
  return !!updated && updated.valueOf() - date.valueOf() > 7 * 86400000;
}

export function minutosLectura(texto: string, lang: Lang): string {
  const palabras = texto.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const n = Math.max(1, Math.round(palabras / 200));
  if (lang === "ca") return `${n} ${n === 1 ? "minut" : "minuts"} de lectura`;
  return `${n} ${n === 1 ? "minuto" : "minutos"} de lectura`;
}

// Imagen del artículo: la elegida a mano o, si no hay, una del grupo de su categoría,
// siempre la misma para el mismo artículo (se calcula a partir del slug).
export function imagenDe(a: Articulo): Imagen {
  const porClave = (k: string) => imagenes.images.find((i) => i.key === k);
  if (a.data.image) {
    const elegida = porClave(a.data.image);
    if (elegida) return elegida;
  }
  const grupo = imagenes.pools[a.data.category];
  let h = 0;
  for (const c of a.data.translationKey) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return porClave(grupo[h % grupo.length])!;
}

export function rutaImagen(img: Imagen): string {
  return `/imagenes/${img.file}`;
}

// Recuentos para «Por temas»: Opinión incluye Coyuntura (es su hija).
export function recuentos(lista: Articulo[]) {
  const n = (c: string) => lista.filter((a) => a.data.category === c).length;
  return {
    opinion: n("opinion") + n("coyuntura"),
    coyuntura: n("coyuntura"),
    didactica: n("didactica"),
    investigacion: n("investigacion"),
  };
}

export function etiquetasDe(lista: Articulo[]): string[] {
  return [...new Set(lista.flatMap((a) => a.data.tags))].sort();
}

// Ajustes del HTML de los artículos escritos en Markdown:
// - «> [!cita] texto» se convierte en una cita destacada.
// - Las notas al pie llevan el título en el idioma del artículo.
export function prepararCuerpo(html: string, lang: Lang): string {
  return html
    .replace(
      /<blockquote>\s*<p>\[!cita\]\s*/g,
      '<blockquote class="cita-destacada"><p>',
    )
    .replace(/(<h2[^>]*id="footnote-label"[^>]*>)[^<]*(<\/h2>)/, `$1${t("notas", lang)}$2`)
    .replace(/aria-label="Back to reference ([\d-]+)"/g, (_, n) => `aria-label="${t("volverReferencia", lang)} ${n}"`);
}
