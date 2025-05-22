<template>
  <main class="page">
    <h1>Reel</h1>
    <LGVimeoWrap :vimeo-ids="['86016734']" />
  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Reel',
  meta: [
    {
      name: 'description',
      content: 'Reel',
    },
  ],
})
</script>
