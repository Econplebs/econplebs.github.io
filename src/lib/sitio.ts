import { getCollection, type CollectionEntry } from "astro:content";
import imagenes from "../datos/imagenes.json";
import taxonomia from "../datos/taxonomia.json";
import { MOSTRAR_MUESTRAS, CORREO_PUBLICO } from "../configuracion.mjs";
import { anchosDe, nombreCopia } from "./anchos.mjs";

export type Lang = "es" | "ca";
export type Articulo = CollectionEntry<"articulos">;
export type Imagen = (typeof imagenes.images)[number];
export type Categoria = keyof typeof taxonomia.categories;

export const otro = (lang: Lang): Lang => (lang === "es" ? "ca" : "es");

// Textos de la interfaz en los dos idiomas (la mayoría salen de textos-interfaz.json).
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
  modoOscuro: { es: "Modo oscuro", ca: "Mode fosc" },
  imprimir: { es: "Imprimir", ca: "Imprimir" },
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
  sinArticulos: {
    es: "Todavía no hay artículos publicados. Pronto habrá lecturas aquí.",
    ca: "Encara no hi ha articles publicats. Prompte hi haurà lectures ací.",
  },
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
  // Listas
  nadaPublicado: { es: "No hay nada publicado aquí todavía.", ca: "Encara no hi ha res publicat ací." },
  etiqueta: { es: "Etiqueta", ca: "Etiqueta" },
  ideasEnDebate: { es: "Ideas en debate", ca: "Idees en debat" },
  opinionTitulo: { es: "Opinión con argumentos.", ca: "Opinió amb arguments." },
  opinionTexto: {
    es: "Una posición explícita, abierta al contraste con los datos y con otras lecturas. Aquí se reúnen las columnas, los ensayos y los análisis de coyuntura.",
    ca: "Una posició explícita, oberta al contrast amb les dades i amb altres lectures. Ací es reunixen les columnes, els assajos i les anàlisis de conjuntura.",
  },
  // Investigación
  investigacionLead: {
    es: "Cómo se forman los conceptos económicos y sociales en el aula, y cómo enseñar para que el alumnado los construya en lugar de memorizarlos.",
    ca: "Com es formen els conceptes econòmics i socials a l’aula, i com ensenyar perquè l’alumnat els construïsca en lloc de memoritzar-los.",
  },
  sinAvances: { es: "Todavía no hay avances publicados.", ca: "Encara no hi ha avanços publicats." },
  todosAvances: { es: "Todos los avances →", ca: "Tots els avanços →" },
  publicacionesPreparando: { es: "La lista de publicaciones se está preparando.", ca: "La llista de publicacions s’està preparant." },
  todasPublicaciones: { es: "Todas las publicaciones →", ca: "Totes les publicacions →" },
  elMarco: { es: "El marco", ca: "El marc" },
  marcoTexto: {
    es: "La teoría de la actividad y la enseñanza desarrolladora: Vigotski, Iliénkov y Davídov. Primero, la relación básica, la célula germinal; después, los casos que se explican con ella.",
    ca: "La teoria de l’activitat i l’ensenyament desenvolupador: Vigotski, Iliénkov i Davídov. Primer, la relació bàsica, la cèl·lula germinal; després, els casos que s’expliquen amb ella.",
  },
  avancesFlecha: { es: "Avances →", ca: "Avanços →" },
  publicacionesFlecha: { es: "Publicaciones →", ca: "Publicacions →" },
  datosMateriales: { es: "Datos y materiales de investigación →", ca: "Dades i materials de recerca →" },
  // En el aula
  aprenderPreguntar: { es: "Aprender a preguntar", ca: "Aprendre a preguntar" },
  aulaLead: {
    es: "Ideas, materiales y lecturas para entender la economía en clase.",
    ca: "Idees, materials i lectures per a entendre l’economia a classe.",
  },
  sinPropuestas: { es: "Todavía no hay propuestas publicadas.", ca: "Encara no hi ha propostes publicades." },
  enEstaSeccion: { es: "En esta sección", ca: "En aquesta secció" },
  delAulaAlDebate: { es: "Del aula al debate", ca: "De l’aula al debat" },
  aulaCajaTexto: {
    es: "Cómo trabajo en clase, propuestas que funcionan y materiales para otros docentes.",
    ca: "Com treballe a classe, propostes que funcionen i materials per a altres docents.",
  },
  todasPropuestas: { es: "Todas las propuestas y experiencias →", ca: "Totes les propostes i experiències →" },
  materialesDescargar: { es: "Materiales para descargar →", ca: "Materials per a descarregar →" },
  herramientasAlumnado: { es: "Herramientas para el alumnado ↗", ca: "Eines per a l’alumnat ↗" },
  // Recursos
  bibliotecaAbierta: { es: "Biblioteca abierta", ca: "Biblioteca oberta" },
  recursosLead: {
    es: "Documentos, materiales de clase y hojas de cálculo para seguir una pregunta hasta sus fuentes.",
    ca: "Documents, materials de classe i fulls de càlcul per a seguir una pregunta fins a les seues fonts.",
  },
  sinRecursos: { es: "Todavía no hay archivos publicados en esta sección.", ca: "Encara no hi ha arxius publicats en aquesta secció." },
  buscarRecursos: { es: "Buscar en los recursos", ca: "Cercar als recursos" },
  tituloPalabra: { es: "Título o palabra clave", ca: "Títol o paraula clau" },
  areaRecurso: { es: "Área del recurso", ca: "Àrea del recurs" },
  todasAreas: { es: "Todas las áreas", ca: "Totes les àrees" },
  general: { es: "General", ca: "General" },
  filtrarRecursos: { es: "Filtrar recursos", ca: "Filtrar recursos" },
  todos: { es: "Todos", ca: "Tots" },
  documentos: { es: "Documentos", ca: "Documents" },
  hojasDatos: { es: "Hojas de cálculo y datos", ca: "Fulls de càlcul i dades" },
  documento: { es: "Documento", ca: "Document" },
  datos: { es: "Datos", ca: "Dades" },
  descargar: { es: "Descargar", ca: "Descarregar" },
  version: { es: "Versión", ca: "Versió" },
  fuente: { es: "Consultar la fuente ↗", ca: "Consultar la font ↗" },
  noCoinciden: { es: "No hay recursos que coincidan con la búsqueda.", ca: "No hi ha recursos que coincidisquen amb la cerca." },
  // Contacto
  escribeme: { es: "Escríbeme a", ca: "Escriu-me a" },
  correoPendiente: {
    es: "El correo de contacto se publicará antes de abrir la web.",
    ca: "El correu de contacte es publicarà abans d’obrir la web.",
  },
  // Búsqueda y 404
  sinResultados: { es: "No hay resultados. Prueba con otra palabra.", ca: "No hi ha resultats. Prova amb una altra paraula." },
  resultadosPara: { es: "Resultados para", ca: "Resultats per a" },
  buscando: { es: "Buscando…", ca: "Cercant…" },
  buscadorSinIndice: {
    es: "El buscador funciona en la versión generada de la web.",
    ca: "El cercador funciona en la versió generada de la web.",
  },
  noExiste: { es: "Esta página no existe", ca: "Aquesta pàgina no existeix" },
  noExisteTexto: {
    es: "Puede que el enlace esté mal escrito o que el texto se haya movido. Prueba a buscarlo.",
    ca: "Pot ser que l’enllaç estiga mal escrit o que el text s’haja mogut. Prova a buscar-lo.",
  },
  volverPortada: { es: "Volver a la portada", ca: "Tornar a la portada" },
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
export type ClaveRuta = keyof typeof rutas;

