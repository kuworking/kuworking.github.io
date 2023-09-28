---
date: '2021-12-08'
title: 'Cómo funciona  #substring#, #substr# y #slice# en JavaScript'
---

# Substring

Nos devuelve un nuevo _string_ que contiene el segmento que le especificamos

<!-- prettier-ignore -->
```js
const str = 'https://kuworking.github.io/'
let new_str
new_str = str.substring(8, 11) // -> www
new_str = str.substring(8) // -> kuworking.github.io/
new_str = str.substring(8, str.length - 1) // -> kuworking.github.io
new_str = str.substring(0, str.length - 1) // -> https://kuworking.github.io
new_str = str.substring(0, -1) // no funciona, no acepta números negativos
```

# Substr

En el caso de `substr` tienes lo mismo que `substring`, pero mientras antes especificábamos _inicio_ y _fin_, aquí especificamos _inicio_ y _número de carácteres a incluir_

<!-- prettier-ignore -->
```js
const str = 'https://kuworking.github.io/'
let new_str
new_str = str.substr(8, 3) // -> www
new_str = str.substr(8) // -> kuworking.github.io/
new_str = str.substr(8, 17) // -> kuworking.github.io
new_str = str.substr(0, 25) // -> https://kuworking.github.io
new_str = str.substr(0, -1) // no funciona, no acepta números negativos
```

Depende de qué quieras hacer, una opción nos simplificará la vida bastante más que la otra

En este caso, escoger _substr_ sería complicarse sin motivo

# Slice

`Slice` viene a ser lo mismo que `substring` con la diferencia de que aquí _sí_ se aceptan valores negativos

<!-- prettier-ignore -->
```js
const str = 'https://kuworking.github.io/'
let new_str
new_str = str.slice(8, 11) // -> www
new_str = str.slice(8) // -> kuworking.github.io/
new_str = str.slice(8, str.length-1) // -> kuworking.github.io
new_str = str.slice(0, str.length-1) // -> https://kuworking.github.io
new_str = str.slice(0, -1) // -> https://kuworking.github.io
new_str = str.slice(-4) // -> com/
```
