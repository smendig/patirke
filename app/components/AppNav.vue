<template>
  <nav
    id="nav"
    aria-label="Navegación principal"
  >
    <ul class="nav-list">
      <li>
        <NuxtLink
          :to="'/'"
          exact-active-class="is-active"
          aria-current-value="page"
        ><span>Inicio</span></NuxtLink>
      </li>
      <li>
        <NuxtLink
          :to="'/curriculum/'"
          exact-active-class="is-active"
          aria-current-value="page"
        ><span>Curriculum</span></NuxtLink>
      </li>
      <li>
        <NuxtLink
          :to="'/reel/'"
          exact-active-class="is-active"
          aria-current-value="page"
        ><span>Reel</span></NuxtLink>
      </li>
      <li>
        <NuxtLink
          :to="'/escenas/'"
          exact-active-class="is-active"
          aria-current-value="page"
        ><span>Escenas</span></NuxtLink>
      </li>
      <li>
        <NuxtLink
          :to="'/musica/'"
          exact-active-class="is-active"
          aria-current-value="page"
        ><span>Música</span></NuxtLink>
      </li>
      <li>
        <NuxtLink
          :to="'/galeria/'"
          exact-active-class="is-active"
          aria-current-value="page"
        ><span>Galería</span></NuxtLink>
      </li>
      <li>
        <NuxtLink
          :to="'/contacto/'"
          exact-active-class="is-active"
          aria-current-value="page"
        ><span>Contacto</span></NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
#nav {
  padding: 0px;
  margin: 15px;
  border-width: 1px 0 1px 0;
  border-style: solid;
  border-color: #e5e5e5;

  .nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

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

    &.router-link-exact-active,
    &.is-active,
    &[aria-current="page"] {
      color: #000;
    }
  }
}

@media only screen and (max-width: 768px) {
  #nav {
    .nav-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
    }

    a {
      padding: 10px 10px;
      margin: 5px 0px;
    }
  }
}
</style>
