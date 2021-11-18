<template>
  <div id="main">
    <h1>Main</h1>
    <carousel id="carousel-slide"></carousel>
  </div>
</template>

<script>
import Carousel from '../components/Carousel.vue'
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

</style>