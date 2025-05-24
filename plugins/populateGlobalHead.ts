import { useHead, useRuntimeConfig, useRoute, watch } from '#imports'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const route = useRoute()

  useHead({
    meta: [
      {
        name: 'robots',
        content: 'index, follow',
      },
    ],
  })

  watch(
    () => route.fullPath,
    (fullPath) => {
      useHead({
        link: [
          {
            rel: 'canonical',
            href:
            fullPath === '/'
              ? config.public.siteUrl
              : `${config.public.siteUrl}${fullPath}`,
          },
        ],
      })
    },
    { immediate: true },
  )
})
