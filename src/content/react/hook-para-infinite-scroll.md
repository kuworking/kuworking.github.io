---
date: '2021-12-08'
title: 'Crear un scroll infinito con React y un #custom hook#'
---

Cargar datos a medida que el usuario lo pide, bien apretando un botón o bien cuando ocurra un evento de scroll es una manera excelente de evitar sobrecargar el sistema

No tenemos por qué hacerlo nosotros, hay varias opciones:

- [react-window](https://github.com/bvaughn/react-window)
- [react-list](https://github.com/caseywebdev/react-list)
- [react-waypoint](https://github.com/civiccc/react-waypoint)
- [react-infinite-scroller](https://github.com/danbovey/react-infinite-scroller)
- [react-infinite-scroll-component](https://github.com/ankeetmaini/react-infinite-scroll-component)
- [react-tiny-virtual-list](https://github.com/clauderic/react-tiny-virtual-list)
- [react-simple-infinite-scroll](https://github.com/jaredpalmer/react-simple-infinite-scroll)
- [react-infinity](https://github.com/nmn/react-infinity)

Pero si no nos apetece, siempre podemos hacerlo nosotros mismos por ejemplo utilizando un _hook_

Aquí me limitaré a ir añadiendo nuevos ítems, también podría borrar los antiguos para aligerar más el tema, al final dependerá de las necesidades concretas de cada caso

Pediré una nueva imagen de `picsum.photos`, haré bloques de 10 y al final pondré un botón para pedir otro bloque de 10, y así succesivamente

Primero sin hook

```jsx
import React, { useState, useEffect } from 'react'

export default function App() {
  const [images, setImages] = useState([])
  const [blocks, setBlocks] = useState(1)

  const more = async () => {
    const more_images = await fetch_images(blocks + 1)
    setBlocks(prev => prev + 1)
    setImages(prev => [...prev, ...more_images])
  }

  const fetch_images = async page => (await fetch(`https://picsum.photos/v2/list?page=${page}&limit=10`)).json()

  useEffect(() => {
    ;(async () => {
      const picsum = await fetch_images(0)
      setImages(picsum)
    })()
  }, [])

  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {images.map((el, i) => (
          <img
            key={`img${i}`}
            src={el.download_url}
            style={{
              width: '150px',
              height: 'auto',
              marginBottom: '10px',
              borderRadius: '3px',
            }}
            alt=""
          />
        ))}
      </div>
      <button style={{ marginBottom: '100px' }} onClick={more}>
        more images
      </button>
    </div>
  )
}
```

Cada vez que apretamos el botón pedimos nuevas imágenes a `picsum` y se las añadimos al array `images`

> Si en lugar de apretar un botón queremos que sea automático al pasar por un elemento determinado (por ejemplo el penúltimo del array), yo lo haría con la librería [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer)

Y ahora encapsulado dentro de un _hook_

```jsx
import React, { useState, useEffect } from 'react'

export default function App() {
  const [images, more] = useInfinitePicsum() // mi hook

  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {images.map((el, i) => (
          <img
            key={`img${i}`}
            src={el.download_url}
            style={{
              width: '150px',
              height: 'auto',
              marginBottom: '10px',
              borderRadius: '3px',
            }}
            alt=""
          />
        ))}
      </div>
      <button style={{ marginBottom: '100px' }} onClick={more}>
        more images
      </button>
    </div>
  )
}

const useInfinitePicsum = () => {
  // estado para almacenar las imágenes
  const [images, setImages] = useState([])
  // estado para contar el número de bloques que pido, lo necesito para que picsum no me devuelva siempre las mismas imágenes
  const [blocks, setBlocks] = useState(1)

  // función para pedir más imágenes
  const more = async () => {
    const more_images = await fetch_images(blocks + 1)
    setBlocks(prev => prev + 1)
    setImages(prev => [...prev, ...more_images])
  }

  // función para pedir (esta vez literalmente) las imagenes a picsum
  const fetch_images = async page => (await fetch(`https://picsum.photos/v2/list?page=${page}&limit=10`)).json()

  // useEffect para ejecutar al principio la primera "pedida" de imágenes
  useEffect(() => {
    ;(async () => {
      const picsum = await fetch_images(0)
      setImages(picsum)
    })()
  }, [])

  return [images, more]
}
```
