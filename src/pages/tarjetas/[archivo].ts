// Tarjetas para compartir: /tarjetas/<idioma>-<slug>.jpg (artículos) y /tarjetas/<idioma>-portada.jpg (el resto)
import type { APIRoute } from "astro";
import imagenes from "../../datos/imagenes.json";
import { t, articulosDe, imagenDe, nombreCategoria, type Imagen, type Lang } from "../../lib/sitio";
import { tarjetaJpg } from "../../lib/tarjeta";

export async function getStaticPaths() {
  const salidas = [];
  for (const lang of ["es", "ca"] as Lang[]) {
    salidas.push({
      params: { archivo: `${lang}-portada.jpg` },
      props: { rotulo: "Econplebs", titulo: t("subtitulo", lang), img: imagenes.images.find((i) => i.key === "industria")! },
    });
    for (const a of await articulosDe(lang)) {
      salidas.push({
        params: { archivo: `${lang}-${a.data.slug}.jpg` },
        props: { rotulo: nombreCategoria(a.data.category, lang), titulo: a.data.title, img: imagenDe(a) },
      });
    }
  }
  return salidas;
}

export const GET: APIRoute = async ({ props }) => {
  const png = await tarjetaJpg(props as { rotulo: string; titulo: string; img: Imagen });
  return new Response(png, { headers: { "Content-Type": "image/jpeg" } });
};
