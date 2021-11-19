<template>
  <div>
    <MovieDetailContent></MovieDetailContent>
    <!-- <v-divider></v-divider>
    <MovieDetailReview></MovieDetailReview> -->
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

</style>