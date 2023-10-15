---
date: '2021-12-08'
title: 'Cómo copiar un #array# en JavaScript'
---

Al igual que vimos con `objects` en [cómo copiar un object](/como-copiar-objects), clonar `arrays` no es trivial ya que en `JavaScript` todo se copia por _referencia_

Cuál es el problema con clonar arrays?

```js
const miarray = ['Me caes muy bien', 'Filomena']

const miarray2 = miarray
miarray2[0] = 'Me caes fatal'
miarray2[1] = 'Eustakio'

console.log(miarray) // ["Me caes fatal", "Eustakio"]
console.log(miarray2) // ["Me caes fatal", "Eustakio"]
```

Lo suyo hubiera sido tener dos copias del `array` con contenido distinto e independiente, pero vemos que cuando cambiamos el segundo array también estamos cambiando el primero, y no es lo que queremos

Para copiar todo el array podemos hacer lo siguiente:

- Copia _simple_

```js
const myArr = ['😎😎😎😎']

const myCopy = myArr
myArr[0] = '🔥🔥🔥🔥'

console.log(myArr) // ["🔥🔥🔥🔥"]
console.log(myCopy) // ["🔥🔥🔥🔥"]
```

- Copia _shallow_

Una copia _shallow_ de arrays se refiere a copiar la primera "capa" o la primera **dimensión** del array

Se puede hacer con un `Array.from()` o con el `spread operator`, que lo que hace es "desplegarnos" la estructura de datos

<!-- prettier-ignore -->
```js
const myArr = [
  '😎😎😎😎', // una dimensión
  '😎😎😎😎', // una dimensión
  '😎😎😎😎', // una dimensión
  ['🦄🦄🦄🦄', '🌛🌛🌛🌛'], // dos dimensiones
  { myOtherArray: ['🤘🏾🤘🏾🤘🏾🤘🏾'] }, // tres dimensiones
  ]

const myCopy = myArr // copia simple
const myShallowCopy = Array.from(myArr) // copia shallow, con el Array.from
const myShallowCopy2 = [...myArr] // copia shallow, con el spread operator

// ahora cambio las variables de mi array inicial y así vemos cómo de independiente es mi copia

myArr[0] = '🔥🔥🔥🔥'
myArr[1] = '🔥🔥🔥🔥'
myArr[2] = '🔥🔥🔥🔥'
myArr[3][0] = '🔥🔥🔥🔥'
myArr[3][1] = '🔥🔥🔥🔥'
myArr[4].myOtherArray[0] = '🔥🔥🔥🔥'

// el array original y la copia simple, son idénticas

console.log(myArr) // ["🔥🔥🔥🔥", "🔥🔥🔥🔥", "🔥🔥🔥🔥", ["🔥🔥🔥🔥", "🔥🔥🔥🔥"], {myOtherArray: ["🔥🔥🔥🔥"]}]
console.log(myCopy) // ["🔥🔥🔥🔥", "🔥🔥🔥🔥", "🔥🔥🔥🔥", ["🔥🔥🔥🔥", "🔥🔥🔥🔥"], {myOtherArray: ["🔥🔥🔥🔥"]}]

// Las copias shallow, ves que ha protegido la primera dimensión del array, pero no las demás

console.log(myArr) // ["🔥🔥🔥🔥", "🔥🔥🔥🔥", "🔥🔥🔥🔥", ["🔥🔥🔥🔥", "🔥🔥🔥🔥"], {myOtherArray: ["🔥🔥🔥🔥"]}]
console.log(myShallowCopy) // ["😎😎😎😎", "😎😎😎😎", "😎😎😎😎", ["🔥🔥🔥🔥", "🔥🔥🔥🔥"], {myOtherArray: ["🔥🔥🔥🔥"]}]
console.log(myShallowCopy2) // ["😎😎😎😎", "😎😎😎😎", "😎😎😎😎", ["🔥🔥🔥🔥", "🔥🔥🔥🔥"], {myOtherArray: ["🔥🔥🔥🔥"]}]
```

- Copia _deep_

Si una copia _shallow_ era "superficial", una copia _deep_ busca hacer una copia completa de todo el array, una copia de todas sus **dimensiones**

Y para hacerlo tenemos distintas maneras:

- De forma manual con un loop que nos itere por todos los lados

- Utilizando alguna librería ultra-famosa como _lodash_

