---
date: '2021-12-08'
title: 'Event Bubbling y el descontrol en JavaScript | React'
---

Para entender el concepto de bubbling, hay que hablar antes de los eventos

Los eventos son la manera que tenemos de monitorizar el comportamiento de nuestros usuarios, por ejemplo al detectar cuando se hace click en un botón

Para capturar esos eventos se utilizan los _listeners_, con la siguiente estructura

```js
el.addEventListener(event, () => {})
```

Donde en este caso el `event` será del tipo `click`

```js
const el = document.getElementById('mi_boton')
el.addEventListener('click', () => {
  console.log('elemento clicado!')
})
```

Dicho esto, el _bubbling_ y el _capturing_ ocurre cuando esos eventos se propagan, por ejemplo aquí que tienes un botón dentro de otro botón y dentro de un `div`:

```html
<div id="mi_div">
  <button id="mi_boton_1">
    Boton 1
    <button id="mi_boton_2">Boton 2</button>
  </button>
</div>
```

```js
document.getElementById('mi_boton_1').addEventListener('click', () => console.log('boton 1 clicado!'))
document.getElementById('mi_boton_2').addEventListener('click', () => console.log('boton 2 clicado!'))
document.getElementById('mi_div').addEventListener('click', () => console.log('div clicado!'))
```

Si aprietas el botón 2, tendrás un evento del botón 2, luego uno del botón 1, y luego otro del div, y esto es el _bubbling_

En realidad no porque los botones no pueden estar [anidados](https://stackoverflow.com/questions/39386497/can-i-nest-button-inside-another-button), pero se entiende el concepto

Lo contrario del _bubbling_ es el `capturing`, es decir, es lo mismo pero el evento va en la dirección opuesta, nace en el elemento más general y se va propagando hasta llegar al elemento original

Eso solo ocurre si lo especificamos en el _listener_

```js
document.getElementById('mi_boton_1').addEventListener('click', () => console.log('boton1 clicado!'), { capture: true })
document.getElementById('mi_boton_2').addEventListener('click', () => console.log('boton2 clicado!'), { capture: true })
document.getElementById('mi_div').addEventListener('click', () => console.log('div clicado!'), { capture: true })
```

Pero quién quiere esto? Ni idea, lo habitual es evitar el _bubbling_ de la siguiente manera:

```js
document.getElementById('mi_boton_1').addEventListener('click', e => {
  e.stopPropagation()
  console.log('boton 1 clicado!')
})
document.getElementById('mi_boton_2').addEventListener('click', e => {
  e.stopPropagation()
  console.log('boton 2 clicado!')
})
document.getElementById('mi_div').addEventListener('click', e => {
  e.stopPropagation()
  console.log('div clicado!')
})
```

Y si te preguntas cómo hacer esto en `React`, pues sería así

```jsx
import React, { useRef } from 'react'

const log = (e, msg) => {
  e.stopPropagation()
  console.log(msg)
}

export const App = () => {
  const div = useRef()
  const button = useRef()

  return (
    <div ref={div} onClick={e => log(e, 'yo también!')}>
      <h1>Hola</h1>
      <button ref={button} onClick={e => log(e, 'clicando!')}>
        clica!
      </button>
    </div>
  )
}

export default App
```
