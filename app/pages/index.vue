<template>
  <main class="page no-main-padding">
    <div
      v-for="(img, index) in imgs"
      :key="index"
      :class="{ 'active': index === activeIndex, 'slideshow-slide': true }"
    >
      <PictureSource
        :img-src="img"
        alt="Patirke Mendiguren - Actriz y Cantante"
        sizes="100vw"
        :loading="index === 0 ? 'eager' : 'lazy'"
        :fetchpriority="index === 0 ? 'high' : 'auto'"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useSocialMeta } from '~/composables/useSocialMeta'

useSocialMeta({
  title: 'Inicio',
  description: 'Web oficial de Patirke Mendiguren, actriz y cantante. Descubre su curriculum, galería, vídeos, música y contacto profesional.',
  urlPath: '/',
})
const imgs = ref(['/portada/patirke121', '/portada/patirke122', '/portada/patirke123'])
const activeIndex = ref(-1)
let timer: ReturnType<typeof setTimeout> | null = null

const scheduleNext = (delay = 4500) => {
  timer = setTimeout(nextImg, delay)
}

const nextImg = () => {
  activeIndex.value = (activeIndex.value + 1) % imgs.value.length
  scheduleNext()
}

onMounted(() => {
  // Controlled first display: show first image, then start timer
  activeIndex.value = 0
  scheduleNext()
})

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
})
</script>

<style lang="scss" scoped>
.page {
  position: relative;
  height: 100vh;
  overflow: hidden;

  .slideshow-slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 1s;

    // Ensure NuxtPicture's internal elements fill the slide
    :deep(picture),
    :deep(img) {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .slideshow-slide.active {
    opacity: 1;
  }
}
</style>
