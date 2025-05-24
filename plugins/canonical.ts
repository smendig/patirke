import { useHead, useRuntimeConfig, useRoute, watch } from '#imports'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const route = useRoute()

  watch(
    () => route.fullPath,
    (fullPath) => {
      useHead({
        link: [
          {
            rel: 'canonical',
            href: `${config.public.siteUrl}${fullPath}/`,
          },
        ],
      })
    },
    { immediate: true },
  )
})
