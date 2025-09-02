<template>
  <div
    id="vimeo-gallery"
    ref="vimeowrap"
  >
    <template v-if="loading">
      <div
        v-for="n in props.vimeoIds.length"
        :key="n"
        class="video-card skeleton"
      >
        <div class="skeleton-thumb" />
        <div class="skeleton-title" />
      </div>
    </template>
    <template v-else-if="vMetaData.length > 0">
      <div
        v-if="partialMissing"
        class="video-note"
        role="status"
        aria-live="polite"
      >
        Algunos vídeos no están disponibles.
      </div>
      <a
        v-for="(vMeta, index) in vMetaData"
        :key="index"
        class="video-card"
        :href="`https://vimeo.com/${vMeta.video_id}`"
        :data-src="`https://vimeo.com/${vMeta.video_id}`"
        :data-sub-html="subHtml(vMeta)"
      >
        <img
          width="500"
          height="300"
          :src="`https://vumbnail.com/${vMeta.video_id}_large.jpg`"
          :alt="vMeta.title"
        >
        <div class="video-title-overlay">
          <h3>{{ vMeta.title }}</h3>
        </div>
      </a>
    </template>
    <template v-else>
      <div
        class="video-error"
        role="status"
      >
        No se pudieron cargar los vídeos ahora mismo.
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import lightGallery from 'lightgallery'
import lgVideo from 'lightgallery/plugins/video/lg-video.umd.js'
import lgThumbnail from 'lightgallery/plugins/thumbnail/lg-thumbnail.umd.js'

type VimeoVideo = {
  type: 'video'
  version: string
  provider_name: string
  provider_url: string
  title: string
  author_name: string
  author_url: string
  is_plus: string
  account_type: string
  html: string
  width: number
  height: number
  duration: number
  description: string
  thumbnail_url: string
  thumbnail_width: number
  thumbnail_height: number
  thumbnail_url_with_play_button: string
  upload_date: string
  video_id: number
  uri: string
}

// Defer adding Vimeo player script until at least one playable item exists
const vimeoScriptAdded = ref(false)

type LgGalleryItem = {
  src: string
  thumb?: string
  poster?: string
  subHtml?: string
}

const props = defineProps<{
  vimeoIds: string[]
}>()

const vMetaData = ref<VimeoVideo[]>([])
const loading = ref(true)
let galleryInstance: ReturnType<typeof lightGallery> | null = null
const vimeowrap = ref<HTMLElement | null>(null)

