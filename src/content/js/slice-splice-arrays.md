---
date: '2021-12-08'
title: 'Cómo funciona #slice# y #splice#?'
---

# Diferencias entre Slice y Splice

Si buscas inmutabilidad (y no veo por qué no), esto es que la variable se quede como está, entonces quieres `slice` (una loncha) y NO quieres `splice` (un trozo)

`slice` devuelve una copia del array, que puede ser entero o una parte del mismo

<!-- prettier-ignore -->
```js
const arr = ['😀','😁','😂','🤣','😎','🔥','🔥','🔥']
const new_arr1 = arr.slice()
const new_arr2 = arr.slice(4)
const new_arr3 = arr.slice(0,4)
const new_arr4 = arr.slice(-2)

console.log(new_arr1) // ["😀", "😁", "😂", "🤣", "😎", '🔥','🔥','🔥']
console.log(new_arr2) // ["😎", '🔥','🔥','🔥']
console.log(new_arr3) // ["😀", "😁", "😂", "🤣"]
console.log(new_arr4) // ["🔥", "🔥"]
```

`splice` nos devuelve la parte del array, modificando el array original que se queda sin la parte que le hemos quitado

<!-- prettier-ignore -->
```js
const arr1 = ['😀','😁','😂','🤣','😎','🔥','🔥','🔥']
const new_arr1 = arr1.splice() 
console.log(arr1) // ["😀", "😁", "😂", "🤣", "😎", "🔥", "🔥", "🔥"]
console.log(new_arr1) // []

const arr2 = ['😀','😁','😂','🤣','😎','🔥','🔥','🔥']
const new_arr2 = arr2.splice(0) 
console.log(arr2) // []
console.log(new_arr2) // ["😀", "😁", "😂", "🤣", "😎", 

const arr3 = ['😀','😁','😂','🤣','😎','🔥','🔥','🔥']
const new_arr3 = arr3.splice(2) 
console.log(arr3) // ["😀", "😁"]
console.log(new_arr3) // ["😂", "🤣", "😎", "🔥", "🔥", "🔥"]


const arr4 = ['😀','😁','😂','🤣','😎','🔥','🔥','🔥']
const new_arr4 = arr4.splice(0,2) 
console.log(arr4) // ["😂", "🤣", "😎", "🔥", "🔥", "🔥"]
console.log(new_arr4) //["😀", "😁"]

const arr5 = ['😀','😁','😂','🤣','😎','🔥','🔥','🔥']
const new_arr5 = arr5.splice(-4) 
console.log(arr5) // ["😀", "😁", "😂", "🤣"]
console.log(new_arr5) // ["😎", "🔥", "🔥", "🔥"]

const arr6 = ['😀','😁','😂','🤣','😎','🔥','🔥','🔥']
const new_arr6 = arr6.splice(-4, 2) 
console.log(arr6) // ["😀", "😁", "😂", "🤣", "🔥", "🔥"]
console.log(new_arr6) // ["😎", "🔥"]
```

