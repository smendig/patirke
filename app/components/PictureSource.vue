<template>
  <NuxtPicture
    :src="`${imgSrc}.jpg`"
    :alt="alt || ''"
    :img-attrs="{ class: 'responsive-img' }"
    format="webp,jpg"
  />
</template>

<script setup lang="ts">
defineProps<{
  imgSrc: string
  alt?: string
}>()
</script>

<style scoped>
.responsive-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
