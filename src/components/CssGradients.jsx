import { createSignal } from 'solid-js'

const get_random_gradient = () => {
  // https://stackoverflow.com/questions/43193341/how-to-generate-random-pastel-or-brighter-color-in-javascript
  const randomColour = () => '#000000'.replace(/0/g, () => (~~(Math.random() * 16)).toString(16))
  const randomHSLA = () => `hsla(${~~(360 * Math.random())}, 100%,  65%, 1)`
  const randomAngle = () => Math.round(Math.random() * 360)
  return 'background: linear-gradient(' + randomAngle() + 'deg, ' + randomHSLA() + ', ' + randomHSLA() + ')'
}
const number_of_gradients = 20

export const Gradients = () => {
  const [gradients, setGradients] = createSignal([...Array(number_of_gradients)].map(el => get_random_gradient()))
  const refresh = () => setGradients([...Array(number_of_gradients)].map(el => get_random_gradient()))

  const copy_to_clipboard = async grad => {
    document.getElementById('refresh').style.background = grad.split(':')[1]
    await navigator.clipboard.writeText(grad)
  }

  return (
    <>
      <button
        onClick={refresh}
        id="refresh"
        trans
        class="w-full h-100px my-20px rounded-6px border-0 cursor-pointer font-roboto
        bg-[#fff] 
        shadow-[0px_10px_40px_-10px_#d4d4d470]
        border border-solid border-2 border-[hsla(0,0%,100%,0)]
          hover:border-[#C3C3C3]
          dark:hover:border-[#000]
          "
      >
        <span class="bg-[#515151] text-[#fff] text-lg py-5px px-10px font-thin">
          click para generar nuevos gradientes
        </span>
      </button>

      <div class="grid grid-cols-4 gap-20px center">
        {gradients().map(grad => (
          <div
            trans
            class="bg-[#fff] rounded-6px  p-10px
          shadow-[0px_10px_40px_-10px_#d4d4d470]
          border border-solid border-2 border-[hsla(0,0%,100%,0)]
          hover:border-[#C3C3C3]
          dark:hover:border-[#000]
          "
          >
            <div
              style={grad}
              class="rounded-2px border-0 w-100% h-150px cursor-pointer"
              onClick={e => copy_to_clipboard(grad)}
            ></div>
            <div class="text-[#959595] text-xs pt-10px" onClick={e => copy_to_clipboard(grad)}>
              {grad}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
