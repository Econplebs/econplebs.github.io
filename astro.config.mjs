import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { SITIO } from "./src/configuracion.mjs";

export default defineConfig({
  site: SITIO,
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "auto" },
  devToolbar: { enabled: false },
  integrations: [mdx(), sitemap({ filter: (pagina) => !/\/(404|buscar|cercar)\//.test(pagina) })],
});
