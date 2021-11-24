<template>
  <div id="main" class="container">
    <div class="welcome">
      <p>Recommendation for you</p>
    </div>
    <carousel id="carousel-slide"></carousel>

    <!-- <v-container>
      <v-row class="">
        <v-col class="d-flex">
          <v-img class="main-img" width= "50%" src="@/assets/main_test.jpg"></v-img>
          <v-img class="main-img" width= "50%" src="@/assets/main_test.jpg"></v-img>
        </v-col>
        <v-col class="d-flex">
          <v-img class="main-img" width= "50%" src="@/assets/main_test.jpg"></v-img>
          <v-img class="main-img" width= "50%" src="@/assets/main_test.jpg"></v-img>
        </v-col>
      </v-row>
    </v-container>



    <div>
      <div class="d-flex justify-content-around">
        <img class="main-img" src="@/assets/main_test.jpg" alt="">
        <img class="main-img" src="@/assets/main_test.jpg" alt="">
      </div>
      <div>
        <img class="main-img" src="@/assets/main_test.jpg" alt="">
        <img class="main-img" src="@/assets/main_test.jpg" alt="">
      </div>
    </div>-->
  </div> 
</template>

<script>
import Carousel from '@/components/Carousel.vue'

export default {
  name: 'Main',
  components: {
    Carousel,
  },
}
</script>

<style scoped>
  #main {
    color: white;
  }

  #carousel-slide{
    z-index: 5;
  }

  .welcome {
    z-index: 999;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .welcome p {
    position: relative;
    /* font-family: sans-serif; */
    /* color: white; */
    text-transform: uppercase;
    font-size: 2em;
    letter-spacing: 4px;
    overflow: hidden;
    background: linear-gradient(90deg, #000, #fff, #000);
    background-repeat: no-repeat;
    background-size: 70%;
    animation: animate 4s linear infinite;
    -webkit-text-fill-color: rgba(255, 255, 255, 0);
    -webkit-background-clip: text;
  }

  @keyframes animate
  {
    0%
    {
      background-position: -400%;
    }
    100%
    {
      background-position: 300%;
    }
  }

  .main-img {
    max-width: 400px;
    width: 45%;
    margin: 20px;

  }

  

</style>