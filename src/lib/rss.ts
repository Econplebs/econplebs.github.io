// Canal RSS de cada idioma: título, enlace, fecha, extracto y texto completo de cada artículo.
import { SITIO } from "../configuracion.mjs";
import { t, ruta, articulosDe, rutaArticulo, prepararCuerpo, type Lang } from "./sitio";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function canalRss(lang: Lang): Promise<Response> {
  const lista = await articulosDe(lang);
  const abs = (u: string) => new URL(u, SITIO).href;
  const items = lista
    .map((a) => {
      const html = prepararCuerpo(a.rendered?.html ?? "", lang).replace(/(href|src)="\//g, `$1="${SITIO}/`);
      return `    <item>
      <title>${esc(a.data.title)}</title>
      <link>${abs(rutaArticulo(a))}</link>
      <guid isPermaLink="true">${abs(rutaArticulo(a))}</guid>
      <pubDate>${a.data.date.toUTCString()}</pubDate>
      <dc:creator>Econplebs</dc:creator>
      <description>${esc(a.data.excerpt)}</description>
${html ? `      <content:encoded><![CDATA[${html.replaceAll("]]>", "]]]]><![CDATA[>")}]]></content:encoded>` : ""}
    </item>`;
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Econplebs</title>
    <link>${abs(ruta("portada", lang))}</link>
    <atom:link href="${abs(ruta("rss", lang))}" rel="self" type="application/rss+xml" />
    <description>${esc(t("subtitulo", lang))}</description>
    <language>${lang === "es" ? "es-ES" : "ca-ES-valencia"}</language>
    <copyright>CC BY-SA 4.0</copyright>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
