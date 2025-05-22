<template>
  <div class="container">
    <a href="/">
      <div class="logo">
        <img
          class="xl"
          height="205"
          width="205"
          src="../assets/images/patirke-mendiguren-logo.png"
          alt="Patirke Mendiguren"
        >
        <img
          class="sm"
          height="100"
          width="250"
          src="../assets/images/patirke-mendiguren-logo-small.png"
          alt="Patirke Mendiguren"
        >
      </div>
    </a>
    <div class="menu">
      <AppNav />
      <div id="socialnav">
        <div class="cimdb">
          <a
            href="https://www.imdb.com/name/nm6263976/"
            target="_blank"
            rel="noopener"
          >
            <img
              src="../assets/images/social/imdb-256-black.webp"
              alt="imdb"
            >
          </a>
        </div>
        <div class="cinst">
          <a
            href="https://www.instagram.com/patirke.m/"
            target="_blank"
            rel="noopener"
          >
            <img
              src="../assets/images/social/instagram-256-black.webp"
              alt="instagram"
            >
          </a>
        </div>
      </div>
    </div>
    <div class="main">
      <slot />
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppFooter from '~/components/AppFooter.vue'
import AppNav from '~/components/AppNav.vue'
</script>

<style lang="scss">
body {
  font-family: "Metrophobic", sans-serif;
  color: #b4b4b4;
  font-weight: 300;
  margin: 0;
  background: #1a1a1a;
}

h1,
h2,
h3 {
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
}

strong {
  color: #fff;
}

a {
  color: #fff;
}

.container {
  display: grid;
  grid-template-columns: 0fr 1fr 1fr;
  grid-template-rows: 0fr 1fr 0fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "logo main main"
    "menu main main"
    "menu footer footer";
}

.main {
  grid-area: main;
  background-color: #000;
}

.main>* {
  padding: 10px 20px;
}

.main>.nopagepadding {
  padding: 0;
}

.logo {
  grid-area: logo;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;

  img.xl {
    padding: 15px 15px;
  }

  img.sm {
    display: none;
  }
}

.menu {
  grid-area: menu;
  position: sticky;
  background: #fff;
}

#socialnav {
  display: flex;
  align-items: center;
  justify-content: space-around;

  img {
    width: 50px;
    height: 50px;
  }
}

@media only screen and (max-width: 768px) {
  .container {
    display: initial;
  }

  .logo {
    img.xl {
      display: none;
    }

    img.sm {
      display: initial;
    }
  }
}
</style>
