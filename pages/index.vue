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
const activeIndex = ref(999999)
let interval: number | null = null

const nextImg = () => {
  if (activeIndex.value + 1 >= imgs.value.length) {
    activeIndex.value = 0
  }
  else {
    activeIndex.value += 1
  }
  interval = setTimeout(nextImg, 4500) as unknown as number
}

onMounted(() => {
  setTimeout(() => {
    nextImg()
  }, 100)
})

onUnmounted(() => {
  if (interval) {
    clearTimeout(interval)
    interval = null
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
