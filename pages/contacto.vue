<template>
  <main class="page">
    <h1>Información de contacto</h1>
    <div id="system">
      <div class="item">
        <div style="border: 1px solid #777; padding: 5px 15px 30px; margin: 15px 0px">
          <div>
            <h2>DATOS DE CONTACTO</h2>
            <div class="c1">
              <h3>O'Rocho Talent Agency</h3>
              <p>
                <strong>Amanda Rodríguez Cabal</strong>
              </p>
              <p>
                <a href="mailto:amanda@orocho.es">amanda@orocho.es</a>
              </p>
              <p>
                Teléfono:
                <a href="tel:+34657864911">+34 657 86 49 11</a>
              </p>
            </div>
            <div class="c2">
              <h3>Mail personal</h3>
              <p>
                <a href="mailto:patirkem@gmail.com">patirkem@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  ],
})
</script>

<style scoped>
.c1,
.c2 {
  border: 1px solid #333;
  margin: 20px 0px;
  padding: 5px 20px;
}
</style>
