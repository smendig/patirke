<template>
  <picture>
    <source
      :srcset="`${imgSrc}.webp`"
      type="image/webp"
    >
    <source
      :srcset="`${imgSrc}.jpg`"
      type="image/jpeg"
    >
    <img
      :src="`${imgSrc}.jpg`"
      class="responsive-img"
    >
  </picture>
</template>

<script setup lang="ts">
defineProps<{
  imgSrc: string
}>()
</script>

<style scoped>
.responsive-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
