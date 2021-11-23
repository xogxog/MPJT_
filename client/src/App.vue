<template>
  <!-- 모든 요소 style에 z-index: 1; 이상 넣어주기 -->
  <!-- vuetify는 dark: "true" 넣기 -->
  
  <div id="app">
    <!-- <div class="container-fluid back-img"></div> -->
    <!-- 로고 -->
    <v-app>
      <div class="logo-bar d-flex justify-center justify-space-between">
        <div class="nav-in-box"></div>
        <v-img max-height="250px" max-width="250px" src="@/assets/logo.png"></v-img>
        <nav-toggle class="nav-toggle nav-in-box" style="z-index: 99" />
      </div>
      <router-view style="z-index: 2"/>
    </v-app>

    <!-- particles 배경 -->
    <vue-particles
      id="particles-js"
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="false"
      clickMode="push"
      class="lizi"
    >
    </vue-particles>
  </div>
</template>

<script>
import NavToggle from '@/components/NavToggle.vue'

export default {
  name: 'App',
  components: {
    NavToggle,
  },
};
</script>

<style>
  .nav-in-box {
    width: 250px; height: 250px;
  }

  .nav-toggle {
    padding-top: 50px;
    padding-left: 150px
  }

  #app {
    background: black;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
/* 
  #particles-js{
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    display: block;
    height: 100vh !important;
    left: 0;
    top: 0;
    position: absolute;
    width: 100vw !important;
    z-index: 0;
    } */

  #particles-js { 
  /* position: absolute;
  background-size: cover;
  top: 0; 
  bottom: 0; 
  left: 0;
  right: 0; 
  overflow-y: hidden; 
  z-index: 0; */
  background-position: center;
  background-size: cover;
  background-repeat: repeat;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  background-image: linear-gradient(
  rgba(0, 0, 0, 0.199), 
  rgba(245, 174, 174, 0.158));
}

</style>
