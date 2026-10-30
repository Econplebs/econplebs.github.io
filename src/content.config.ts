import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Los archivos que empiezan por «_» (por ejemplo, _LEEME.md) no se publican.

// Artículos: contenido/<es|ca>/articulos/<slug>.md
const articulos = defineCollection({
  loader: glob({ pattern: "*/articulos/[!_]*.md", base: "./contenido" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    lang: z.enum(["es", "ca"]),
    translationKey: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.enum(["investigacion", "didactica", "opinion", "coyuntura"]),
    tags: z.array(z.string()).default([]),
    excerpt: z.string().default(""),
    featured: z.boolean().default(false),
    image: z.string().optional().default(""),
    sample: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// Páginas fijas: contenido/<es|ca>/paginas/<slug>.md
const paginas = defineCollection({
  loader: glob({ pattern: "*/paginas/[!_]*.md", base: "./contenido" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    lang: z.enum(["es", "ca"]),
    translationKey: z.string(),
    kind: z.string().optional(),
  }),
});

// Publicaciones: contenido/publicaciones/<slug>.md (el texto es el resumen)
const publicaciones = defineCollection({
  loader: glob({ pattern: "[!_]*.md", base: "./contenido/publicaciones" }),
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    year: z.number(),
    type: z.enum(["articulo", "capitulo", "libro", "working-paper", "resena"]),
    journal: z.string().optional(),
    doi: z.string().optional(),
    pdf: z.string().optional(),
    url: z.string().optional(),
  }),
});

// Recursos descargables: contenido/recursos/<slug>.md (archivo en public/descargas/)
const recursos = defineCollection({
  loader: glob({ pattern: "[!_]*.md", base: "./contenido/recursos" }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(""),
    file: z.string(),
    area: z.enum(["investigacion", "docencia", "general"]).default("general"),
    version: z.string().optional(),
    source: z.string().optional(),
    license: z.string().default("CC BY-SA 4.0"),
    lang: z.enum(["es", "ca"]).optional(), // vacío = en los dos idiomas
  }),
});

// Agenda: contenido/agenda/<slug>.md (solo se muestran los eventos futuros)
const agenda = defineCollection({
  loader: glob({ pattern: "[!_]*.md", base: "./contenido/agenda" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    place: z.string().optional(),
    link: z.string().optional(),
    lang: z.enum(["es", "ca"]).optional(),
  }),
});

export const collections = { articulos, paginas, publicaciones, recursos, agenda };
