---
date: '2021-12-08'
title: 'Cómo funciona #Array.reduce()# en JavaScript'
---

El `reduce`, aparte del nombre, lo que hace es iterar un iterable al estilo `forEach`, `map` o `filter`

```js
const myArr = [2, 2, 2, 2]
myArr.forEach(el => console.log(el))
myArr.map(el => console.log(el))
myArr.filter(el => console.log(el))
myArr.reduce((acc, el) => console.log(el), '')
```

La nomenclatura cambia un poco porque incluye un _acumulador_, una variable que recibiremos en cada ciclo y que será persistente

```js
const myArr = ['hola', 'que tal', 'estamos', 'por aquí']
const resultado = myArr.reduce((acc, el) => {
  return (acc += el + ' ... ')
}, '')

console.log(resultado) // "hola ... que tal ... estamos ... por aquí ... "
```

Es decir, el valor que retornamos es el valor de `acc` que recibiremos en la próxima iteración, hasta el final que devolveremos el último valor de `acc`, y el valor inicial de `acc` lo ponemos al final (aquí `''` pero puede ser cualquier variable)

Un ejemplo para ver cómo de versátil es el asunto:

```js
const myArr = ['hola', 'que', 'tal', 'estamos', 'por', 'aquí']
const resultado = myArr.reduce(
  (str, el) => {
    str.frase += el + ' ... '
    str.palabras.push(el)
    return str
  },
  { frase: '', palabras: [] }
)

console.log(resultado)
// {
//   frase: "hola ... que ... tal ... estamos ... por ... aquí ... ",
//   palabras: ["hola", "que", "tal", "estamos", "por", "aquí"]
// }
```

Otro ejemplo para contar tipos de palabras

```js
const posts = [
  { type: 'text', content: 'hey yo' },
  { type: 'text', content: 'hey yu' },
  { type: 'blog', content: 'this is a blog' },
  { type: 'blog', content: 'very interesting content' },
  { type: 'text', content: 'hey ya' },
]

const text_posts = posts.reduce((str, el) => (el.type === 'text' ? (str += 1) : str), 0)
const blog_posts = posts.reduce((str, el) => (el.type === 'blog' ? (str += 1) : str), 0)

console.log(text_posts) // 3
console.log(blog_posts) // 2
```

Muy versátil, aunque estamos iterando dos veces el mismo array y seguro que se puede mejorar (o no)

```js
const posts = [
  { type: 'text', content: 'hey yo' },
  { type: 'text', content: 'hey yu' },
  { type: 'blog', content: 'this is a blog' },
  { type: 'blog', content: 'very interesting content' },
  { type: 'text', content: 'hey ya' },
]

const { text: text_posts, blog: blog_posts } = posts.reduce(
  (str, el) => {
    str[el.type] += 1
    return str
  },
  {
    text: 0,
    blog: 0,
  }
)

console.log(text_posts) // 3
console.log(blog_posts) // 2
```

Ahora sólo hacemos una iteración ... pero el resultado es más ilegible, yo casi que prefiero la versión anterior
