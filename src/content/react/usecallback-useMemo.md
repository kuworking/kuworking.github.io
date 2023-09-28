---
date: '2021-12-08'
title: 'Qué es y cómo utilizar el React hook #useCallback# y el #useMemo#, y su parecido con #useState#'
---

El `useCallback` junto con el `useMemo` son _hooks_ que nos permiten optimizar nuestra aplicación

Es decir, con `useCallback` estamos **optimizando**, y aquí siempre aplica una norma general:

- Por defecto nunca hay que optimizar nada, solo cuando nos surja la necesidad

Por lo tanto, si nunca te has cruzado con estos dos hooks es porque nunca has tenido la necesidad de optimizar tu código, o quizá porque nunca has pensado que fuera necesario

Si no es necesario, no optimices por optimizar

Y si tienes claro que quieres optimizar, vamos a ver las diferencias entre `useMemo` y `useCallback`

En los dos casos, los dos hooks nos permiten memorizar elementos para evitar estar recalculándolos a cada rerenderizado

La diferencia es sutil pero importante:

- `useCallback` nos memoriza la función
- `useMemo` nos memoriza la función y el argumento, es decir nos memoriza el valor

Puede parecer que sirven para más o menos lo mismo, pero difieren bastante por una sencilla razón:

Normalmente, lo "costoso" será calcular el valor, no la función, por lo que `useCallback` dificilmente proporcionará una optimización significativa

Por lo tanto, lo suyo será memorizar el cálculo de un valor concreto con `useMemo`, allí es donde optimizaremos el código simplemente evitando repetir el cálculo

Esto es útil si nos interesa memorizar el valor, claro

Ejemplo:

```jsx
import React, { useState, useMemo, useCallback } from 'react'

export const App = () => {
  const [counter1, setCounter1] = useState(1)
  const [counter2, setCounter2] = useState(1)
  const [counter3, setCounter3] = useState(1)

  const set1 = () => setCounter1(prev => prev + 1)
  const set2 = useMemo(() => setCounter2(prev => prev + 1), [])
  const set3 = useCallback(() => setCounter2(prev => prev + 1), [])

  return (
    <div>
      <div>
        <button onClick={set1}>Contador {counter1}</button>
      </div>
      <div>
        <button onClick={set2}>Contador useMemo {counter2}</button>
      </div>
      <div>
        <button onClick={set3}>Contador useCallback {counter3}</button>
      </div>
    </div>
  )
}

export default App // esto es para codesandbox
```

Y con esto puedes ver lo siguiente:

- El contador con el `useMemo` empieza en 2, porque ya ha ejecutado una suma

- Cuando aprietas el botón, el valor de `useMemo` no se mueve porque el valor no se recalcula

- Con el `useCallback` el valor se calcula como esperarías ya que sólo se ha memorizado la función

Con esto, si el `useCallback` no sirve para optimizar de forma significativa, para qué se utiliza?

Para evitar rerenders específicos

Lo vemos mejor con este código

```jsx
import React, { useState, useCallback, useEffect } from 'react'

export const App = () => {
  const [counter1, setCounter1] = useState(1)
  const [counter2, setCounter2] = useState(1)

  const sum1 = () => setCounter1(prev => prev + 1)
  const sum2 = useCallback(() => setCounter2(prev => prev + 1), [])

  useEffect(() => {
    console.log('repainted 1')
    setCounter1(prev => prev + 1)
  }, [sum1])

  useEffect(() => {
    console.log('repainted 2')
    setCounter2(prev => prev + 1)
  }, [sum2])

  return (
    <div>
      <div>
        <button onClick={sum1}>{counter1}</button>
      </div>
      <div>
        <button onClick={sum2}>{counter2}</button>
      </div>
    </div>
  )
}

export default App // esto es para codesandbox
```

El problema con este código es que causa un bucle infinito

cada vez que apretamos un botón `App` se repinta y la función `sum1` y `sum2` se vuelven a definir

En verdad, `sum2` no se vuelve a definir porque hemos utilizado `useCallback`

De algun modo es lo mismo que utilizar `useState`, para React `counter1`, `counter2` y `sum2` no se vuelven a definir a cada repintada

Pero `sum1` sí se vuelve a definir

Y como se vuelve a definir, el `useEffect` que depende de `sum1` se ejecuta

Y al ejecutarse vuelve a cambiar `sum1`

Y al volver a cambiar `sum1`, `App` vuelve a repintarse

Y vuelta a empezar con un bucle infinito

En este caso, `useCallback` nos sirve para definir funciones del mismo modo que utilizamos `useState` para definir variables persistentes
