---
date: '2022-01-07'
title: 'Cómo contar los duplicados en un #array# en JavaScript'
---

Si tienes un array con elementos iguales, cómo los cuentas?

La solución es la que te imaginas, ir por el array e ir viendo si los valores son iguales o no, y la mejor manera de iterar un array y hacer "cosas" es con un `reduce`

Y en la iteración, "las cosas" que haremos será convertir el array en otro array donde pongamos el valor y el número de repeticiones

```js
const arr = [1, 3, 1, 2, 5, 2, 3, 4, 1, 2, 3, 4, 3]
const resultado = {
  1: 3,
  2: 3,
  3: 4,
  4: 2,
  5: 1,
}
```

Y para hacerlo, pues el `reduce` o alternativas

```js
// reduce
const arr = [1, 3, 1, 2, 5, 2, 3, 4, 1, 2, 3, 4, 3]
const resultado = arr.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {})
```

```js
// forEach
const arr = [1, 3, 1, 2, 5, 2, 3, 4, 1, 2, 3, 4, 3]
const resultado = {}
arr.forEach(el => (resultado[el] = resultado[el] + 1 || 1))
```

```js
// for..of
const arr = [1, 3, 1, 2, 5, 2, 3, 4, 1, 2, 3, 4, 3]
const resultado = {}
for (const el of arr) resultado[el] = resultado[el] + 1 || 1
```

