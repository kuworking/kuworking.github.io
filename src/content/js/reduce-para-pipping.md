---
date: '2021-12-08'
title: 'JavaScript reduce para implementar #pipping#'
---

Por `pipping()` se entiende una manera de concatenar métodos que nos permite ser más declarativos y programar más funcionalmente (huyendo de la orientación a objetos)

El reduce no deja de ser un `superMap`, un `superForEach` o un `superFilter` (aquí tienes [la entrada del reduce](/como-funciona-array-reduce))

Pero qué pasa cuando utilizamos el `reduce` para iterar un conjunto de funciones?

Pues que podemos implementar el `pipping`

Ejemplo: qué pasa si queremos aplicar a una cadena de texto un tratamiento concreto

```js
// funciones genéricas
const sanitize = str => str.replace(/[^a-zA-Z ]/g, '')
const addParagraph = str => '<p>' + str + '</p>'
const addTitle = str => '<h1>MY VERY SPECIAL TITLE</h1>' + str

// el texto que recibiría de un formulario
const data = 'this is my fantastic text that here and there and blah with a <a href="">forbidden link!!</a>'

// mi resultado final (opción 1)
const opcion1_1 = sanitize(data)
const opcion1_2 = addParagraph(opcion1_1)
const opcion1_3 = addTitle(opcion1_2)

console.log(opcion1_1) // this is my fantastic text that here and there and blah with a hrefa forbidden linka
console.log(opcion1_2) // <p>this is my fantastic text that here and there and blah with a hrefa forbidden linka</p>
console.log(opcion1_3) // <h1>MY VERY SPECIAL TITLE</h1><p>this is my fantastic text that here and there and blah with a hrefa forbidden linka</p>

// mi resultado final (opción 2)
const opcion2 = addTitle(addParagraph(sanitize(data)))

console.log(opcion2) // <h1>MY VERY SPECIAL TITLE</h1><p>this is my fantastic text that here and there and blah with a hrefa forbidden linka</p>
```

Desde un punto de vista de código entendible, la opción 1 es algo desastre, y la opción 2 es simplemente el infierno

La solución es utilizar `reduce`

```js
// funciones genéricas
const sanitize = str => str.replace(/[^a-zA-Z ]/g, '')
const addParagraph = str => '<p>' + str + '</p>'
const addTitle = str => '<h1>MY VERY SPECIAL TITLE</h1>' + str

// el texto que recibiría de un formulario
const data = 'this is my fantastic text that here and there and blah with a <a href="">forbidden link!!</a>'

// funciones que quiero aplicar en un orden específico
const prepare = [sanitize, addParagraph, addTitle]

// mi resultado final (opción 3)
const myFinalString = prepare.reduce((final, metodo) => metodo(final), data)

console.log(myFinalString)
// <h1>MY VERY SPECIAL TITLE</h1><p>this is my fantastic text that here and there and blah with a hrefa forbidden linka</p>
```

Super elegante

A esto se le llama hacer una _pipe_ (una tubería)

Pero en verdad es complicado de leer

Para mejorarlo, podemos utilizar una función que llamaremos `pipe`

```js
// función pipe
const pipe = fs => x => fs.reduce((v, f) => f(v), x)

// funciones genéricas
const sanitize = str => str.replace(/[^a-zA-Z ]/g, '')
const addParagraph = str => '<p>' + str + '</p>'
const addTitle = str => '<h1>MY VERY SPECIAL TITLE</h1>' + str

// el texto que recibiría de un formulario
const data = 'this is my fantastic text that here and there and blah with a <a href="">forbidden link!!</a>'

// funciones que quiero aplicar en un orden específico
const prepare = [sanitize, addParagraph, addTitle]

// el texto después de aplicarle mi tratamiento
const myFinalString = pipe(prepare)(data)

console.log(myFinalString)
// <h1>MY VERY SPECIAL TITLE</h1><p>this is my fantastic text that here and there and blah with a hrefa forbidden linka</p>
```

Ahora sí, es elegante y fácil de leer

La función `pipe` no es fácil de leer, pero su uso sí es entendible

Más información, en

- [vanslaars.io](https://vanslaars.io/blog/create-pipe-function/#complete-code)
- [benlesh](https://dev.to/benlesh/a-simple-explanation-of-functional-pipe-in-javascript-2hbj)
- [morioh](https://morioh.com/p/3cdedeb17367)
