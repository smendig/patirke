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
      <div id="nav">
        <div>
          <router-link
            :to="'/'"
            class
          >
            <span>Inicio</span>
          </router-link>
        </div>
        <div>
          <router-link :to="'/curriculum/'">
            <span>Curriculum</span>
          </router-link>
        </div>
        <div>
          <router-link
            :to="'/reel/'"
            class
          >
            <span>Reel</span>
          </router-link>
        </div>
        <div>
          <router-link
            :to="'/escenas/'"
            class
          >
            <span>Escenas</span>
          </router-link>
        </div>
        <div>
          <router-link
            :to="'/musica/'"
            class
          >
            <span>Música</span>
          </router-link>
        </div>
        <div>
          <router-link
            :to="'/galeria/'"
            class
          >
            <span>Galería</span>
          </router-link>
        </div>
        <div>
          <router-link
            :to="'/contacto/'"
            class
          >
            <span>Contacto</span>
          </router-link>
        </div>
      </div>
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
    <div class="footer">
      <div class="footercontainer">
        <p>
          Copyright © 2025 Patirke Mendiguren -
          <a href="mailto:patirkem@gmail.com">patirkem@gmail.com</a>
        </p>
      </div>
    </div>
  </div>
</template>

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

.footer {
  text-align: center;
  grid-area: footer;
  background-color: #000;
  color: #fff;
  display: flex;
  align-items: center;
  min-height: 100px;

  .footercontainer {
    flex: 1 1 auto;
  }
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

#nav {
  padding: 0px;
  margin: 15px;
  border-width: 1px 0 1px 0;
  border-style: solid;
  border-color: #e5e5e5;

  a {
    text-decoration: none;
    color: #2c3e50;
    display: flex;

    span {
      font-family: "Open Sans", sans-serif;
      font-size: 18px;
      font-weight: 300;
      padding: 8px 0;
    }

    &.router-link-exact-active {
      color: #000;
    }
  }
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

  #nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    a {
      padding: 10px 10px;
      margin: 5px 0px;
    }
  }
}
</style>
