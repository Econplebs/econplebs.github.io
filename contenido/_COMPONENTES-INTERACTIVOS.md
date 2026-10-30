# Componentes interactivos en los artículos

Los artículos normales son `.md`. Si un artículo necesita un elemento
interactivo, el archivo se llama `.mdx` (mismo frontmatter, mismo Markdown)
y dentro se pueden escribir estas piezas tal cual, sin nada más.
Ejemplo completo: `es/articulos/del-salario-nominal-al-salario-real.mdx`.

Si alguien visita la web sin JavaScript, ve el contenido igualmente
(todos los pasos a la vez, o el gráfico con los valores iniciales).

## Esquema paso a paso

```
<PasoAPaso titulo="De la relación básica a los casos">
  <Paso titulo="La relación básica">
    Texto del primer paso.
  </Paso>
  <Paso titulo="Segundo paso">
    Texto del segundo paso.
  </Paso>
</PasoAPaso>
```

Se ve el primer paso y un botón «Paso siguiente» que va desplegando los demás.

## Gráfico de salario real

```
<SalarioReal salario={3} inflacion={5} />
```

Dos controles (subida del salario y de los precios) y unas barras que
muestran cómo cambia el poder adquisitivo. Los números entre llaves son los
valores con los que empieza.

## Cita destacada

En `.md`: una línea que empiece por `> [!cita] `.
En `.mdx`: `<Cita>Texto de la cita.</Cita>`

## Cuidado en los .mdx

- Los signos `<` y `{` tienen significado especial: si los necesitas en el
  texto, pídeselo a Claude.
- Los textos de los botones salen solos en castellano o en valenciano según
  la carpeta del artículo.
