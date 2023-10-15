---
date: '2021-12-08'
title: 'Loops de JavaScript, diferencias entre #FOR..IN# versus #FOR..OF#'
---

Los objetos y los arrays ambos son estructuras de datos, pero

- los objetos _no_ son iterables mientras que las arrays _sí_ lo son
- los objetos tienen `keys` de cualquier valor, los arrays tienen `keys` numéricos y por estricto orden

Puedo convertir el objeto en arrays extrayendo sus `keys`, sus `values`, o todo a la vez

```js
const myObject = { name: 'kuworking', description: 'Aprende desarrollo web en kuworking.com' }

console.log(Object.keys(myObject)) // ['name', 'description']
console.log(Object.values(myObject)) // ['kuworking', 'Aprende desarrollo web en kuworking.com']
console.log(Object.entries(myObject)) // [['name','kuworking'],['description', 'Aprende desarrollo web en kuworking.com']]
```

Dos formas de iterar objetos que podríamos decir clásicos (pero no obsoletos) son `for .. in` y `for .. of`

El `for .. in` nos sirve exclusivamente para iterar objetos

```js
const myObject = { name: 'kuworking', description: 'Aprende desarrollo web en kuworking.com' }

for (const property in myObject) {
  if (myObject.hasOwnProperty(property)) {
    console.log(property)
    console.log(myObject.property) // no funciona, porque no tenemos ninguna propiedad de nombre 'property'
    console.log(myObject[property]) // sí funciona
  }
}

/*
name
undefined
"kuworking"
description
undefined
"Aprende desarrollo web en kuworking.com"
*/
```

El problema de utilizar este loop es que nos vemos obligador a utilizar `myObject.hasOwnProperty(property)` para asegurarnos que estamos iterando sobre propiedades del objeto que yo he definido, porque pueden existir otras propiedades en el objeto si se ha modificado su `prototype`

El `for .. of` nos sirve exlusivamente para iterar arrays, con lo que tenemos que hacer la conversión.

Ojo, nadie garantiza el orden en esos arrays ya que esto no es necesario según la especificación, pero en la práctica sí parece que se respeta ese orden ([Stack Overflow](https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order))

```js
const myObject = { name: 'kuworking', description: 'Aprende desarrollo web en kuworking.com' }
for (const entry of Object.entries(myObject)) {
  console.log(entry)
  console.log(entry[0])
  console.log(entry[1])
}

/*
[
    "name",
    "kuworking"
]
"name"
"kuworking"

[
    "description",
    "Aprende desarrollo web en kuworking.com"
]
"description"
"Aprende desarrollo web en kuworking.com"
*/
```

O en la versión desestructurada

```js
const myObject = { name: 'kuworking', description: 'Aprende desarrollo web en kuworking.com' }
for (const [key, entry] of Object.entries(myObject)) {
  console.log(key + ' -> ' + entry)
}

/*
"name -> kuworking"
"description -> Aprende desarrollo web en kuworking.com"
*/
```

La diferencia con opciones más modernas como el `Array.forEach()` es que en el caso del `forEach` el bucle lanza funciones en paralelo, mientras que en el `for .. of` el bucle espera a que cada ciclo termine antes de empezar el siguiente, una diferencia que conviene no olvidar (lo tienes [aquí](/for-vs-foreach))
