<template>
  <main class="page">
    <h1>Música</h1>
    <LGVimeoWrap :vimeo-ids="['78718716', '488147520', '143114065', '427118818', '488147516', '36045195']" />
  </main>
</template>

<script setup lang="ts">
import { useSocialMeta } from '~/composables/useSocialMeta'

useSocialMeta({
  title: 'Música',
  description: 'Proyectos musicales y canciones de Patirke Mendiguren.',
  urlPath: '/musica',
})
</script>
