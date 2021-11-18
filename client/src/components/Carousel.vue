
<template>
  <!-- 무비 숫자 카운트..? :count="movieList.length" -->

  <div>
    <carousel-3d
      class="carousel"
      style="width: 100%"
      :space="300"
      :width="300"
      :height="400"
      :border="1"
      :display="7"
      :inverseScaling= "200"
      controlsVisible
      >
      <!-- <slide v-for="(movie, i) in movieList" :key="i" :index="i">
        
      </slide> -->
      <slide :index="0">
        Slide 1 Content
      </slide>
      <slide :index="1">
        Slide 2 Content
      </slide>
      <slide :index="2">
        Slide 3 Content
      </slide>
      <slide :index="3">
        Slide 4 Content
      </slide>
      <slide :index="4">
        Slide 4 Content
      </slide>
      <slide :index="5">
        Slide 4 Content
      </slide>
      <slide :index="6">
        Slide 4 Content
      </slide>
      
    </carousel-3d>
  </div>
</template>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d';

export default {
  name: 'Carousel',
  components: {
    Carousel3d,
    Slide,
  },
}
</script>

<style>
  .carousel {
    z-index: 99;
    width: 100%;
  }

</style>