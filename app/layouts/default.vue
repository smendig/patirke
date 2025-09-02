<template>
  <div class="container">
    <header>
      <NuxtLink
        to="/"
        aria-label="Volver a la página principal"
      >
        <div class="logo">
          <img
            class="xl"
            height="205"
            width="205"
            src="/icons/patirke-mendiguren-logo.png"
            alt="Patirke Mendiguren"
            loading="eager"
            fetchpriority="high"
          >
          <img
            class="sm"
            height="100"
            width="250"
            src="/icons/patirke-mendiguren-logo-small.png"
            alt="Patirke Mendiguren"
            loading="eager"
            fetchpriority="high"
          >
        </div>
      </NuxtLink>
    </header>
    <nav
      class="menu"
      aria-label="Navegación principal"
    >
      <AppNav />
      <SocialNav />
    </nav>
    <main class="main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppFooter from '~/components/AppFooter.vue'
import AppNav from '~/components/AppNav.vue'
import SocialNav from '~/components/SocialNav.vue'
import { useHead, useRuntimeConfig, useRoute, watch } from '#imports'

const config = useRuntimeConfig()
const route = useRoute()
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': 'Patirke Mendiguren',
        'jobTitle': 'Actriz y Cantante',
        'url': 'https://patirke.com/',
        'image': 'https://patirke.com/portada/patirke121.jpg',
        'sameAs': [
          'https://www.imdb.com/name/nm6263976/',
          'https://www.instagram.com/patirke.m/',
        ],
      }),
    },
  ],
  meta: [
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],
})
watch(
  () => route.fullPath,
  (fullPath) => {
    useHead({
      link: [
        {
          rel: 'canonical',
          key: 'canonical',
          href:
            fullPath === '/'
              ? config.public.siteUrl
              : `${config.public.siteUrl}${fullPath}`,
        },
      ],
    })
  },
  { immediate: true },
)
</script>

<style lang="scss">
body {
  font-family: "Metrophobic", Arial, sans-serif;
  color: #b4b4b4;
  font-weight: 300;
  margin: 0;
  background: #1a1a1a;
  line-height: 1.6;
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
  min-height: 100vh;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "logo main"
    "menu main"
    "footer footer";
}

.main {
  grid-area: main;
  background-color: #000;
  min-height: 0;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.main>* {
  padding: 10px 20px;
}

.main>.no-main-padding {
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

@media only screen and (max-width: 768px) {
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .main {
    flex: 1 0 auto;
    order: 3;
  }
  .menu {
    order: 2;
  }
  .logo {
    order: 1;
    padding: 10px 0;

    img.xl {
      display: none;
    }

    img.sm {
      display: block;
      max-width: 100%;
      height: auto;
    }
  }
  .footer {
    order: 4;
  }
}
</style>
