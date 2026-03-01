<template>
  <NuxtPicture
    :src="`${imgSrc}.jpg`"
    :alt="alt || ''"
    :sizes="sizes"
    :loading="loading"
    :img-attrs="imgAttrs"
    format="webp,jpg"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  imgSrc: string
  alt?: string
  sizes?: string
  loading?: 'lazy' | 'eager'
  fetchpriority?: 'high' | 'low' | 'auto'
}>()

const imgAttrs = computed(() => ({
  class: 'responsive-img',
  ...(props.fetchpriority ? { fetchpriority: props.fetchpriority } : {}),
}))
</script>

<style scoped>
:deep(picture) {
  display: block;
  width: 100%;
  height: 100%;
}

:deep(.responsive-img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
