<template>
  <div
    id="vimeo-gallery"
    ref="vimeowrap"
  >
    <template v-if="vMetaData.length === 0">
      <div
        v-for="n in props.vimeoIds.length"
        :key="n"
        class="video-card skeleton"
      >
        <div class="skeleton-thumb" />
        <div class="skeleton-title" />
      </div>
    </template>
    <template v-else>
      <a
        v-for="(vMeta, index) in vMetaData"
        :key="index"
        class="video-card"
        :href="`https://vimeo.com/${vMeta.video_id}`"
        :data-sub-html="`<h3>${vMeta.title}</h3><p><a target='_blank' href='https://vimeo.com/${vMeta.video_id}'>https://vimeo.com/${vMeta.video_id}</a></p>`"
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

const getVideoVideosInfo = async (vimeoIds: string[]): Promise<VimeoVideo[]> => {
  const response = await Promise.all(
    vimeoIds.map(async (id) => {
      const res = await fetch(
        `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${id}`,
      )
      if (!res.ok) {
        return
      }
      const data = await res.json() as VimeoVideo
      return data
    }),
  )
  const filteredResponse = response.filter((o): o is VimeoVideo => o !== undefined)
  return filteredResponse
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
@import "../assets/css/ls.css";

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
