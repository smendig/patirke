<template>
  <main class="page no-main-padding">
    <div
      v-for="(img, index) in imgs"
      :key="index"
    >
      <PictureSource
        :img-src="img"
        :class="{ 'active': index === activeIndex, 'slideshow-image': true }"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Patirke Mendiguren - Actriz y Cantante',
  meta: [
    {
      name: 'description',
      content: 'Web oficial de Patirke Mendiguren, actriz y cantante. Descubre su curriculum, galería, vídeos, música y contacto profesional.',
    },
  ],
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

  .slideshow-image {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    transition: opacity 1s;
  }

  .slideshow-image.active {
    opacity: 1;
  }
}
</style>