export function ruta(clave: ClaveRuta, lang: Lang): string {
  return rutas[clave][lang];
}

export function rutaArticulo(a: Articulo): string {
  return `${ruta("articulos", a.data.lang)}${a.data.slug}/`;
}

export const etiquetaSlug = (s: string) =>
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

// La traducción de un artículo (mismo translationKey en el otro idioma), si existe.
export async function traduccionDe(a: Articulo): Promise<Articulo | undefined> {
  const lista = await articulosDe(otro(a.data.lang));
  return lista.find((x) => x.data.translationKey === a.data.translationKey);
}

// Hay publicaciones o eventos futuros? (si no, sus apartados no se muestran)
// (si la carpeta está vacía ni se consulta, para que Astro no avise de colecciones vacías)
const archivosPublicaciones = Object.keys(import.meta.glob("/contenido/publicaciones/[!_]*.md"));
const archivosAgenda = Object.keys(import.meta.glob("/contenido/agenda/[!_]*.md"));
export async function hayPublicaciones(): Promise<boolean> {
  if (archivosPublicaciones.length === 0) return false;
  return (await getCollection("publicaciones")).length > 0;
}
export async function eventosFuturos(lang: Lang) {
  if (archivosAgenda.length === 0) return [];
  const hoy = new Date(new Date().toISOString().slice(0, 10));
  const lista = await getCollection("agenda", (e) => (!e.data.lang || e.data.lang === lang) && e.data.date >= hoy);
  return lista.sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());
}