// Escape potentially unsafe characters to prevent XSS when injecting into plugin HTML
const escapeHtml = (input: string): string =>
  input
    .replaceAll(/&/g, '&amp;')
    .replaceAll(/</g, '&lt;')
    .replaceAll(/>/g, '&gt;')
    .replaceAll(/"/g, '&quot;')
    .replaceAll(/'/g, '&#39;')

const subHtml = (v: Pick<VimeoVideo, 'title' | 'video_id'>): string => {
  const safeTitle = escapeHtml(v.title ?? '')
  const id = String(v.video_id)
  const url = `https://vimeo.com/${id}`
  return `<h3>${safeTitle}</h3><p><a target="_blank" rel="noopener" href="${url}">${url}</a></p>`
}
const buildDynamicEl = (): LgGalleryItem[] =>
  vMetaData.value.map((v) => {
    const id = String(v.video_id)
    const src = `https://vimeo.com/${id}`
    const thumb = `https://vumbnail.com/${id}_large.jpg`
    return { src, thumb, poster: thumb, subHtml: subHtml(v) }
  })

let clickHandler: ((e: Event) => void) | null = null

const initGallery = () => {
  if (!vimeowrap.value) return
  galleryInstance = lightGallery(vimeowrap.value, {
    speed: 500,
    plugins: [lgVideo, lgThumbnail],
    dynamic: true,
    dynamicEl: buildDynamicEl(),
    videojs: true,
    download: false,
    subHtmlSelectorRelative: true,
    licenseKey: '0',
    mobileSettings: {
      controls: true,
      showCloseIcon: true,
      download: false,
    },
  })

  // Delegate click to open the correct index in dynamic mode
  clickHandler = (e: Event) => {
    const target = e.target as HTMLElement | null
    if (!target || !vimeowrap.value || !galleryInstance) return
    const anchor = target.closest('a.video-card') as HTMLAnchorElement | null
    if (!anchor || !vimeowrap.value.contains(anchor)) return
    // Allow default behavior for new-tab/middle click
    if (e instanceof MouseEvent && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1)) {
      return
    }
    e.preventDefault()
    const anchors = Array.from(vimeowrap.value.querySelectorAll('a.video-card'))
    const index = anchors.indexOf(anchor)
    if (index >= 0) {
      galleryInstance.openGallery(index, anchor)
    }
  }
  vimeowrap.value.addEventListener('click', clickHandler)
}

// Retries per ID (transient only)
const retryAttempts = 1

// Simple in-memory cache shared for the lifetime of this SPA session
type GlobalWithCache = typeof globalThis & {
  __vimeoOEmbedCache?: Map<string, VimeoVideo | null>
  __vimeoOEmbedInflight?: Map<string, Promise<VimeoVideo | null>>
}
const g = globalThis as GlobalWithCache
const vimeoCache = g.__vimeoOEmbedCache ||= new Map<string, VimeoVideo | null>()
const vimeoInflight = g.__vimeoOEmbedInflight ||= new Map<string, Promise<VimeoVideo | null>>()

const fetchWithTimeout = async (url: string, opts: RequestInit & { timeout?: number } = {}): Promise<Response> => {
  const { timeout = 6000, ...init } = opts
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  try {
    return await fetch(url, { ...init, signal: controller.signal })
  }
  finally {
    clearTimeout(id)
  }
}

const getOEmbed = async (id: string): Promise<VimeoVideo | undefined> => {
  // 1) Memory cache
  if (vimeoCache.has(id)) {
    const cached = vimeoCache.get(id)
    return cached ?? undefined
  }
  // 2) In-flight request de-duplication
  const inflight = vimeoInflight.get(id)
  if (inflight) {
    const res = await inflight
    return res ?? undefined
  }
  // 3) Fetch with transient-only retry
  const req = (async (): Promise<VimeoVideo | null> => {
    const url = `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${id}`
    let attempts = 0
    while (true) {
      attempts++
      try {
        const res = await fetchWithTimeout(url, { timeout: 6000 })
        if (!res.ok) {
          if ([400, 401, 403, 404, 422].includes(res.status)) {
            return null
          }
          if (attempts <= retryAttempts && ([408, 429].includes(res.status) || (res.status >= 500 && res.status <= 599))) {
            await new Promise(r => setTimeout(r, 400))
            continue
          }
          return null
        }
        return await res.json() as VimeoVideo
      }
      catch (err: unknown) {
        const isAbort = typeof err === 'object' && err !== null && 'name' in err && (err as { name?: string }).name === 'AbortError'
        const isNetwork = err instanceof TypeError
        if ((isAbort || isNetwork) && attempts <= retryAttempts) {
          await new Promise(r => setTimeout(r, 400))
          continue
        }
        return null
      }
    }
  })()
  vimeoInflight.set(id, req)
  const result = await req
  vimeoInflight.delete(id)
  vimeoCache.set(id, result)
  return result ?? undefined
}

const partialMissing = computed(() => vMetaData.value.length > 0 && vMetaData.value.length < props.vimeoIds.length)

const getVideoVideosInfo = async (vimeoIds: string[]): Promise<void> => {
  const ordered: Array<VimeoVideo | undefined> = Array(vimeoIds.length).fill(undefined)

  await Promise.allSettled(
    vimeoIds.map(async (id, index) => {
      const data = await getOEmbed(id)
      if (data) {
        ordered[index] = data
        const items = ordered.filter((o): o is VimeoVideo => o !== undefined)
        vMetaData.value = items

        if (items.length === 1 && loading.value) {
          loading.value = false
          nextTick(() => {
            if (!galleryInstance && vMetaData.value.length) {
              initGallery()
            }
          })
        }
      }
    }),
  )

  if (loading.value) {
    loading.value = false
  }
  nextTick(() => {
    if (vMetaData.value.length) {
      if (galleryInstance) galleryInstance.refresh(buildDynamicEl())
      else initGallery()
    }
  })
}

onMounted(async () => {
  await getVideoVideosInfo(props.vimeoIds)
})

// Load Vimeo player script only when there is at least one playable item
watch(
  () => vMetaData.value.length,
  (len) => {
    if (len > 0 && !vimeoScriptAdded.value) {
      vimeoScriptAdded.value = true
      useHead({
        script: [{
          src: 'https://player.vimeo.com/api/player.js',
          defer: true,
          async: true,
        }],
      })
    }
  },
)

onUnmounted(() => {
  if (galleryInstance) {
    galleryInstance.destroy()
  }
  if (vimeowrap.value && clickHandler) {
    vimeowrap.value.removeEventListener('click', clickHandler)
  }
})
</script>

<style lang="scss">
@import "lightgallery/css/lightgallery.css";
@import "lightgallery/css/lg-video.css";
@import "lightgallery/css/lg-thumbnail.css";
@import "~/assets/css/ls.css";

#vimeo-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  padding: 24px 0;

  .video-note {
    grid-column: 1 / -1;
    color: #bbb;
    font-size: 0.95rem;
    padding: 4px 2px 8px 2px;
  }

  .video-card {
    position: relative;
    display: flex;
    flex-direction: column;
    aspect-ratio: 16/9;
    background: #181818;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(0,0,0,0.18), 0 1.5px 6px rgba(0,0,0,0.12);
    transition: transform 0.2s, box-shadow 0.2s;

    &.skeleton {
      animation: pulse 1.2s infinite ease-in-out;
      align-items: center;
      justify-content: center;
      background: #232323;
    }

    .skeleton-thumb {
      width: 100%;
      height: 70%;
      background: #333;
      border-radius: 16px 16px 0 0;
    }
    .skeleton-title {
      width: 60%;
      height: 18px;
      margin: 18px auto 0 auto;
      background: #333;
      border-radius: 6px;
    }

    &:hover {
      transform: translateY(-6px) scale(1.02);
      box-shadow: 0 8px 32px rgba(0,0,0,0.24), 0 3px 12px rgba(0,0,0,0.18);
      img {
        filter: brightness(85%) blur(0.5px);
      }
      .video-title-overlay {
        background: rgba(0,0,0,0.35);
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(55%);
      transition: filter 0.3s;
      border-radius: 16px 16px 0 0;
      flex: 1 1 auto;
    }

    .video-title-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,0.18);
      transition: background 0.3s;
      pointer-events: none;

      h3 {
        color: #fff;
        font-size: 2rem;
        font-weight: 400;
        text-shadow: 0 2px 8px rgba(0,0,0,0.5);
        margin: 0 24px;
        line-height: 1.2;
        text-align: center;
      }
    }
  }
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
}

@media only screen and (max-width: 600px) {
  #vimeo-gallery {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 6px 0;
  }
  .video-card {
    aspect-ratio: 16/9;
    border-radius: 10px;
  }
  .video-card .video-title-overlay h3 {
    font-size: 1rem;
    margin: 0 6px;
  }
}
</style>
