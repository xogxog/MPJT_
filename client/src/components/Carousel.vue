
<template>
  <!-- 무비 숫자 카운트..? :count="movieList.length" -->

  <div>
    <carousel-3d
      class="carousel"
      :space="280"
      :width="300"
      :height="400"
      :border="1"
      :display="7"
      :inverseScaling= "200"
      controlsVisible
      >
      <!-- <slide v-for="(movie, i) in movieList" :key="i" :index="i">
        
      </slide> -->
      <slide v-for="(movie, index) in movies" :key="index" :index="index">
        <figure>
          <img src="@/assets/dune_poster.jpg" alt="movie-poster">
          <figcaption>
            Dune Overview
          </figcaption>
        </figure>
      </slide>
      <!-- <slide :index="1">
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
      </slide> -->
      
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
  
  data: function() {
    return {
      movies: 7,
    }
  },

  created() {
    
  }
}
</script>

<style>
.carousel {
  z-index: 99;
  width: 100%;
}

.carousel-3d-container figure {
  margin:0;
}

.carousel-3d-container figcaption {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  bottom: 0;
  position: absolute;
  bottom: 0;
  padding: 15px;
  font-size: 12px;
  min-width: 100%;
  box-sizing: border-box;
}

</style>