// Fechas: «20 de septiembre de 2026» / «20 de setembre de 2026».
export function fecha(d: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "ca" ? "ca-ES" : "es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d).replace(" del ", " de ");
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
// siempre la misma para el mismo artículo (se calcula a partir de su translationKey,
// así las dos versiones llevan la misma foto). La cuña roja nunca se elige sola.
export function imagenDe(a: Articulo): Imagen {
  const porClave = (k: string) => imagenes.images.find((i) => i.key === k);
  if (a.data.image) {
    const elegida = porClave(a.data.image);
    if (elegida) return elegida;
  }
  const grupo = imagenes.pools[a.data.category].filter((k) => k !== "cuna-roja");
  let h = 0;
  for (const c of a.data.translationKey) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return porClave(grupo[h % grupo.length])!;
}

// Copias ligeras de la imagen (las genera scripts/imagenes.mjs): src por defecto y srcset.
export function copiasDe(img: Imagen) {
  const anchos = anchosDe(img.width);
  const media = anchos.find((w) => w >= 960) ?? anchos[anchos.length - 1];
  return {
    src: `/imagenes/${nombreCopia(img.file, media)}`,
    srcset: anchos.map((w) => `/imagenes/${nombreCopia(img.file, w)} ${w}w`).join(", "),
  };
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

// Ajustes del HTML que sale del Markdown:
// - «> [!cita] texto» se convierte en una cita destacada.
// - Las notas al pie llevan los textos en el idioma de la página.
// - Los enlaces internos escritos con la dirección en castellano se corrigen en valenciano.
// - {{correo_contacto}} se sustituye por el correo público de la configuración.
export function prepararCuerpo(html: string, lang: Lang): string {
  let res = html
    .replace(/<blockquote>\s*<p>\[!cita\]\s*/g, '<blockquote class="cita-destacada"><p>')
    .replace(/(<h2[^>]*id="footnote-label"[^>]*>)[^<]*(<\/h2>)/, `$1${t("notas", lang)}$2`)
    .replace(/aria-label="Back to reference ([\d-]+)"/g, (_, n) => `aria-label="${t("volverReferencia", lang)} ${n}"`)
    .replace(/\{\{correo(?:\\)?_contacto\}\}/g, CORREO_PUBLICO
      ? `<a href="mailto:${CORREO_PUBLICO}">${CORREO_PUBLICO}</a>`
      : `<em>${t("correoPendiente", lang)}</em>`);
  if (lang === "ca") {
    for (const clave of Object.keys(rutas) as ClaveRuta[]) {
      if (clave === "portada") continue;
      res = res.replaceAll(`href="${rutas[clave].es}"`, `href="${rutas[clave].ca}"`);
    }
  }
  return res;
}
