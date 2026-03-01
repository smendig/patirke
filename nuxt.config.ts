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
    },
  },
  site: {
    url: 'https://patirke.com',
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
