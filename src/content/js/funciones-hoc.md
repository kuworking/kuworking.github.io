---
date: '2021-12-08'
title: 'Qué son las High Order Functions en JavaScript?'
---

Las HOC son literalmente funciones que aceptan y devuelven otras funciones

Si tenemos por ejemplo

```js
const arr = [5, 6, 7]
const changes = [1, 1, 1]

const new_arr = arr.map((el, i) => el + changes[i])
console.log(new_arr) // [6,7,8]
```

Pues esto mismo, refactorizado en plan _HOC_

```js
const sum_arrays = (arr1, arr2) => arr1.map((el, i) => el + arr2[i])

const arr = [5, 6, 7]
const changes = [1, 1, 1]

const new_arr = sum_arrays(arr, changes)
console.log(new_arr) // [6,7,8]
```

La función `sum_arrays` técnicamente ya es una HOC ya que es una función que nos devuelve un `map`, que es otra función

Pero además es que `map()` es otra HOC ya que nos devuelve otra función (pero como viene de serie no lo llamamos HOC)

Podemos seguir y atomizar el código para no tener una función que acepte dos argumentos sino solo funciones que acepten un argumento (más simples, más reutilizables)

```js
const sum_arrays = arr1 => arr2 => arr1.map((el, i) => el + arr2[i])

const arr = [5, 6, 7]
const changes = [1, 1, 1]

const new_arr = sum_arrays(arr)(changes)
console.log(new_arr) // [6,7,8]
```

La ventaja de expresarlo así es la versatilidad, por ejemplo en el siguiente código

```js
const user_status = user => new_status => (user.status = new_status)

const user1 = { name: 'me', status: 'pending' }
const user2 = { name: 'myself', status: 'pending' }

const updateUser1 = user_status(user1)
const updateUser2 = user_status(user2)

updateUser1('valid')
updateUser2('delete')

console.log(user1) // {name: "me", status: "valid"}
console.log(user2) // {name: "myself", status: "delete"}
```

Al final esto lo que te permite es escribir de forma más semántica y por lo tanto más entendible, esto es más fácil de mantener y de añadir complejidad, una de las ventajas de escribir en `currying`
