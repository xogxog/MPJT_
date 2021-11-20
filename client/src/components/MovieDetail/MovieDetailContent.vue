<template>
  <article id="movie-detail-content" class="container">
    <div class="d-flex">
      <div class="">
        <v-img width="350px" height="500px" contain :src="movieDetail.movie.poster_path" alt="poster"></v-img>
        <v-divider></v-divider>
        <v-card class="d-flex" style="background: rgba(255, 255, 255, 0.5); margin: 0 15%;">
          <v-card-text style="color: white;">평균 점수<br>{{movieDetail.movie.vote_average}}</v-card-text>
          <v-card-text style="color: white;">개봉일<br>{{movieDetail.movie.release_date}}</v-card-text>
        </v-card>
      </div>
      <div class="title-detail container">
        <div class="content-box">
          <div class="Title">
            <v-banner class="text-white justify-center text-h6 font-weight-light"
              style="background: rgba(255, 255, 255, 0.5)" sticky>
              {{movieDetail.movie.title}}
            </v-banner>
            <v-divider></v-divider>
            <v-card style="background: rgba(255, 255, 255, 0.5);">
            </v-card>
            <v-card v-scroll.self="onScroll" class="overflow-y-auto" height="268px"
              style="background: rgba(255, 255, 255, 0.5);">

              <v-card-text>
                <div class="mb-4 text-white">
                  <div>
                  {{movieDetail.movie.overview}}
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </div>
          <v-divider></v-divider>
          <v-card class="d-flex justify-content-evenly text-white"
            style="background: rgba(255, 255, 255, 0.5); padding-bottom: 4px;">
            <div class="actor">배우
              <v-divider></v-divider>
              <div v-for="(actor, i) in movieDetail.movie.movie_actor" :key="i">
              <p>{{actor.name}}</p>
              </div>
            </div>
            <v-divider vertical></v-divider>
            <div class="director">감독
              <v-divider></v-divider>
              <div v-for="(director, i) in movieDetail.movie.movie_director" :key="i">
                <p>{{director.name}}</p>
              </div>
            </div>
          </v-card>
          <button></button>
          <v-divider></v-divider>
          <v-card class="d-flex" style="background: rgba(255, 255, 255, 0.5);">

          </v-card>
        
          
        </div>
      </div>
    </div>

  </article>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    name: 'MovieDetailContent',
    created : function(){
      this.$store.dispatch('getMovieDetail/movieDetail')
      console.log(this.MovieDetail)
    },
    computed :{
      ...mapState('getMovieDetail', ['movieDetail']),
    }
  }
</script>

<style scoped>
  #movie-detail-content {
    color: white;
  }

  .text-white {
    color: white;
  }

  .default-background {
    background-color: rgba(255, 255, 255, 0.3);
  }

  .movie-poster {}

  .movie-poster img {
    width: 100%;
    height: 100%;
  }

  .title-detail {}

  .actor .director {
    width: 50%;
  }
</style>