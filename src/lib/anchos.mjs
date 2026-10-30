// Anchos (en píxeles) de las copias que se generan de cada imagen del banco.
// Lo usan el script de imágenes y las páginas, para que coincidan.
export const ANCHOS = [480, 960, 1600];

export function anchosDe(anchoOriginal) {
  const lista = ANCHOS.filter((w) => w < anchoOriginal);
  lista.push(Math.min(anchoOriginal, ANCHOS[ANCHOS.length - 1]));
  return [...new Set(lista)];
}

export const nombreCopia = (archivo, w) => `${archivo.replace(/\.[a-z]+$/i, "")}-${w}.webp`;
