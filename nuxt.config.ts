import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxtjs/sitemap', '@nuxt/image'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'es',
      },
      viewport: 'width=device-width, initial-scale=1',
      charset: 'utf-8',
      meta: [
        { property: 'og:title', content: 'Patirke Mendiguren - Actriz y Cantante' },
        { property: 'og:description', content: 'Portfolio oficial de Patirke Mendiguren, actriz y cantante.' },
        { property: 'og:image', content: 'https://patirke.com/portada/patirke121.jpg' },
        { property: 'og:url', content: 'https://patirke.com' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://patirke.com/portada/patirke121.jpg' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Metrophobic&family=Open+Sans:wght@300;400&display=swap' },
      ],
    },
  },
  site: {
    url: 'https://patirke.com',
  },
  runtimeConfig: {
    public: {
      siteUrl: 'https://patirke.com',
    },
  },
  compatibilityDate: '2025-09-02',
  nitro: {
    static: true,
    prerender: {
      crawlLinks: true,
    },
  },

  typescript: {
    strict: true,
    typeCheck: true,
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  image: {
    format: ['webp', 'jpeg'],
  },
})
