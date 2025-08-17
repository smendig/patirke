<template>
  <main class="page">
    <h1>Información de contacto</h1>
    <section class="contact-section">
      <div class="contact-card">
        <h2>Representación</h2>
        <h3>O'Rocho Talent Agency</h3>
        <p><strong>Amanda Rodríguez Cabal</strong></p>
        <p>
          <a href="mailto:amanda@orocho.es">amanda@orocho.es</a>
        </p>
        <p>
          Teléfono: <a href="tel:+34657864911">+34 657 86 49 11</a>
        </p>
      </div>
      <div class="contact-card">
        <h2>Contacto directo</h2>
        <p>
          <a href="mailto:patirkem@gmail.com">patirkem@gmail.com</a>
        </p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Información de contacto',
  meta: [
    {
      name: 'description',
      content: 'Información de contacto',
    },
    { property: 'og:title', content: 'Contacto - Patirke Mendiguren' },
    { property: 'og:description', content: 'Información de contacto profesional y de representación de Patirke Mendiguren, actriz y cantante.' },
    { property: 'og:image', content: 'https://patirke.com/portada/patirke121.jpg' },
    { property: 'og:url', content: 'https://patirke.com/contacto/' },
    { property: 'og:type', content: 'website' },
  ],
})
</script>

<style scoped>
.page {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.contact-section {
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
  margin-top: 2em;
  justify-content: flex-start;
  flex: 1;
}
.contact-card {
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1.5em 2em;
  min-width: 250px;
  background: #181818;
  color: #fff;
  flex: 1 1 300px;
}
.contact-card h2 {
  margin-top: 0;
  font-size: 1.2em;
  color: #e5e5e5;
}
.contact-card h3 {
  margin-bottom: 0.5em;
  font-size: 1em;
  color: #b4b4b4;
}
@media (max-width: 600px) {
  .contact-section {
    flex-direction: column;
    gap: 1em;
  }
}
</style>
