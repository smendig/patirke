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
      <a
        v-for="(vMeta, index) in vMetaData"
        :key="index"
        class="video-card"
        :href="`https://vimeo.com/${vMeta.video_id}`"
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

useHead({
  script: [{
    src: 'https://player.vimeo.com/api/player.js',
    defer: true,
    async: true,
  }],
})

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

const initGallery = () => {
  if (vimeowrap.value) {
    galleryInstance = lightGallery(vimeowrap.value, {
      speed: 500,
      plugins: [lgVideo, lgThumbnail],
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
  }
}

// Fetch with timeout support
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

// Basic retry once per ID to reduce flakiness
const fetchOEmbed = async (id: string, attempt = 1): Promise<VimeoVideo | undefined> => {
  const url = `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${id}`
  try {
    const res = await fetchWithTimeout(url, { timeout: 6000 })
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`)
    }
    return await res.json() as VimeoVideo
  }
  catch (err) {
    console.warn(`[LGVimeoWrap] Failed to fetch oEmbed for ${id} (attempt ${attempt})`, err)
    if (attempt < 2) {
      // brief backoff then retry once
      await new Promise(resolve => setTimeout(resolve, 500))
      return await fetchOEmbed(id, attempt + 1)
    }
    return undefined
  }
}

const getVideoVideosInfo = async (vimeoIds: string[]): Promise<VimeoVideo[]> => {
  const response = await Promise.all(vimeoIds.map(id => fetchOEmbed(id)))
  return response.filter((o): o is VimeoVideo => o !== undefined)
}

onMounted(async () => {
  vMetaData.value = await getVideoVideosInfo(props.vimeoIds)
  loading.value = false
  nextTick(() => {
    initGallery()
  })
})

onUnmounted(() => {
  if (galleryInstance) {
    galleryInstance.destroy()
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
