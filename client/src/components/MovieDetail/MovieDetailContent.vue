

<template>
  <!-- 전체 -->
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
              style="background: rgba(255, 255, 255, 0.5)">
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
          <v-card v-scroll.self="onScroll" height="101px"
            class="d-flex overflow-y-auto justify-content-evenly text-white"
            style="background: rgba(255, 255, 255, 0.5);">
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
          <v-divider></v-divider>
          <div class="d-flex justify-content-around" style="background-color: rgba(255, 255, 255, 0.0)f">
            <div>
              <v-btn color="primary" fab x-large dark>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <div>123</div>
            </div>
            <div>
              <v-btn color="primary" fab x-large dark>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <div>123</div>
            </div>
            <div>
              <v-btn color="primary" fab x-large dark @click.stop="reviewWriteOpen=true">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <div>리뷰 쓰기</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-divider></v-divider>
      <div class="reviews container">
        <v-data-table class="elevation-1" no-data-text="No Review" style="background: rgba(255, 255, 255, 0.5);" dark
          click:row :headers="headers" :items="movieDetail.reviews" multi-sort>
          <template v-slot:item.title="{ item }">
            <a href="" @click="openReviewDetail(item.id, $event)" @click.stop="reviewDetailOpen=true" >{{item.title}}</a>
          </template>
        </v-data-table>
      </div>
        <!-- 테이블 끝 -->
      <MovieReviewCreate 
        v-model="reviewWriteOpen"
        :movie-pk="movieDetail.movie.id"
      ></MovieReviewCreate>
      <MovieDetailReview 
        v-model="reviewDetailOpen"
        :review-pk="reviewPk"
      ></MovieDetailReview>

    
  </article>
  <!-- 전체 -->
</template>

<script>
import MovieDetailReview from '@/components/MovieDetail/MovieDetailReview.vue'
import MovieReviewCreate from '@/components/MovieDetail/MovieReviewCreate.vue'
import { mapState } from 'vuex'
  export default {
    name: 'MovieDetailContent',
    components: {
      MovieDetailReview,
      MovieReviewCreate
    },
    data: function () {
      return {
        reviewPk : null,
        onScroll : null,
        reviewDetailOpen: false,
        reviewWriteOpen: false,
        headers: [{
            text: 'nickname1',
            align: 'center',
            sortable: false,
            divider: 1,
            value: 'user.nickname',
          },

          {
            text: "title",
            value: "title"
          },
          {
            text: "like_users_count",
            value: "like_users_count"
          },
          {
            text: "updated_at",
            value: "updated_at"
          },

        ],
      }
    },
    

    methods: {
      openReviewDetail: function (reviewPk,event) {
        event.preventDefault()
        this.$store.dispatch('review/getReviewDetail', reviewPk)
  
      },
    },

    created: function () {
      this.$store.dispatch('getMovieDetail/movieDetail')
      // console.log(this.movieDetail.title)
    },

    computed: {
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