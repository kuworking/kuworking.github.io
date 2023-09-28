---
date: '2021-12-08'
title: 'forEach y map con await y async en #JavaScript#'
---

Es importante saber que un `forEach` no funciona igual que un `for`, en concreto cuando lidiamos con funciones `async / await`

Lo normal cuando utilizamos un `await` es esperar que las funciones, precisamente, se esperen

```js
// función que implementa un wait con promesas
const wait = ms => new Promise((r, j) => setTimeout(r, ms))

// función que emula un proceso asíncrono
const fetchUrl = async url => {
  await wait(1000)
  return 'fantastic ' + url
}

// aquí vamos a hacer ver que pedimos 3 webs, y lo hacemos con un loop for .. of
const fetching = async () => {
  const urls = ['https://www.site1.com', 'https://www.site2.com', 'https://www.site3.com']

  for (const url of urls) {
    const data = await fetchUrl(url)
    console.log(data)
  }
}

fetching()
```

En este loop las cosas funcionan como queremos, un `console.log` a cada segundo

Pero si lo reescribimos en plan funcional:

```js
const wait = ms => new Promise((r, j) => setTimeout(r, ms))

const fetchUrl = async url => {
  await wait(1000)
  return 'fantastic ' + url
}

const fetching = () => {
  const urls = ['https://www.site1.com', 'https://www.site2.com', 'https://www.site3.com']

  urls.forEach(async url => {
    const data = await fetchUrl(url)
    console.log(data)
  })
}

fetching()
```

Tenemos los `console.log` que aparecen al instante y no a cada segundo

Esto ocurre porque `forEach` no se espera, lanza funciones independientes y luego esas funciones se ejecutan en paralelo, y lanza todas las funciones al momento (una función para cada ciclo del loop)

Lo puedes ver si añades un `log` que esperarías que saliese al final, pero sale al principio

```js
const wait = ms => new Promise((r, j) => setTimeout(r, ms))

const fetchUrl = async url => {
  await wait(5000) // ahora son 5 segundos
  return 'fantastic ' + url
}

const fetching = () => {
  const urls = ['https://www.site1.com', 'https://www.site2.com', 'https://www.site3.com']

  urls.forEach(async url => {
    const data = await fetchUrl(url)
    console.log(data)
  })

  console.log('hemos acabado') // sale al principio!
}

fetching()
```

Aquí el mensaje `hemos acabado` nos aparece inmediatamente, y a los 5 segundos nos aparecen los tres `fantastic ...` a la vez

Es decir, aquí no se bloquea nada

Para conseguir que haya un bloqueo tenemos que recurrir a `reduce`

```js
const wait = ms => new Promise((r, j) => setTimeout(r, ms))

const fetchUrl = async url => {
  await wait(1000)
  return 'fantastic ' + url
}

const fetching = async () => {
  const urls = ['https://www.site1.com', 'https://www.site2.com', 'https://www.site3.com']

  await urls.reduce(async (previousPromise, url) => {
    await previousPromise
    const data = await fetchUrl(url)
    console.log(data)
    return Promise.resolve()
  }, Promise.resolve())

  console.log('hemos acabado')
}

fetching()
```

`reduce` nos permite incrustar una función en cada ciclo del loop, por lo que podemos implementar una promesa y esperar a que se resuelva, y así bloquear el código como lo hacíamos en el `for..of` anterior

Pero el nivel de ofuscación es tal que te tiene que gustar mucho `reduce` para preferirlo al `for..of` de toda la vida (aunque no funcional)