Y si comparo las opciones en [perf.link](https://perf.link/#eyJpZCI6IjUxbDdpOHExMmZ0IiwidGl0bGUiOiJGaW5kaW5nIG51bWJlcnMgaW4gYW4gYXJyYXkgb2YgMTAwMCIsImJlZm9yZSI6ImNvbnN0IGFyciA9IFsxLDMsMSwyLDUsMiwzLDQsMSwyLDMsNCwzXSIsInRlc3RzIjpbeyJuYW1lIjoicmVkdWNlIiwiY29kZSI6ImNvbnN0IHJlc3VsdGFkbyA9IGFyci5yZWR1Y2UoKHByZXYsIGN1cikgPT4gKHByZXZbY3VyXSA9IChwcmV2W2N1cl0gKyAxIHx8IDEsIHByZXYpKSwge30pXG4iLCJydW5zIjpbNzgwMDAsNzMwMDAsMTM0MDAwLDE5NzAwMCw3NzAwMCwxNjAwMDAsNjAwMDAsMjcwMDAsMjg5MDAwLDIyOTAwMCw3ODAwMCwxMDAwLDE0MTAwMCwxNTEwMDAsMjY5MDAwLDExMTAwMCwyNTgwMDAsMTAwMCwzNzQwMDAsNDgwMDAwLDMyMTAwMCwxMDAwMDAsMTI1MDAwLDE2NDAwMCwzNjAwMCwyODYwMDAsMzAwMDAsNTYwMDAsMTUzMDAwLDIwNTAwMCwxMjkwMDAsMzcxMDAwLDMzMzAwMCwyNTEwMDAsMzg4MDAwLDMyMzAwMCw0MDAwLDE2MTAwMCwyNjkwMDAsNDUwMDAwLDI1ODAwMCwxMzEwMDAsNDE1MDAwLDQxNDAwMCwyNDEwMDAsNTEwMDAsMTQ3MDAwLDk1MDAwLDEwMjAwMCwxMDAwLDI5OTAwMCw0NTgwMDAsMzMzMDAwLDEwMDAsMzE3MDAwLDQyMjAwMCwxMDUwMDAsNjMwMDAsNDk3MDAwLDE0NjAwMCw0ODAwMCwxOTkwMDAsMzAyMDAwLDEzMTAwMCwzMDEwMDAsMjgyMDAwLDI2MTAwMCwyMjIwMDAsMjcwMDAwLDIwMTAwMCwzNDkwMDAsOTQwMDAsNTEwMDAsNTQwMDAsMTAwMCwxNjAwMDAsMzM2MDAwLDM4MTAwMCwyNzAwMCwyNDMwMDAsMTgxMDAwLDU1MDAwLDkwMDAsMzYwMDAwLDIwMzAwMCwzMjcwMDAsNDg2MDAwLDE5MDAwMCw0MDUwMDAsNzQwMDAsMzEwMDAwLDUwMDAwLDE4NjAwMCw2NTAwMCwxNDAwMCwyNTcwMDAsMjIwMDAsMTIwMDAsMTM4MDAwLDMzOTAwMF0sIm9wcyI6MTk0MzUwfSx7Im5hbWUiOiJmb3JFYWNoIiwiY29kZSI6ImNvbnN0IHJlc3VsdGFkbyA9IHt9XG5hcnIuZm9yRWFjaChlbCA9PiAocmVzdWx0YWRvW2VsXSA9IHJlc3VsdGFkb1tlbF0gKyAxIHx8IDEpKSIsInJ1bnMiOlsxMTMwMDAsMjU3MDAwLDI4MDAwMCwxMDAwLDc1MDAwLDEyNzAwMCw5MDAwMCwxNTgwMDAsNTAwMDAsNTAwMDAsNTQwMDAsMTAwMCwwLDM4MDAwLDEyNjAwMCw4NTAwMCwxODIwMDAsMTUzMDAwLDU4NTAwMCw2NTYwMDAsNzE3MDAwLDY3MjAwMCwyMjAwMDAsNjI2MDAwLDkzMDAwLDIzNzAwMCwyNjAwMCwxMDAwLDU5ODAwMCwxNDAwMDAsMzcyMDAwLDgxMDAwLDM1ODAwMCw1MTAwMCwzMTgwMDAsMjkwMDAwLDU4NzAwMCwxMDAwLDI0ODAwMCw1MzUwMDAsMzM5MDAwLDEzNTAwMCw1MDUwMDAsMzQ3MDAwLDQ3ODAwMCwxMjAwMCwxMDkwMDAsMzAwMDAsMjcwMDAsMTAwMCwzMzcwMDAsNDYwMDAwLDEwMDAwMCwzODMwMDAsNTA5MDAwLDM4NjAwMCw2NDkwMDAsNDA5MDAwLDU3ODAwMCwzMDYwMDAsMTU2MDAwLDM0NjAwMCwyNzQwMDAsMzA4MDAwLDQyMTAwMCw2MzcwMDAsMjY2MDAwLDI4NDAwMCwzNTUwMDAsMjEzMDAwLDI5NzAwMCwyMjAwMDAsOTAwMDAsMTUyMDAwLDUxMDAwLDk1MDAwLDM4ODAwMCwxMTUwMDAsNDM0MDAwLDE3ODAwMCw1MTIwMDAsNTQxMDAwLDMwMTAwMCw1MTQwMDAsNDI1MDAwLDU1NjAwMCwyMzIwMDAsOTAwMDAsMjIzMDAwLDcxMDAwLDQwNzAwMCwyMjcwMDAsNjcwMDAsMTM2MDAwLDU5NjAwMCw2MzEwMDAsMzcwMDAsNDYwMDAsMjQ0MDAwLDQzMjAwMF0sIm9wcyI6MjY5MjAwfSx7Im5hbWUiOiIgZm9yLi5vZiIsImNvZGUiOiJjb25zdCByZXN1bHRhZG8gPSB7fVxuZm9yIChjb25zdCBlbCBvZiBhcnIpIHJlc3VsdGFkb1tlbF0gPSByZXN1bHRhZG9bZWxdICsgMSB8fCAxIiwicnVucyI6WzE3NDAwMCwyMDEwMDAsMzAwMCwyMTkwMDAsMjUwMDAwLDQwMDAsMzUwMDAsMzAwMCwyNTIwMDAsMTMxMDAwLDIzNjAwMCwxMjcwMDAsMjQ2MDAwLDEzNDAwMCwxNDAwMCwyMDAwMCw1OTAwMCwyMDAwMCwxNzgwMDAsMTQwMDAwLDQzMDAwLDUyOTAwMCwyNjgwMDAsNTkwMDAsNTYyMDAwLDMxMjAwMCwzNDAwMDAsNTEyMDAwLDYxMDAwLDU3MTAwMCwzMDAwMDAsMjYyMDAwLDQ1MDAwLDI2MzAwMCw1NTAwMCw2MjIwMDAsMTAwMCwzNTQwMDAsMTA3MDAwLDkwMDAwLDExMzAwMCwyMjEwMDAsMzQwMDAwLDEwMjAwMCw5MDAwLDI2NTAwMCw0NDkwMDAsNTA2MDAwLDQyMTAwMCw1MzIwMDAsMzQwMDAwLDc2MDAwLDIxNzAwMCwyMjcwMDAsOTgwMDAsMTIzMDAwLDM0MDAwMCwyMTIwMDAsMzQwMDAwLDEzMDAwMCwyNTAwMCwyMTgwMDAsMjAyMDAwLDE3NzAwMCw1MTAwMDAsMTE3MDAwLDM0MDAwMCw1NjYwMDAsMTM1MDAwLDU5NjAwMCwzMjEwMDAsMzQwMDAwLDE2MDAwMCwzNDAwMDAsMzAwMCwyNjQwMDAsMTM4MDAwLDQzMDAwLDMyMTAwMCw4NTAwMCw2NDYwMDAsMTQ1MDAwLDIzMDAwLDM0MDAwMCw3NTAwMCw5MzAwMCwxNjUwMDAsNTE3MDAwLDc2MDAwLDM0MDAwMCwzNDAwMDAsMzAwMCwyOTUwMDAsMTE2MDAwLDYwNDAwMCwxNzIwMDAsODUwMDAsMzY1MDAwLDU0ODAwMCw0ODAwMF0sIm9wcyI6MjI3NjAwfV0sInVwZGF0ZWQiOiIyMDIyLTAxLTA3VDE4OjMyOjA5LjgwOVoifQ%3D%3D) tengo que el más rápido es el `forEach` con 270K operaciones por segundo, seguido del `for..of` con 230K operaciones y por último el `reduce` con 200K operaciones

Quizá es porque el `forEach` ejecuta en paralelo todas las iteraciones, y hoy en día las cpu's están optimizadas para esto?

\*En el primer ejemplo con el `reduce` nos aseguramos de devolver el valor de `prev` porque utilizamos la expresión `(x, y)`, con esta expresión aparte de ejecutar las dos partes, siempre devuelve la de la derecha, lo puedes leer en el [comma operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_Operator))
