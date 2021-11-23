<template>
  <div class="mv-detail container">
    <div class="back-img">
      <!-- <v-img class="back-img" :src="movieDetail.movie.poster_path" alt=""> -->
      <MovieDetailContent></MovieDetailContent>
      <!-- <v-divider></v-divider> -->
      <!-- </v-img> -->
    </div>
  </div>
</template>

<script>
// import MovieDetailReview from '@/components/MovieDetail/MovieDetailReview.vue'
import MovieDetailContent from '@/components/MovieDetail/MovieDetailContent.vue'
import {mapState} from 'vuex'
export default {
  name: "MovieDetail",
  components: {
    // MovieDetailReview,
    MovieDetailContent
  },
  computed: {
    ...mapState('getMovieDetail', ['movieDetail'])
  },

}
</script>

<style scoped>
  .mv-detail {
    width: 70%;
    max-width: 900px;
  }
  
  .back-img {
    position: relative;
    background-color: rgba(65, 65, 65, 0.5);
    background: linear-gradient(
      rgba(65, 65, 65, 0.5), 
      rgba(65, 65, 65, 0.5)
    ),;
    /* url({{movieDetail.movie.poster_path}}); */
    /* background-position: center; */
    background-size: cover;
    top: 0; 
    bottom: 0; 
    left: 0;
    right: 0; 
    /* border: 50px solid rgba(65, 65, 65, 0.5); */
    /* border: 50px solid rgba(65, 65, 65, 0.5); */
    outline : 30px solid rgba(65, 65, 65, 0.5);
    height: 100%;
    border-radius: 40px 80px / 80px 40px;
    border-radius: 1px;
  }

</style>