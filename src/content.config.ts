import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Artículos: contenido/<es|ca>/articulos/<slug>.md
const articulos = defineCollection({
  loader: glob({ pattern: "*/articulos/*.md", base: "./contenido" }),
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
  loader: glob({ pattern: "*/paginas/*.md", base: "./contenido" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    lang: z.enum(["es", "ca"]),
    translationKey: z.string(),
    kind: z.string().optional(),
  }),
});

export const collections = { articulos, paginas };
