import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
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
      ],
    },
    buildAssetsDir: '/assets/',
  },
  runtimeConfig: {
    public: {
      siteUrl: 'https://patirke.com',
    },
  },
  compatibilityDate: '2025-05-21',
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
})
