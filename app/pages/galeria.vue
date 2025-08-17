<template>
  <main class="page">
    <h1>Galería</h1>
    <div
      id="galleryRef"
      ref="galleryRef"
    >
      <a
        v-for="image in images"
        :key="image"
        :href="`/gallery/${image}.jpg`"
      >
        <PictureSource
          class="gallery-thumb"
          :img-src="`/gallery/th/${image}`"
          height="375"
          width="250"
        />
      </a>
    </div>
  </main>
</template>

<script setup lang="ts">
import lightGallery from 'lightgallery'
import lgAutoplay from 'lightgallery/plugins/autoplay/lg-autoplay.umd.js'
import PictureSource from '~/components/PictureSource.vue'

useHead({
  title: 'Galería',
  meta: [
    {
      name: 'description',
      content: 'Galería de fotos',
    },
  ],
})

const images = [
  'patirke10',
  'patirke11',
  'patirke12',
  'patirke13',
  'patirke14',
  'patirke15',
  'patirke16',
  'patirke17',
  'patirke18',
  'patirke19',
]

const galleryRef = ref<HTMLElement | null>(null)
let galleryInstance: ReturnType<typeof lightGallery> | null = null

onMounted(() => {
  initGallery()
})

onUnmounted(() => {
  if (galleryInstance) {
    galleryInstance.destroy()
  }
})

const initGallery = () => {
  if (galleryRef.value) {
    galleryInstance = lightGallery(galleryRef.value, {
      speed: 500,
      plugins: [lgAutoplay],
      download: false,
      licenseKey: '0',
      mobileSettings: {
        controls: true,
        showCloseIcon: true,
        download: false,
      },
    })
  }
}
</script>

<style lang="scss">
@import "lightgallery/css/lightgallery.css";
@import "lightgallery/css/lg-autoplay.css";
// Lightgallery font, he tenido que hacer esto oara que salgan bien los iconos en las galerias:
@import "~/assets/css/ls.css";

#galleryRef {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  a {
    position: relative;
    display: flex;
    flex: 1 0 200px;
    justify-content: space-around;
    margin: 5px;

    .gallery-thumb {
      flex: 0 1 200px;
    }
  }
}

@media only screen and (max-width: 768px) {
  #galleryRef {
    a {
      flex: 1 0 120px;
      margin: 2px;

      .gallery-thumb {
        flex: 0 1 120px;
      }
    }
  }
}
</style>
