---
date: '2021-12-08'
title: 'Cómo copiar un #object# en JavaScript'
---

Copiar un `object` es algo que cuando queremos hacerlo es porque queremos una copia idéntica del objeto, pero independiente

Esa independencia no es fácil de conseguir porque lo que copiaremos serán referencias a variables, cuando lo que querríamos sería crear nuevas variables con los mismos valores

Para escenificarlo mira este código

```js
let myVar = 'hola'
let myVar2 = myVar
myVar = 'que tal'
console.log(myVar) // que tal
console.log(myVar2) // hola
```

Aquí pasan 2 cosas

- Cuanodo asignamos una variable primita a otra variable primitiva, nunca se asignan referencias, siempre se asignan valores, con lo que `myVar2` nunca contendrá una referencia a `myVar`, sino el valor que tenía en ese momento
- Cuando hacemos la segunda asignación `myVar = 'que tal'`, no estamos cambiando el valor del `string` que tenía la sino que estamos creando una nueva variable de tipo `string`

En cambio, si utilizamos cualquier estructura de datos (esto es, un valor no primitivo)

```js
let myVar = ['hola']
let myVar2 = myVar
myVar[0] = 'que tal'
console.log(myVar) // ['que tal']
console.log(myVar2) // ['que tal']
```

Aquí vuelven a pasar dos cosas

- Aquí `myVar2` sí que guarda la referencia de `myVar`, en lugar de almacenar su valor
- Y con la segunda asignación `myVar[0] = 'que tal'` aquí no estamos creando una nueva variable `myVar` sino que estamos modificando la variable

Esa variable `myVar[0]` sí que la estamos creando de nuevo, pero `myVar` se mantiene siendo la misma que la original

Entonces, la pregunta es, cómo puedo copiar estructuras y valores todo a la vez?

- Copia _simple_

```js
let myObj = { site: 'https://www.kuworking.com/' }
console.log(myObj.site) // https://www.kuworking.com/

let myObjCopy = myObj
console.log(myObjCopy.site) // https://www.kuworking.com/

myObj.site = 'https://www.mevoyaotropiso.com'
console.log(myObj.site) // https://www.mevoyaotropiso.com
console.log(myObjCopy.site) // https://www.mevoyaotropiso.com
```

- Copia _shallow_ (superficial)

Una copia _shallow_ nos dará un `object` que será una copia real en `myObj` y en `myObj.site`, pero más allá del primer nivel sólo serán referencias y por lo tanto `myObj.data.type` y `myObj.data.location` se referirán al objeto original

```js
let myObj = {
  site: 'https://www.kuworking.com/',
  data: {
    type: 'blog',
    location: 'barcelona',
  },
}
let myObjCopy = Object.assign({}, myObj)
myObjCopy.site = 'https://www.mevoyaotropiso.com'
myObjCopy.data.type = 'mudanza'

console.log(myObj)
console.log(myObjCopy)

/*
{
    "site": "https://www.kuworking.com/",  >___> NO ha cambiado
    "data": {
        "type": "mudanza",  >>>>> ha cambiado
        "location": "barcelona"
    }
}
{
    "site": "https://www.mevoyaotropiso.com",  >>>>> ha cambiado
    "data": {
        "type": "mudanza",  >>>>> ha cambiado
        "location": "barcelona"
    }
}
*/
```

- Copia _deep_

Para copiar _todo_ el objeto, esto quiere decir _todos_ los elementos contenidos en el objeto, lo idea sería tener una función dedicada para ello

Pero no la tenemos

Soluciones hay varias, desde hacer un `loop` recursivo hasta hacer lo que haremos en unas líneas

La primera opción te da la posibilidad de hacer una copia perfecta, incluyendo los _métodos_ que pudieras tener en el objeto

Podrías hacerlo vía librería tipo `loadash` o fabricándote una función tu mismo

O puedes hacer lo siguiente:

- convertir el objeto a texto, y luego volver a convertir el texto en objeto

De esta forma se pierden las referencias originales y se hace todo de nuevo, lo que equivale a hacer un `objet` totalmente nuevo, o lo que es lo mismo, un _deep clone_

Excepto los métodos, estos se pierden (si es que tienes)

Se hace con `JSON.stringify` y `JSON.parse`

```js
let myObj = {
  site: 'https://www.kuworking.com/',
  data: {
    type: 'blog',
    location: 'barcelona',
  },
}
let myObjCopy = JSON.parse(JSON.stringify(myObj))
myObjCopy.site = 'https://www.mevoyaotropiso.com'
myObjCopy.data.type = 'mudanza'

console.log(myObj)
console.log(myObjCopy)

/*
{
    "site": "https://www.kuworking.com/",
    "data": {
        "type": "blog",
        "location": "barcelona"
    }
}
{
    "site": "https://www.mevoyaotropiso.com",
    "data": {
        "type": "mudanza",
        "location": "barcelona"
    }
}
*/
```

Y efectivamente, ahora he cambiado todo el objeto-copia sin alterar el objeto-original

Si quieres intentar entender mejor si las variables en JavaScript se pasan por valor o por referencia puedes entretenerte con los comentarios en [stack overflow](https://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language)

En realidad siempre se pasan por valor, pero ese valor puede almacenar un (valor) primitivo o una referencia
