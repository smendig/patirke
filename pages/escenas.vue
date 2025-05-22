<template>
  <main class="page">
    <h1>Escenas</h1>
    <LGVimeoWrap :vimeo-ids="['488046257', '350949915', '488061250', '415064780', '184307264']" />
  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Escenas',
  meta: [
    {
      name: 'description',
      content: 'Reel y Escenas en cine y televisión',
    },
  ],
})
</script>
