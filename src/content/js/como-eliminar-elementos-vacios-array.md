---
date: '2021-12-08'
title: 'Cómo eliminar elementos vacíos de un #array# en JavaScript'
---

A veces un array contendrá valores nulos y querremos librarnos de ellos

A veces querremos hacerlo dentro del `.map()` que estemos utilizando (o similares), pero otras veces simplemente querremos limpiar el array y ya está

Cómo lo hacemos? Lo primero es definir qué entendemos nosotros como "valores vacíos"

Qué es un valor vacío? Podemos tener distintos

```js
const myArrRaw = ['existo 😎', '', null, undefined, 'también existo 😎😎', false, 0, NaN, , , , , ' ', 45]
```

Lo consideramos todo como valor vacío? También los ceros? Lo primero será decidir qué son valores nulos y que no son valores nulos para nuestra aplicación

Y una vez decidido qué queremos conservar y qué no, tenemos estrategias similares pero con matices:

```js
const myArrRaw = ['existo 😎', '', null, undefined, 'también existo 😎😎', false, 0, NaN, , , , , ' ', 45]

// filter
console.log(myArrRaw.filter(el => el != null)) // ["existo 😎", "", "también existo 😎😎", false, 0, NaN, " "]
console.log(myArrRaw.filter(el => el !== null)) // ["existo 😎", "", undefined, "también existo 😎😎", false, 0, NaN, " "]

console.log(myArrRaw.filter(el => el != undefined)) // ["existo 😎", "", "también existo 😎😎", false, 0, NaN, " "]
console.log(myArrRaw.filter(el => el !== undefined)) // ["existo 😎", "", null, "también existo 😎😎", false, 0, NaN, " "]

console.log(myArrRaw.filter(el => el != '')) // ["existo 😎", null, undefined, "también existo 😎😎", NaN, " "]
console.log(myArrRaw.filter(el => el !== '')) // ["existo 😎", null, undefined, "también existo 😎😎", false, 0, NaN, " "]

// utilizar el mismo valor como true o false
console.log(myArrRaw.filter(el => el)) // ["existo 😎", "también existo 😎😎", " "]

// constructor Boolean, recibe el valor y devuelve el Boolean que aplique
console.log(myArrRaw.filter(Boolean)) // ["existo 😎", "también existo 😎😎", " "]

// constructor Number
console.log(myArrRaw.filter(Number)) // [45]

// constructor String
console.log(myArrRaw.filter(String)) // ["existo 😎", null, undefined, "también existo 😎😎", false, 0, NaN, " "]
```

Y en términos de velocidad, he comparado estas soluciones en [jsben](https://jsben.ch/) y las funciones más rápidas son un grupo de 4

```js
myArrRaw.filter(el => el != null) // 99% - 100%
myArrRaw.filter(el => el != undefined) // 98% - 98%
myArrRaw.filter(el => el) // 100% - 100%
myArrRaw.filter(Boolean) // 99% - 99%
```

Mientras que las otras son un poco más lentas

```js
myArrRaw.filter(el => el != '') // 86% - 86%
myArrRaw.filter(Number) // 79% - 76%
myArrRaw.filter(String) // 74% - 72%
```
