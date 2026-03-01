<template>
  <main class="page">
    <h1>Reel</h1>
    <LGVimeoWrap :vimeo-ids="['86016734']" />
  </main>
</template>

<script setup lang="ts">
import { useSocialMeta } from '~/composables/useSocialMeta'

useSocialMeta({
  title: 'Videobook - Reel',
  description: 'Videobook (Reel) de la actriz Patirke Mendiguren.',
  urlPath: '/reel',
})
</script>
