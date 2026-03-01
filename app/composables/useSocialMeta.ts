export const useSocialMeta = (options: { title: string, description: string, urlPath: string }) => {
  const { url: siteUrl } = useSiteConfig()

  // Clean trailing and leading slashes for the canonical URL
  const cleanPath = options.urlPath.startsWith('/') ? options.urlPath : `/${options.urlPath}`
  const fullUrl = `${siteUrl}${cleanPath === '/' ? '' : cleanPath}`

  useHead({
    title: options.title,
    meta: [
      { name: 'description', content: options.description },
      { property: 'og:title', content: `${options.title} - Patirke Mendiguren` },
      { property: 'og:description', content: options.description },
      { property: 'og:url', content: fullUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: `${siteUrl}/portada/patirke121.jpg` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${options.title} - Patirke Mendiguren` },
      { name: 'twitter:description', content: options.description },
      { name: 'twitter:image', content: `${siteUrl}/portada/patirke121.jpg` },
    ],
    link: [
      { rel: 'canonical', href: fullUrl },
    ],
  })
}
