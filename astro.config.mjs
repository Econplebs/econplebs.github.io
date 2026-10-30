import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { SITIO } from "./src/configuracion.mjs";

export default defineConfig({
  site: SITIO,
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "auto" },
  devToolbar: { enabled: false },
  integrations: [mdx()],
});
