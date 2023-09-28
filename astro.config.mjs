import { defineConfig } from 'astro/config'
import solidJs from '@astrojs/solid-js'
import sitemap from '@astrojs/sitemap'
import UnoCSS from 'unocss/astro'
import compress from 'astro-compress'

// https://astro.build/config
export default defineConfig({
  // ...
  integrations: [
    solidJs(),
    sitemap(),
    compress(),
    UnoCSS({
      injectReset: '@unocss/reset/eric-meyer.css',
    }),
  ],
  site: 'https://kuworking.github.io',
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'nord',
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      // langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
  },
})
