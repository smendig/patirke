<template>
  <nav id="nav">
    <div>
      <NuxtLink :to="'/'"><span>Inicio</span></NuxtLink>
    </div>
    <div>
      <NuxtLink :to="'/curriculum/'"><span>Curriculum</span></NuxtLink>
    </div>
    <div>
      <NuxtLink :to="'/reel/'"><span>Reel</span></NuxtLink>
    </div>
    <div>
      <NuxtLink :to="'/escenas/'"><span>Escenas</span></NuxtLink>
    </div>
    <div>
      <NuxtLink :to="'/musica/'"><span>Música</span></NuxtLink>
    </div>
    <div>
      <NuxtLink :to="'/galeria/'"><span>Galería</span></NuxtLink>
    </div>
    <div>
      <NuxtLink :to="'/contacto/'"><span>Contacto</span></NuxtLink>
    </div>
  </nav>
</template>

<style scoped lang="scss">
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

@media only screen and (max-width: 768px) {
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
