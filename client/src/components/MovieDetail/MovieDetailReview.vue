<template>
  <div id="movie-detail-content">
    <h1>Review</h1>
    <div v-for="(review, i) in movieDetail.reviews" :key="i">
      {{review.title}}
      {{review.like_users_count}}
      {{review.user.nickname}}
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'MovieDetailReview',
  computed :{
      ...mapState('getMovieDetail', ['movieDetail']),
    }
}
</script>

<style scoped>
  #movie-detail-content {
    color: white;
    }
</style>