<template>
  <div class="container">
    <div class="back-img">
    <MovieDetailContent></MovieDetailContent>
    <!-- <v-divider></v-divider> -->
    </div>

  </div>
</template>

<script>
// import MovieDetailReview from '@/components/MovieDetail/MovieDetailReview.vue'
import MovieDetailContent from '@/components/MovieDetail/MovieDetailContent.vue'

export default {
  name: "MovieDetail",
  components: {
    // MovieDetailReview,
    MovieDetailContent
    },

}
</script>

<style scoped>
  .back-img {
    position: relative;
    background-image: linear-gradient(
    rgba(0, 0, 0, 0.8), 
    rgba(0, 0, 0, 0.8)
    ), 
    url('../assets/main_test.jpg');
    /* background-position: center;; */
    background-size: cover;
    top: 0; 
    bottom: 0; 
    left: 0;
    right: 0; 
    /* border: 50px solid rgba(65, 65, 65, 0.5); */
    /* border: 50px solid rgba(65, 65, 65, 0.5); */
    outline : 50px solid rgba(65, 65, 65, 0.5);
    height: 100%;
    padding-bottom: 40px;
    border-radius: 40px 80px / 80px 40px;
  }

</style>