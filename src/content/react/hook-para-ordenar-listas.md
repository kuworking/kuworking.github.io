---
date: '2021-12-08'
title: 'Ordenar listas con un custom hook en React | JavaScript'
---

Para ordenar listas, nada más sencillo que utilizar la función `sort()`, que funciona (puedes mirarlo [aquí](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)) simplemente comparando valores:

```js
const lista = [2, 5, 4, 7]
console.log(lista.sort())
// [2, 4, 5, 7]
```

Esto de arriba es lo mismo que hacer lo siguiente

```js
const lista = [2, 5, 4, 7]
console.log(lista.sort((a, b) => a - b))
// [2, 4, 5, 7]
```

Si no son números y queremos un orden alfabético, haríamos lo siguiente

```js
const lista = ['juan', 'palomo', 'y', 'sus cosas']
console.log(
  lista.sort((a, b) => {
    if (a > b) return 1
    if (a < b) return -1
    return 0
  })
)
// ["juan", "palomo", "sus cosas", "y"]
```

Pero no hace falta escribir tanto, podemos expresar lo mismo con una línea

```js
const lista = ['juan', 'palomo', 'y', 'sus cosas']
console.log(lista.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0)))
// ["juan", "palomo", "sus cosas", "y"]
```

Y si lo que tenemos son estructuras complejas, pues lo mismo

```js
const lista = [
  { nombre: 'juan', edad: 50 },
  { nombre: 'alberto', edad: 40 },
  { nombre: 'aragor', edad: 2000 },
]
console.log(lista.sort((a, b) => (a.edad > b.edad ? 1 : a.edad < b.edad ? -1 : 0)))
// 0: {nombre: "alberto", edad: 40}
// 1: {nombre: "juan", edad: 50}
// 2: {nombre: "aragor", edad: 2000}
```

Esto en React sería así

```jsx
import React, { useState, useEffect } from 'react'

// mi componente principal <Lista>
const Lista = () => {
  // guardo el estado list de valor inicial la lista que tengo
  const [list, setList] = useState([
    { nombre: 'juan', edad: 50 },
    { nombre: 'alberto', edad: 40 },
    { nombre: 'aragor', edad: 2000 },
  ])

  // utilizo useEffect para ejecutar este código sólo una vez
  useEffect(() => {
    // copio la lista con [...list] y la ordeno con sort()
    const sortedList = [...list].sort((a, b) => (a.edad > b.edad ? 1 : a.edad < b.edad ? -1 : 0))
    // actualizo el estado con la nueva lista ya ordenada
    setList(sortedList)
  }, [])

  // vuelco el contenido del estado `list`
  return (
    <>
      {/* Aquí pongo el botón para reordenar la lista */}
      <button
        onClick={() => {
          let newSortedList = [...list].sort((a, b) => (a.edad > b.edad ? 1 : a.edad < b.edad ? -1 : 0))
          // si la lista después de ordenarla tiene el mismo primer elemento, lo repito a la inversa
          // (claro que esto es ineficiente, lo suyo sería habilitar otro estado para guardar el tipo de ordenamiento que hemos hecho)
          if (newSortedList[0] === list[0])
            newSortedList = [...list].sort((b, a) => (a.edad > b.edad ? 1 : a.edad < b.edad ? -1 : 0))
          setList(newSortedList)
        }}
      >
        Ordenar
      </button>

      {/* Y aquí la lista, cada vez que el estado cambie este componente se va a repintar y a actualizar la vista */}
      <ul>
        {list.map(el => (
          <li>
            {el.nombre}: {el.edad}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Lista
```

Pero con los _hooks_ podemos extraer la lógica del tema y nos queda todo más bonito y útil

Primero lo extraemos en una función al uso, `sort_lists`

```jsx
import React, { useState, useEffect } from 'react'

// Esta es mi función para reutilizar `sort`
const sort_lists = (key, list, inverse) =>
  inverse
    ? [...list].sort((b, a) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0))
    : [...list].sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0))

// Y este mi componente principal
const Lista = () => {
  const [list, setList] = useState([
    { nombre: 'juan', edad: 50 },
    { nombre: 'alberto', edad: 40 },
    { nombre: 'aragor', edad: 2000 },
  ])

  useEffect(() => {
    setList(sort_lists('edad', list))
  }, [])

  return (
    <>
      <button
        onClick={() => {
          let newSortedList = sort_lists('edad', list)
          if (newSortedList[0] === list[0]) newSortedList = sort_lists('edad', list, true)
          setList(newSortedList)
        }}
      >
        Ordenar
      </button>

      <ul>
        {list.map(el => (
          <li>
            {el.nombre}: {el.edad}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Lista
```

Y ahora extraemos la función y el comportamiento en nuestro _custom hook_

```jsx
import React, { useState, useEffect } from 'react'

// Este es mi custom hook
const useSortTable = (listToSort, originalKey) => {
  // definimos un estado
  const [list, setList] = useState(listToSort)

  // definimos la función anterior pero sin especificar la lista ya que será la principal
  const sort_lists = (key, inverse) =>
    inverse
      ? [...list].sort((b, a) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0))
      : [...list].sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0))

  // ordenamos la lista con el useEffect
  useEffect(() => {
    setList(sort_lists(originalKey))
  }, [])

  // devolvemos el estado que contiene la lista
  // ..el método para actualizar el estado
  // ..y el método para ordenarla
  return [list, setList, sort_lists]
}

// Ahora seguimos con el componente principal
const Lista = () => {
  // y aquí utilizamos el hook
  const [list, setList, sort] = useSortTable(
    [
      { nombre: 'juan', edad: 50 },
      { nombre: 'alberto', edad: 40 },
      { nombre: 'aragor', edad: 2000 },
    ],
    'edad'
  )

  return (
    <>
      <button
        onClick={() => {
          let newSortedList = sort('edad')
          if (newSortedList[0] === list[0]) newSortedList = sort('edad', true)
          setList(newSortedList)
        }}
      >
        Ordenar
      </button>

      <ul>
        {list.map((el, i) => (
          <li key={`lista${i}`}>
            {el.nombre}: {el.edad}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Lista
```
