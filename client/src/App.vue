<template>
  <!-- 모든 요소 style에 z-index: 1; 이상 넣어주기 -->
  <!-- vuetify는 dark: "true" 넣기 -->
  
  <div id="app">
    <!-- 로고 -->
    <v-app>
      
      <div class="logo-bar d-flex justify-center justify-space-between">
        <div class="nav-in-box"></div>
        <v-img max-height="250px" max-width="250px" src="@/assets/logo.png"></v-img>
        <nav-toggle class="nav-toggle nav-in-box" style="z-index: 2" />
      </div>
      <router-view />
    </v-app>

    <!-- particles 배경 -->
    <vue-particles
      id="particles-js"
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="60"
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
import NavToggle from './components/NavToggle.vue'
export default {
  name: 'App',
  components: {
  NavToggle,
  },

  data: () => {
    return {
    }
  },
};
</script>

<style>
  .main-img {
    margin-top: 5%;
    margin-bottom: 5%;
  }

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
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
}

</style>
