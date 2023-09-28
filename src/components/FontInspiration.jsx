import { createSignal, createEffect, onMount } from 'solid-js'

export const Fonts = () => {
  const [fonts, setFonts] = createSignal([{ family: 'Roboto' }])
  const [font, setFont] = createSignal()
  const [title, setTitle] = createSignal('Hey There')
  const [text, setText] = createSignal("Crusty butthole Gate keepers of hell pet me pet me don't pet me.")

  createEffect(() => {
    if (!font()) return
    if (typeof window !== 'undefined')
      window.WebFont.load({
        google: {
          families: [font()],
        },
      })
  })

  onMount(async () => {
    const googleFonts = await fetch(
      'https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=AIzaSyCdVaqGFp5FF9V6DamDfNCW2CgvVDAXbp0'
    )
    const gFonts = (await googleFonts.json()).items
    setFonts(gFonts)

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(e => {
          if (e.isIntersecting) setFont(e.target.dataset.fontfamily)
        })
      },
      {
        root: document.querySelector('#scrollArea'),
        rootMargin: '20px', // add a margin when it becomes triggered
        threshold: 0, // one pixel is visible, trigger
      }
    )

    fonts().forEach((el, i) => observer.observe(document.querySelector('#font' + i)))
  })

  return (
    <div responsive-divs>
      <h1>Explorador de fuentes de Google</h1>

      <div>{fonts().length} fuentes</div>
      <div class="grid grid-col-1">
        <input
          class="w-300px p-8px m-5px bg-[#efefef] border-0"
          id="title"
          placeholder="Hey There"
          onChange={event => setTitle(event.target.value)}
        ></input>
        <label htmlFor="title" class="text-sm pl-5px">[ título ]</label>
      </div>
      <div class=" mb-50px">
        <input
          class="w-full p-8px m-5px bg-[#efefef] border-0"
          id="text"
          placeholder="Crusty butthole Gate keepers of hell pet me pet me don't pet me."
          onChange={event => setText(event.target.value)}
        ></input>
        <label htmlFor="text" class="text-sm pl-5px">[ texto ]</label>
      </div>

      {fonts().length === 1 && <div class="">LEYENDO FUENTES ...</div>}

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-30px">
        {fonts().map((el, i) => (
          <div
            id={`font${i}`}
            class="items-center justify-center content-start grid grid-cols-1 gap-1 content-start
          rounded-6px p-2
          bg-[#fff] dark:bg-[#5a5a5a]
          shadow-[0px_10px_40px_-10px_#d4d4d470]
          border border-solid border-2 border-[#dededeff] dark:border-[#f87171]
          max-h-300px md:max-h-200px overflow-hidden
          "
            data-fontfamily={el.family}
            style={{ 'font-family': el.family }}
          >
            <h1 class="uppercase font-black m-0px text-[#f87171]">{title}</h1>
            <h3 class="uppercase font-black m-0px font-bold uppercase">{el.family}</h3>
            <p class="leading-tight m-0 text-[#626262] dark:text-[#dadada]">{text}</p>
            <div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={'https://fonts.google.com/specimen/' + el.family}
                class="text-sm text-[#ff6464] hover:text-[#1a1a1a] cursor-pointer font-normal"
              >
                [google font]
              </a>
              <div class=""></div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={'https://gwfh.mranftl.com/fonts/' + el.family}
                class="text-sm text-[#ff6464] hover:text-[#1a1a1a] cursor-pointer font-normal"
              >
                [helper]
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
