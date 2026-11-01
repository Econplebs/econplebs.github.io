// Tarjeta para compartir (1200×630, la que muestran WhatsApp, Telegram, Mastodon o el correo):
// panel grafito con la cuña roja, el título en Archivo Narrow y una foto de archivo, como el carrusel.
// Se genera al crear la web; no hace ninguna petición a otros dominios.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import satori from "satori";
import { decompress } from "wawoff2";
import type { Imagen } from "./sitio";

const raiz = process.cwd();
const ANCHO = 1200, ALTO = 630;

let fuentes: { name: string; data: ArrayBuffer; weight: 500 | 700; style: "normal" }[] | undefined;
async function cargarFuentes() {
  if (fuentes) return fuentes;
  const ttf = async (archivo: string) => {
    const datos = await decompress(fs.readFileSync(path.join(raiz, "public/fuentes", archivo)));
    return datos.buffer.slice(datos.byteOffset, datos.byteOffset + datos.byteLength) as ArrayBuffer;
  };
  fuentes = [
    { name: "Archivo Narrow", data: await ttf("archivo-narrow-latin-700-normal.woff2"), weight: 700, style: "normal" },
    { name: "IBM Plex Mono", data: await ttf("ibm-plex-mono-latin-500-normal.woff2"), weight: 500, style: "normal" },
  ];
  return fuentes;
}

// La foto, recortada y en gris como en la web, en formato que entiende el generador
async function fotoDatos(img: Imagen): Promise<string> {
  let tubo = sharp(path.join(raiz, "imagenes", img.file));
  const r = (img as Imagen & { recorte?: { izq: number; arr: number } }).recorte;
  if (r) tubo = sharp(await tubo.extract({ left: r.izq, top: r.arr, width: img.width, height: img.height }).toBuffer());
  if (!img.color) tubo = tubo.grayscale().linear(1.08, -10);
  const jpg = await tubo.resize({ width: 900, height: ALTO, fit: "cover", position: "attention" }).jpeg({ quality: 78 }).toBuffer();
  return `data:image/jpeg;base64,${jpg.toString("base64")}`;
}

let logo: string | undefined;
async function logoDatos(): Promise<string> {
  if (!logo) {
    const png = await sharp(path.join(raiz, "public/logo/logo-paper.svg"), { density: 300 }).resize({ width: 440 }).png().toBuffer();
    logo = `data:image/png;base64,${png.toString("base64")}`;
  }
  return logo;
}

// Cuña: panel oscuro con corte diagonal y franja roja
const cuna = `data:image/svg+xml;base64,${Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${ANCHO}" height="${ALTO}">
     <polygon points="0,0 650,0 470,${ALTO} 0,${ALTO}" fill="#16181A"/>
     <polygon points="650,0 680,0 500,${ALTO} 470,${ALTO}" fill="#C8412F"/>
   </svg>`,
).toString("base64")}`;

const caja = (style: Record<string, unknown>, children?: unknown) => ({ type: "div", props: { style: { display: "flex", ...style }, children } });

export async function tarjetaJpg(opciones: { rotulo: string; titulo: string; img: Imagen }): Promise<Buffer> {
  const { rotulo, titulo, img } = opciones;
  const tam = titulo.length > 80 ? 46 : titulo.length > 55 ? 54 : 64;
  const arbol = caja({ position: "relative", width: ANCHO, height: ALTO, background: "#16181A" }, [
    { type: "img", props: { src: await fotoDatos(img), width: 900, height: ALTO, style: { position: "absolute", left: 300, top: 0, width: 900, height: ALTO, objectFit: "cover" } } },
    { type: "img", props: { src: cuna, width: ANCHO, height: ALTO, style: { position: "absolute", left: 0, top: 0 } } },
    caja({ position: "absolute", left: 64, top: 60, width: 470, height: ALTO - 120, flexDirection: "column", justifyContent: "space-between" }, [
      caja({ flexDirection: "column" }, [
        caja({ fontFamily: "IBM Plex Mono", fontWeight: 500, fontSize: 22, letterSpacing: 3, color: "#D9DBD8", textTransform: "uppercase" }, rotulo),
        caja({ marginTop: 24, fontFamily: "Archivo Narrow", fontWeight: 700, fontSize: tam, lineHeight: 1, color: "#FFFFFF", textTransform: "uppercase" }, titulo),
      ]),
      { type: "img", props: { src: await logoDatos(), width: 220, height: 49, style: { width: 220, height: 49 } } },
    ]),
  ]);
  const svg = await satori(arbol as never, { width: ANCHO, height: ALTO, fonts: await cargarFuentes() });
  return sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
}
