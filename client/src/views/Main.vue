<template>
  <div id="main" class="container">
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
    </v-container> -->
    <div>
      <div>
        <img class="main-img" src="@/assets/main_test.jpg" alt="">
        <img class="main-img" src="@/assets/main_test.jpg" alt="">
      </div>
      <!--<div>
        <img class="main-img" src="@/assets/main_test.jpg" alt="">
        <img class="main-img" src="@/assets/main_test.jpg" alt="">
      </div>-->
    </div>
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

  .main-img {
    width: 45%;
    margin: 20px;

  }

  

</style>