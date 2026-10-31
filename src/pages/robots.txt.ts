import { SITIO } from "../configuracion.mjs";
export const GET = () => new Response(`User-agent: *\nAllow: /\n\nSitemap: ${SITIO}/sitemap-index.xml\n`, { headers: { "Content-Type": "text/plain" } });
