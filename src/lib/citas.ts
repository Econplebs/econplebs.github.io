// Cómo citar un artículo: texto (estilo APA), BibTeX y RIS (Zotero, Mendeley).
// La autoría es siempre «Econplebs». Las direcciones usan SITIO (configuracion.mjs).
import { SITIO } from "../configuracion.mjs";
import { rutaArticulo, fechaISO, type Articulo } from "./sitio";

const MESES = {
  es: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
  ca: ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"],
};
const MESES_BIB = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

export const urlArticulo = (a: Articulo) => new URL(rutaArticulo(a), SITIO).href;

// Nombre de los archivos de cita: /citas/<idioma>-<slug>.bib y .ris
export const rutaCita = (a: Articulo, ext: "bib" | "ris") => `/citas/${a.data.lang}-${a.data.slug}.${ext}`;

// Cita en texto: «Econplebs. (2026, 20 de septiembre). Título. Econplebs. https://…»
export function citaTexto(a: Articulo): string {
  const d = a.data.date;
  const dia = `${d.getUTCDate()} de ${MESES[a.data.lang][d.getUTCMonth()]}`;
  // Si el título ya acaba en signo de puntuación, no se añade punto
  const titulo = /[.?!…]$/.test(a.data.title) ? a.data.title : `${a.data.title}.`;
  return `Econplebs. (${d.getUTCFullYear()}, ${dia}). ${titulo} Econplebs. ${urlArticulo(a)}`;
}

// Clave BibTeX: econplebs + año + primera palabra larga del slug
export function claveBib(a: Articulo): string {
  const palabra = a.data.slug.split("-").find((p) => p.length > 3) ?? a.data.slug.split("-")[0];
  return `econplebs${a.data.date.getUTCFullYear()}${palabra}`;
}

const escBib = (s: string) => s.replace(/([&%#_$])/g, "\\$1");

export function citaBib(a: Articulo): string {
  const d = a.data.date;
  const url = urlArticulo(a);
  return `@misc{${claveBib(a)},
  author       = {{Econplebs}},
  title        = {{${escBib(a.data.title)}}},
  year         = {${d.getUTCFullYear()}},
  month        = ${MESES_BIB[d.getUTCMonth()]},
  date         = {${fechaISO(d)}},
  howpublished = {\\url{${url}}},
  url          = {${url}},
  note         = {Econplebs},
  language     = {${a.data.lang === "es" ? "spanish" : "catalan"}},
  abstract     = {${escBib(a.data.excerpt)}}
}
`;
}

export function citaRis(a: Articulo): string {
  const d = a.data.date;
  const lineas = [
    "TY  - BLOG",
    "AU  - Econplebs",
    `TI  - ${a.data.title}`,
    `PY  - ${d.getUTCFullYear()}`,
    `DA  - ${fechaISO(d).replaceAll("-", "/")}`,
    "T2  - Econplebs",
    `UR  - ${urlArticulo(a)}`,
    `LA  - ${a.data.lang}`,
    ...(a.data.excerpt ? [`AB  - ${a.data.excerpt}`] : []),
    ...a.data.tags.map((t) => `KW  - ${t}`),
    "ER  - ",
  ];
  return lineas.join("\r\n") + "\r\n";
}
