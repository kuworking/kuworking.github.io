---
date: '2021-12-08'
title: 'Diferencia en React entre montar y renderizar'
---

En React, por renderizado se entiende el construir los componentes y presentarlos, y por montaje se entiende la inserción de los componentes en el DOM

Y lo importante, cuando un componente ya está **montado**, éste puede renderizarse tantas veces como quiera

Montar es lo caro, renderizar es lo barato, y React para decidir si algo tiene/puede rerenderizarse o tiene que montarse/desmontarse utiliza la **reconciliación**(proceso interno donde va comparando el DOM con su virtual DOM)

La importancia de esto es relativa en el sentido que podemos confiar con que React hará lo más adecuado y seguir a lo nuestro

Pero puede haber casos donde este comportamiento pueda derivarse en errores

Esto es, cuando un rerender o un remount nos afecta a un estado de un modo que no habíamos previsto

Lo vemos en este ejemplo, vamos a poner un `input` para añadir texto en una lista, y el texto lo guardaremos en un estado

Haremos esto con dos listas, y pondremos también un botón para cambiar el color de las listas y otro para esconder una de estas listas

Cuando cambiemos el color haremos un rerenderizado de las listas, y cuando la escondamos haremos un desmontaje / montaje de esa lista

Qué pasará con sus estados?

```jsx
import React, { useRef, useState } from 'react'

export const App = () => {
  const [color, setColor] = useState('#f00')
  const [show, setShow] = useState(true)

  const [links, setLinks] = useState([])
  const [todo, setTodo] = useState([])

  const linksRef = useRef()
  const todoRef = useRef()

  const addLink = () => setLinks(prev => [linksRef.current.value, ...prev])
  const addTodo = () => setTodo(prev => [todoRef.current.value, ...prev])

  const ButtonTodo = ({ color }) => (
    <button style={{ background: color }} onClick={addTodo}>
      <span role="img" aria-label="emoji">
        ✏️
      </span>
    </button>
  )
  const ButtonLink = ({ color }) => (
    <button style={{ background: color }} onClick={addLink}>
      <span role="img" aria-label="emoji">
        ✏️
      </span>
    </button>
  )

  return (
    <div>
      <div>
        <div>
          show/hide TODO <button onClick={() => setShow(prev => !prev)}>CLICK</button>
        </div>
        <div>
          switch color<button onClick={() => setColor(prev => (prev === '#f00' ? '#ccc' : '#f00'))}>CLICK</button>
        </div>
      </div>
      <div>
        <span>LINKS</span>
        <input ref={linksRef} />
        <ButtonLink color={color} />
        <div>
          {links.map((el, i) => (
            <div key={`link${i}`}>{el}</div>
          ))}
        </div>
      </div>
      {show && (
        <div>
          <span>TODO</span>
          <input ref={todoRef} />
          <ButtonTodo color={color} />
          <div>
            {todo.map((el, i) => (
              <div key={`todo${i}`}>{el}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

Este código funciona como esperamos, los estados se mantienen y todos somos felices

Pero y si quiero eliminar redundancia y hago un componente más abstracto, con un único estado?

```jsx
import React, { useRef, useState } from 'react'

const List = ({ name, color }) => {
  const [list, setList] = useState([])
  const listRef = useRef()

  const addItem = () => setList(prev => [listRef.current.value, ...prev])

  const Button = ({ color }) => (
    <button style={{ background: color }} onClick={addItem}>
      <span role="img" aria-label="emoji">
        ✏️
      </span>
    </button>
  )

  return (
    <div>
      <span>{name}</span>
      <input ref={listRef} />
      <Button color={color} />
      <div>
        {list.map((el, i) => (
          <div key={`item${name}${i}`}>{el}</div>
        ))}
      </div>
    </div>
  )
}

export const App = () => {
  const [color, setColor] = useState('#f00')
  const [show, setShow] = useState(true)

  return (
    <div>
      <div>
        <div>
          show/hide TODO <button onClick={() => setShow(prev => !prev)}>CLICK</button>
        </div>
        <div>
          switch color
          <button onClick={() => setColor(prev => (prev === '#f00' ? '#ccc' : '#f00'))}>CLICK</button>
        </div>
      </div>

      <List color={color} name="LINKS" />
      {show && <List color={color} name="TODO" />}
    </div>
  )
}
```

En principio todo debería seguir igual

Pero no

Al utilizar un mismo componente (reutilizado 2 veces, en lugar de 2 componentes independientes) cuando se monta/desmonta (al esconderlo) esto afecta a la otra instancia del componente

El ejemplo no tiene más, pero sirve para ver las implicaciones de renderizar y montar componentes