Vamos a ver los dos métodos, el primero (el manual) utilizando la solución de [samanthaming](https://dev.to/samanthaming/how-to-deep-clone-an-array-in-javascript-3cig), y el segundo con la librería _lodash_

```js
// importo lodash
import _ from 'lodash'

// función manual para clonar arrays
const clone = items => items.map(item => (Array.isArray(item) ? clone(item) : item))

// el array original
const myArr = ['😎😎😎😎', ['😎😎😎😎'], { myOtherArray: ['😎😎😎😎'] }]

// copia shallow
const myShallowCopy = [...myArr]

// copia deep manual
const myDeepCopy = clone(myArr)

// copia deep con los dos métodos de lodash, uno para shallow y otro para deep
const myShallowLodashClone = _.clone(myArr)
const myDeepLodashClone = _.cloneDeep(myArr)

// cambio el array original
myArr[0] = '🔥🔥🔥🔥' // 1 dimensión
myArr[1][0] = '🔥🔥🔥🔥' // 2 dimensiones
myArr[2].myOtherArray[0] = '🔥🔥🔥🔥' // 3 dimensiones

// Y a ver qué nos dan los clones

console.log(myArr) //                ["🔥🔥🔥🔥",   ["🔥🔥🔥🔥"],   {myOtherArray: ["🔥🔥🔥🔥"]}]
console.log(myShallowCopy) //        ["😎😎😎😎", ["🔥🔥🔥🔥"],   {myOtherArray: ["🔥🔥🔥🔥"]}]
console.log(myDeepCopy) //           ["😎😎😎😎", ["😎😎😎😎"], {myOtherArray: ["🔥🔥🔥🔥"]}]
console.log(myShallowLodashClone) // ["😎😎😎😎", ["🔥🔥🔥🔥"],   {myOtherArray: ["🔥🔥🔥🔥"]}]
console.log(myDeepLodashClone) //    ["😎😎😎😎", ["😎😎😎😎"], {myOtherArray: ["😎😎😎😎"]}]
```

- Las copias _shallow_ sólo copian la primera dimensión, como hemos visto antes
- La copia _deep_ con la función propia no consigue copiar todas las dimensiones
- Y una copia completa sí la conseguimos con `_.cloneDeep` de _lodash_

Podríamos modificar la función para conseguir los mismos resultados de lodash, de hecho la tienes en [lodash.clonedeep](https://www.npmjs.com/package/lodash.clonedeep), por lo que no tienes que importar toda la librería

O directamente puedes ir al github, ver la función, y utilizarla tu mismo

- Copia _deep_ casi completa con `JSON`

Hay otro método tremendamente práctico y que no requiere de librerías externas

Es el método `JSON`, y se trata de convertir nuestro array en un objeto `JSON`, y luego volver a convertir ese objeto en un **nuevo** array

En el proceso las referencias se **consolidan** en nuevos objetos, con lo que aunque la función `JSON` no está pensada para clonar datos, nos sirve perfectamente a este propósito

```js
// el array original
const myArr = ['😎😎😎😎', ['🐥🐥🐥🐥'], { myOtherArray: ['🦄🦄🦄🦄'] }]

// la copia con JSON
const myJSONCopy = JSON.parse(JSON.stringify(myArr))

// cambio el array original
myArr[0] = '🔥🔥🔥🔥' // 1 dimensión
myArr[1][0] = '🔥🔥🔥🔥' // 2 dimensiones
myArr[2].myOtherArray[0] = '🔥🔥🔥🔥' // 3 dimensiones

// Y a ver qué nos da

console.log(myArr) //      ["🔥🔥🔥🔥",   ["🔥🔥🔥🔥"],   {myOtherArray: ["🔥🔥🔥🔥"]}]
console.log(myJSONCopy) // ["😎😎😎😎", ["🐥🐥🐥🐥"], {myOtherArray: ["🦄🦄🦄🦄"]}]
```

Conseguimos clonar todo el objeto como hacíamos antes con el `_.cloneDeep` de _lodash_

- **Ventajas?** Se lee muy fácilmente y no dependes de una librería externa
- **Desventajas?** Cierta incompatibilidad con algunos tipos de datos que no se pueden clonar bien (como `Date`)

En cuanto a velocidad, haciendo un benchmark con [measurethat.net](https://www.measurethat.net) vemos lo siguiente:

- Con estructuras sencillas, la solución con `lodash` es un 1.5x más rápida que la solución con `JSON`
- Con estructuras "algo" complejas como la que verás debajo, la solución `JSON` ya empieza a ir más rápido que la de lodash

```js
const myArr = [
  '😎😎😎😎',
  ['🐥🐥🐥🐥'],
  { myOtherArray: ['🦄🦄🦄🦄'] },
  '😎😎😎😎',
  ['🐥🐥🐥🐥'],
  { myOtherArray: ['🦄🦄🦄🦄'] },
  '😎😎😎😎',
  ['🐥🐥🐥🐥'],
  { myOtherArray: ['🦄🦄🦄🦄'] },
  '😎😎😎😎',
  ['🐥🐥🐥🐥'],
  { myOtherArray: ['🦄🦄🦄🦄'] },
  '😎😎😎😎',
  ['🐥🐥🐥🐥'],
  { myOtherArray: ['🦄🦄🦄🦄'] },
  '😎😎😎😎',
  ['🐥🐥🐥🐥'],
  { myOtherArray: ['🦄🦄🦄🦄'] },
  '😎😎😎😎',
  ['🐥🐥🐥🐥'],
  { myOtherArray: ['🦄🦄🦄🦄'] },
  '😎😎😎😎',
  ['🐥🐥🐥🐥'],
  { myOtherArray: ['🦄🦄🦄🦄'] },
  '😎😎😎😎',
  ['🐥🐥🐥🐥'],
  { myOtherArray: ['🦄🦄🦄🦄'] },
]
```

Con este array, la solución más rápida sería la de JSON

Eso sí, con ninguno de estos métodos conseguiríamos clonar un array que tenga una función en su estructura, lo puedes ver abajo

```js
const myArr = [
  '😎😎😎😎',
  ['🐥🐥🐥🐥'],
  { myOtherArray: ['🦄🦄🦄🦄'], myMethod: () => console.log('hola como estamos') },
]
```

Este método tiene una función en la estructura, pues escojas el método que escojas, esa función no la podrás clonar
