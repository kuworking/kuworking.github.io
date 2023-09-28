---
date: '2021-12-08'
title: 'Cómo crear #arrays# en JavaScript'
---

Crear arrays en `JavaScript` es sencillo

```js
const miArray = []
const miArray2 = new Array() // dos formas idénticas de crear un array
```

Y si queremos crear un array de 10 elementos?

Así no funciona

```js
// así en realidad estamos creando un array con el valor 10
const miArray = [10]

console.log(miArray) // [10]
console.log(miArray.length) // 1
```

Así estamos creando un array con el valor 10 en su primera y única posición

En su lugar podemos hacer esto

```js
const miArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

console.log(miArray) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(miArray.length) // 10
```

Pero no querremos hacer esto con un array de 100, en su lugar podríamos hacer esto

```js
const miArray = new Array(100)
const miArray2 = Array(100) // es lo mismo

console.log(miArray) // [undefined, undefined, undefined, undefined ...]
console.log(miArray.length) // 100
```

Hecho, ya tenemos un array con 100 posiciones

Y si queremos que tengan algún valor dentro?

Podríamos utilizar `Array.map`

```js
const miArray = Array(100).map((el, i) => {
  console.log(i) // no aparece por ningún lado
  return i
})

console.log(miArray) // [undefined, undefined, undefined, undefined ...]
console.log(miArray.length) // 100
```

Pero no funciona, porque aunque el array que creamos con `Array(100)` tiene la propiedad `length` de 100, en realidad es un array vació y `map` no tiene nada sobre lo qué iterar

Otro intento con `Array.fill`

```js
const miArray = Array(100).fill('e')

console.log(miArray) // ["e", "e", "e", "e", "e", ...]
console.log(miArray.length) // 100
```

Ahora sí, esto funciona

Pero cuidado, si quieres asignar un objeto estarás asignando el mismo objeto

```js
const miArray = Array(100).fill({ status: 'pending' })

console.log(miArray) // [{status: "pending"}, {status: "pending"}, {status: "pending"} ...]
console.log(miArray.length) // 100

miArray[0].status = 'valid'
console.log(miArray) // [{status: "valid"}, {status: "valid"}, {status: "valid"} ...]
// han cambiado todos los estados!
```

Dependiendo de lo que quieras esto no es lo que buscabas, pero podríamos combinar lo que ya hemos visto

```js
const miArray = Array(100)
  .fill()
  .map((el, i) => i)

console.log(miArray) // [0, 1, 2, 3, 4, 5, 6, 7 ...]
console.log(miArray.length) // 100
```

Así nos funciona

También podemos hacerlo con `Array.from`, que vendría a ser lo mismo pero escrito de forma algo distinto

```js
const miArray = Array.from(Array(100), (el, i) => i)

console.log(miArray) // [0, 1, 2, 3, 4, 5, 6, 7 ...]
console.log(miArray.length) // 100
```

Listos, pero cuál de los dos métodos es mejor?

Si voy a [measurethat.net](https://www.measurethat.net/Benchmarks/ShowResult/115804) tengo lo siguiente

- `fill().map()` 1400K operaciones por segundo
- `from()` 300K operaciones por segundo

Es decir, _mucho mejor_ la primera opción, que además a mi me parece la más legible

Pero y si asignamos un objeto? sirven las dos?

```js
const miArray1 = Array(100)
  .fill()
  .map(() => ({ status: 'pending' }))
const miArray2 = Array.from(Array(100), () => ({ status: 'pending' }))

miArray1[0].status = 'valid'
miArray2[0].status = 'valid'
console.log(miArray1) // [{status: "valid"}, {status: "pending"}, {status: "pending"} ...]
console.log(miArray2) // [{status: "valid"}, {status: "pending"}, {status: "pending"} ...]
```

Sí, sirven los dos

Hay una última alternativa con el operador _spread_ que además resulta ser la más rápida

```js
const miArray1 = Array(100)
  .fill()
  .map((el, i) => i)
const miArray2 = [...Array(100)].map((el, i) => i)

console.log(miArray1) // [0, 1, 2, 3, 4, 5, 6, 7 ...]
console.log(miArray2) // [0, 1, 2, 3, 4, 5, 6, 7 ...]
```

- `miArray1` 1400K operaciones por segundo
- `miarray2` 1800K operaciones por segundo
