---
date: '2021-12-08'
title: 'React hook, #useEffect# o cómo domesticar los rerenders'
---

El `useEffect` es la manera que tenemos en `React` de controlar y decidir cuándo queremos que se ejecute un código concreto

Mejor lo vemos con un ejemplo

Vamos a introducir un `console.log()` en un componente que también tendrá un botón, y cada vez que lo apretemos actualizaremos un contador y esto obligará a `React` a renderizar el componente otra vez

Y cuando el componente se vuelva a renderizar, el `console.log` se volverá a ejecutar

```jsx
import React, { useState } from 'react'

const Button = () => {
  console.log('me estoy repintando')

  const [counter1, setCounter1] = useState(0)
  const [counter2, setCounter2] = useState(0)

  return (
    <div>
      <button onClick={() => setCounter1(prev => prev + 1)}>contador1: {counter1}</button>
      <button onClick={() => setCounter2(prev => prev + 1)}>contador2: {counter2}</button>
    </div>
  )
}

export default Button
```

Aquí, aprietes el botón que aprietes el `console.log` siempre se ejecuta porque todo el componente se repinta

La manera que tenemos de evitar que ese `console.log` se ejecute siempre es ponerlo dentro de un `useEffect`, y allí podremos especificar cuándo debe ejecutarse lo de dentro

```jsx
import React, { useState, useEffect } from 'react'

const Button = () => {
  useEffect(() => {
    console.log('dentro de useEffect')
  }, [])

  console.log('me estoy repintando')

  const [counter1, setCounter1] = useState(0)
  const [counter2, setCounter2] = useState(0)

  return (
    <div>
      <button onClick={() => setCounter1(prev => prev + 1)}>contador1: {counter1}</button>
      <button onClick={() => setCounter2(prev => prev + 1)}>contador2: {counter2}</button>
    </div>
  )
}

export default Button
```

Ahora verás que el `log` del useEffect sólo se ejecuta una vez al principio, y ya no se ejecuta más

En el array del `useEffect` del final (`, []`) es donde se especifica cuándo se ejecuta el código de dentro del `useEffect`

Y si no hay nada (como ahora), quiere decir que sólo se ejecuta una vez (al principio)

Para completar, vamos a especificar dos `logs` específicos de cada botón (en la práctica lo haríamos dentro de la propia función, pero es para ver el `useEffect`), que también se ejecutarán al principio

```jsx
import React, { useState, useEffect } from 'react'

const Button = () => {
  const [counter1, setCounter1] = useState(0)
  const [counter2, setCounter2] = useState(0)

  console.log('me estoy repintando')
  useEffect(() => {
    console.log('botón 1')
  }, [counter1])
  useEffect(() => {
    console.log('botón 2')
  }, [counter2])
  useEffect(() => {
    console.log('sólo al principio')
  }, [])

  return (
    <div>
      <button onClick={() => setCounter1(prev => prev + 1)}>contador1: {counter1}</button>
      <button onClick={() => setCounter2(prev => prev + 1)}>contador2: {counter2}</button>
    </div>
  )
}

export default Button
```
