<template>
  <v-app id="app">
    <v-container class="d-flex justify-center">
      <v-img
        max-height="250"
        max-width="250"
        position="center center"
        src="@/assets/logo.png"
        ></v-img>
    </v-container>
    <router-link to="/">main</router-link>
    <router-view/>

    <vue-particles
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="50"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="false"
      clickMode="push"
    >
    </vue-particles>

  </v-app>
</template>

<script>

</script>

<style>
  #app{
    width: 100%;
    height: 100vh;
    background-color: black;
    color: white;
  }
  #particles-js { 
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0; 
  }


</style>

