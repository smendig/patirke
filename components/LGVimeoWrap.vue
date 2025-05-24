<template>
  <div
    id="vimeo-gallery"
    ref="vimeowrap"
  >
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
// Lightgallery font, he tenido que hacer esto oara que salgan bien los iconos en las galerias:
@import "../assets/css/ls.css";

#vimeo-gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  a.video-card {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    width: 49%;
    max-width: 100%;

    img {
      filter: brightness(50%);
      flex: 1 1 auto;
      max-width: 100%;
      object-fit: cover;
      transition: all 0.5s;
    }

    .video-title-overlay {
      text-align: center;
      position: absolute;
      top: 100px;
      left: 0;
      width: 100%;

      h3 {
        font-size: 25px;
      }
    }
  }

  a.video-card:hover {
    img {
      filter: brightness(100%);
    }
  }
}

@media only screen and (max-width: 768px) {
  a.video-card {
    width: 99%;
  }
}
</style>
