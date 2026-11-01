// Archivos de cita de cada artículo: /citas/<idioma>-<slug>.bib y .ris
import type { APIRoute } from "astro";
import { articulosDe, type Articulo } from "../../lib/sitio";
import { citaBib, citaRis } from "../../lib/citas";

export async function getStaticPaths() {
  const todos = [...(await articulosDe("es")), ...(await articulosDe("ca"))];
  return todos.flatMap((articulo) =>
    (["bib", "ris"] as const).map((ext) => ({
      params: { archivo: `${articulo.data.lang}-${articulo.data.slug}.${ext}` },
      props: { articulo, ext },
    })),
  );
}

export const GET: APIRoute = ({ props }) => {
  const { articulo, ext } = props as { articulo: Articulo; ext: "bib" | "ris" };
  return ext === "bib"
    ? new Response(citaBib(articulo), { headers: { "Content-Type": "application/x-bibtex; charset=utf-8" } })
    : new Response(citaRis(articulo), { headers: { "Content-Type": "application/x-research-info-systems; charset=utf-8" } });
};
