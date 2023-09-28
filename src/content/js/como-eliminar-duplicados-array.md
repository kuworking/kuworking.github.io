---
date: '2021-12-08'
title: 'Cómo eliminar duplicados de un #array# en JavaScript'
---

En un `array` no tenemos problemas en almacenar duplicados

```js
// definimos el array
const myArr = []
myArr[0] = '😎'
myArr[1] = '😎'
myArr[2] = '😎'

// lo mismo, pero de forma más concisa
const myArr = ['😎', '😎', '😎']

// lo mismo, más compacto si tuviésemos que definir 10 o 20 elementos
const myArr = Array.from({ length: 3 }, () => '😎')
```

Si en nuestros datos hay duplicados, un `array` los almacenará sin problemas

Esto, sin embargo, no pasa con un `object`

```js
const myObj = { url: '😎', url: '😎', url: '😎' }
console.log(myObj) // {url: '😎'}
```

En este caso no hemos almacenado ningún duplicado, sólo una copia del mismo valor

Esto lo podemos aprovechar para eliminar duplicados de un `array`, aunque el código no es demasiado elegante

```js
const myArr = ['😎', '😎', '😎', '😅'] // tenemos duplicados!

const newArr = []
const myObj = {}

myArr.forEach(el => {
  // comprobamos si el valor existe en el objeto
  if (!(el in myObj)) {
    // si no existe creamos ese valor y lo añadimos al array final, y si sí existe no lo añadimos
    myObj[el] = true
    newArr.push(el)
  }
})

console.log(myArr) // ["😎", "😎", "😎", "😅"]
console.log(newArr) // ["😎", "😅"]
```

Y más compacto

```js
const myArr = ['😎', '😎', '😎', '😅'] // tenemos duplicados!

const newArr = []
const myObj = {}
myArr.forEach(el => !(el in myObj) && (myObj[el] = true) && newArr.push(el))

console.log(myArr) // ["😎", "😎", "😎", "😅"]
console.log(newArr) // ["😎", "😅"]
```

Esta solución funciona, pero es ofuscada y algo complicada de leer la primera vez

Para mejorarlo podemos utilizar los `sets`, que son como los `arrays` pero con características de los `object` y que NO pueden tener duplicados

```js
const myArr = ['😎', '😎', '😎', '😅'] // tenemos duplicados!

const newArr = Array.from(new Set(myArr)) // con Array.from
const newArr2 = [...new Set(myArr)] // con el spread operator

console.log(myArr)
console.log(newArr)
console.log(newArr2)
/*
["😎", "😎", "😎", "😅"]
["😎", "😅"]
["😎", "😅"]
*/
```

Fantástico

Luego tenemos los `filters`

```js
const myArr = ['😎', '😎', '😎', '😅']
const newArr = myArr.filter((el, index) => myArr.indexOf(el) === index)

console.log(myArr)
console.log(newArr)

/*
["😎", "😎", "😎", "😅"]
["😎", "😅"]
*/
```

Es algo más ofuscado que el `set` de antes, pero no tanto como las primeras opciones

Con `indexOf` recuperamos el primer índice de ese elemento del array, es decir, tendremos para el array unos números de `[0, 0, 0, 3]`

Y con la comparación con `indexOf(el) === index` tendríamos `[0 === 0, 0 === 1, 0 === 2, 3 === 3]` con lo que sólo en el primer y último elemento recibiríamos un `true` y por lo tanto el `filter` devolvería sólo ese valor, eliminando por lo tanto los duplicados

Y también tenemos el `reduce`, una función ofuscada por naturaleza pero increiblemente potente

```js
const myArr = ['😎', '😎', '😎', '😅']
const newArr = myArr.reduce((newTempArr, el) => (newTempArr.includes(el) ? newTempArr : [...newTempArr, el]), [])

console.log(myArr)
console.log(newArr)

/*
["😎", "😎", "😎", "😅"]
["😎", "😅"]
*/
```

Con `reduce` empezamos con un array vacío y lo vamos llenando de valores siempre que no estén incluidos en el array original, lo que lo vemos con `.includes()`

Perfectamente válido, pero terrible para leer si no tienes acostumbrada la vista
