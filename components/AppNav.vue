<template>
  <nav id="nav">
    <div>
      <router-link :to="'/'"><span>Inicio</span></router-link>
    </div>
    <div>
      <router-link :to="'/curriculum/'"><span>Curriculum</span></router-link>
    </div>
    <div>
      <router-link :to="'/reel/'"><span>Reel</span></router-link>
    </div>
    <div>
      <router-link :to="'/escenas/'"><span>Escenas</span></router-link>
    </div>
    <div>
      <router-link :to="'/musica/'"><span>Música</span></router-link>
    </div>
    <div>
      <router-link :to="'/galeria/'"><span>Galería</span></router-link>
    </div>
    <div>
      <router-link :to="'/contacto/'"><span>Contacto</span></router-link>
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
