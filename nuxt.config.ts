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
    },
    buildAssetsDir: '/assets/',
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
