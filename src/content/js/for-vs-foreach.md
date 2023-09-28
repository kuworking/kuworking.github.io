---
date: '2021-12-08'
title: 'Loops de JavaScript, diferencias entre #FOR# versus #FOREACH#'
---

Iterar sobre objetos es una de las operaciones más útiles en JavaScript ya que muchas veces los objetos representan la manera más versátil que tenemos para organizar nuestros datos

Tenemos el loop `for` que nos permite iterar en una secuencia de números

<!-- prettier-ignore -->
```js
const myArray = [
  'kuworking',
  'Aprende desarrollo web en kuworking.com',
]

for (let i = 0; i < myArray.length; i++ ) // myArray.length es igual a 2
  console.log(myArray[i])

// kuworking
// Aprende desarrollo web en kuworking.com

const myObject = {
  name: 'kuworking',
  description: 'Aprende desarrollo web en kuworking.com',
}

for (let i = 0; i < Object.entries(myObject).length; i++) {
  console.log(Object.keys(myObject)[i])
  console.log(myObject[Object.keys(myObject)[i]])
  }

// name
// description
// kuworking
// Aprende desarrollo web en kuworking.com
```

Tenemos otros loops (los pueds ver [aquí](/javascript_forin_vs_forof)), pero aquí lo compararé con el más moderno `forEach`

```js
const myObject = {
  name: 'kuworking',
  description: 'Aprende desarrollo web en kuworking.com',
}
Object.entries(myObject).forEach(el => console.log(el))

// ["name", "kuworking"]
// ["description", "Aprende desarrollo web en kuworking.com"]
```

La diferencia entre ambos es que el primero responde a una programación _imperativa_ y el segundo a una programación _funcional_ o _declarativo_

- Con el imperativo lo primero que lees es cómo lo haces, y luego ves el _qué_
- Con el funcional lo primero que lees es el _qué_, y luego ves el cómo

Dicho esto, entre ambos hay otra diferencia fundamental, el uso de `await` y `async`

Este código funciona como esperamos (voy a utilizar un `for..of` por comodidad)

```js
const timeout = (method, ms) =>
  new Promise(resolve =>
    setTimeout(() => {
      method()
      resolve()
    }, ms)
  )

const myObject = {
  name: 'kuworking',
  description: 'Aprende desarrollo web en kuworking.com',
}

;(async () => {
  for await (const [key, value] of Object.entries(myObject)) {
    await timeout(() => console.log('key -> ' + key), 1000)
    console.log('value: -> ' + value)
  }
})()

// "key -> name"
// "value: -> kuworking"
// "key -> description"
// "value: -> Aprende desarrollo web en kuworking.com"
```

Es decir, esperamos 1 segundo, luego tenemos una impresión de la primera pareja de valores en orden, luego esperamos otro segundo, y entonces nos aparecen la segunda pareja de valores

Pero si queremos hacer lo mismo con `forEach` vemos que no funciona

```js
const timeout = (method, ms) =>
  new Promise(resolve =>
    setTimeout(() => {
      method()
      resolve()
    }, ms)
  )

const myObject = {
  name: 'kuworking',
  description: 'Aprende desarrollo web en kuworking.com',
}

Object.entries(myObject).forEach(async ([key, value]) => {
  await timeout(() => console.log('key -> ' + key), 1000)
  console.log('value: -> ' + value)
})

// "value: -> kuworking"
// "value: -> Aprende desarrollo web en kuworking.com"
// "key -> name"
// "key -> description"
```

Aquí nos siguen apareciendo por orden, pero nos aparecen las 2 parejas de valores al mismo tiempo, en lugar de esperarnos 2 segundos nos esperamos sólo 1 segundo

- Con el `for of` esperarías 10 segundos, luego una pareja, luego 10 segundos más, luego la otra pareja
- Con el `forEach` esperarás 10 segundos y verás las 2 parejas en la consola

Esto pasa porque cada loop de `forEach` es en realidad una función independiente, no forma parte de un `loop`

En otras palabras, el forEach lanza tantas funciones como elementos tenga en el loop, y estas se ejecutan en paralelo, no hay ninguna secuencia
