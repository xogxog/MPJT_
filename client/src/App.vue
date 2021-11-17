<template>
  <!-- 모든 요소 style에 z-index: 1; 이상 넣어주기 -->
  <!-- vuetify는 dark: "true" 넣기 -->
  
  <div id="app">
    <!-- 로고 -->
    <v-app>
      <div class="logo-bar d-flex justify-center">
        <v-img max-height="250px" max-width="250px" src="@/assets/logo.png"></v-img>
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
export default {
  name: 'App',

  data: () => {
    return {
      flag: false,
    }
  },
};
</script>

<style>
  .main-img {
    margin-top: 5%;
    margin-bottom: 5%;
  }

  #app {
    background: black;
  }

  #particles-js{
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    display: block;
    height: 100VH !important;
    left: 0;
    position: absolute;
    top: 0;
    width: 100VW !important;
    z-index: 0;
    }

</style>
