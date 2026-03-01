<template>
  <main class="page">
    <h1>Escenas</h1>
    <LGVimeoWrap :vimeo-ids="['488046257', '350949915', '488061250', '415064780', '184307264']" />
  </main>
</template>

<script setup lang="ts">
import { useSocialMeta } from '~/composables/useSocialMeta'

useSocialMeta({
  title: 'Escenas',
  description: 'Reel y Escenas en cine y televisión de Patirke Mendiguren.',
  urlPath: '/escenas',
})
</script>
