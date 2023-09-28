// uno.config.ts
import { defineConfig, presetUno, presetAttributify, presetTypography, presetIcons, presetWebFonts } from 'unocss'

export default defineConfig({
  shortcuts: {
    'responsive-divs': 'max-w-fit px-[10px] mx-auto sm:max-w-[460px] md:max-w-[660px] lg:max-w-[860px]',
    'responsive-divs-narrow': 'max-w-fit px-[10px] mx-auto sm:max-w-[460px] md:max-w-[660px] lg:max-w-[700px]',
    'is-link': 'text-[--normal] hover:text-[--remark] dark:text-[--dark-normal] dark:hover:text-[--dark-remark] font-light no-underline',
    'is-special-link': 'text-[--remark] dark:text-[--dark-remark] hover:text-[#424242] dark:hover:text-[#AE7373] font-bold',
    'is-em': 'bg-[--remark] dark:bg-[--dark-remark] text-[--dark-normal] dark:text-[--normal]',
    'is-code': '',
    'trans': 'transition duration-150 ease-in-out'
  },
  theme: {
    breakpoints: {
      sm: '500px',
      md: '700px',
      lg: '900px',
    },
  },
  presets: [
    presetAttributify(), // required when using attributify mode
    presetUno(),
    presetTypography({
      cssExtend: {},
    }),
    presetIcons({
      /* options */
    }),
    presetWebFonts({
      provider: 'google', // default provider
      fonts: {
        // these will extend the default theme
        sans: 'Roboto',
        mono: ['Fira Code', 'Fira Mono:400,700'],
        // custom ones
        lobster: 'Lobster',
        roboto: [
          {
            name: 'Roboto',
            weights: ['300', '700', '900'],
          },
        ],
        bebas: 'Bebas Neue',
        urbanist: [
          {
            name: 'Urbanist',
            weights: ['400', '700', '900'],
          },
        ],
        lato: [
          {
            name: 'Lato',
            weights: ['400', '700'],
            italic: true,
          },
          {
            name: 'sans-serif',
            provider: 'none',
          },
        ],
      },
    }),
  ],
})
