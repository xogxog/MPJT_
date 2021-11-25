

<template>
  <!-- 전체 -->
  <article id="movie-detail-content" class="container">
    <div class="d-flex">
      <div class="">
        <v-img width="350px" height="500px" contain :src="movieDetail.movie.poster_path" alt="poster"></v-img>
        <v-divider></v-divider>
        <v-card class="mt-7 d-flex" style="background: rgba(255, 255, 255, 0.5); margin: 0 15%;">
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
            <div v-if="likeMovie" class="pt-4">
              <v-btn color="red" fab small dark @click="likeUnlikeMovie">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <div style="margin-top:10px">찜</div>
            </div>
            <div v-else class="pt-4">
              <v-btn color="secondary" fab small dark @click="likeUnlikeMovie">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <div style="margin-top:10px">찜</div>
            </div>
            <div class="pt-4">
              <v-btn color="primary" fab small dark @click.stop="reviewWriteOpen=true">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <div style="margin-top:10px">리뷰 쓰기</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-divider></v-divider>

      <h3>Review</h3>
      <div class="reviews container">
        <v-data-table class="elevation-1" no-data-text="No Review" style="background: rgba(255, 255, 255, 0.5);" dark
          click:row :headers="headers" :items="movieDetail.reviews" multi-sort>
          <template v-slot:[`item.title`]="{item}">
            <a class="" href="" @click="openReviewDetail(item.id, $event)" @click.stop="reviewDetailOpen=true" >{{item.title}}</a>
          </template>
          <template v-slot:[`item.updated_at`]="{item}">
            {{item.updated_at.slice(0,10)}}
          </template>
        </v-data-table>
      </div>
    <v-divider></v-divider>
      <h3>추천 영화</h3>
    <div class="TMDBrecommed warp d-flex justify-content-around">
      <div class="card" v-for="rmovie in recommendMovies" :key="rmovie.id">
        <span></span>
        <div class="imgBx"><img class="non-poster" :src="`https://image.tmdb.org/t/p/original${rmovie.poster_path}`" alt="포스터가 없습니다."></div>
        <div class="content" @click="getRecommendMovies(rmovie.id)">
          <div class="content">
            <h4>{{rmovie.title}}</h4>
            <p>{{rmovie.release_date}}</p>
          </div>
      </div>
    </div>
    </div>
        <!-- 테이블 끝 -->
      <MovieReviewCreate 
        v-model="reviewWriteOpen"
        :movie-id="movieDetail.movie.movie_id"
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
import jQuery from "jquery";
const $ = jQuery;
window.$ = $;

  export default {
    name: 'MovieDetailContent',
    components: {
      MovieDetailReview,
      MovieReviewCreate,
    },
    data: function () {
      return {
        // like_movie : false,
        reviewPk : null,
        onScroll : null,
        reviewDetailOpen: false,
        reviewWriteOpen: false,
        headers: [{
            text: '작성자',
            align: 'center',
            sortable: false,
            divider: 1,
            value: 'user.nickname',
          },

          {
            text: "제목",
            value: "title"
          },
          {
            text: "좋아요 수",
            value: "like_users_count"
          },
          {
            text: "리뷰 작성일",
            value: "updated_at"
          },

        ],
      }
    },
    

    methods: {
      getRecommendMovies : function(movieId){
        this.$store.dispatch('getMovieDetail/setMovieId', movieId)
        this.$store.dispatch('recommendMovies/getRecommend', movieId)
        // location.reload()
        this.$router.push({name: 'MovieDetail'})
      },
      openReviewDetail: function (reviewPk,event) {
        event.preventDefault()
        this.$store.dispatch('review/getReviewDetail', reviewPk)
        this.$store.dispatch('comment/getComments',reviewPk)
      },
      likeUnlikeMovie : function(){
        const movieId = this.movieDetail.movie.movie_id
        this.$store.dispatch('getMovieDetail/likeUnlikeMovie', movieId)
      }
    },

    created: function () {
      this.$store.dispatch('getMovieDetail/movieDetail')

      $(document).ready(function (x, y) {
        $('.card').on('mouseenter', function (e) {
          x = e.pageX - $(this).offset().left,
            y = e.pageY - $(this).offset().top;
          $(this).find('span').css({
            top: y,
            left: x
          })
        })
        $('.card').on('mouseout', function (e) {
          x = e.pageX - $(this).offset().left,
            y = e.pageY - $(this).offset().top;
          $(this).find('span').css({
            top: y,
            left: x
          })
        })
      })
    },

    computed: {
      ...mapState('getMovieDetail', ['movieDetail','likeMovie']),
      ...mapState('login', ['userInfo']),
      ...mapState('saveMovies', ['recommendMovies']),
    }
  }
</script>

<style scoped>
  #movie-detail-content {
    color: white;
  }

.warp {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
    
  .warp .card {
    position: relative;
    width: 200px;
    height: 300px;
    margin: 10px;
    overflow: hidden;
    
  }

  .warp .card span {
    position: absolute;
    display: block;
    width: 0px;
    height: 0px;
    transform: translate(-50%, -50%);
    transition: width 0.8s, height 0.8s;
    border-radius: 50%;
    z-index: 1;
    opacity: 0.95;
    background: rgba(0, 0, 0, 0.7);
  }

  .warp .card:hover span {
    width: 2000px;
    height: 2000px;
  }

  .warp .card .imgBx {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .warp .card .imgBx img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .warp .card .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* display: flex; */
    justify-content: center;
    align-items: center;
    z-index: 1;
  }

  .warp .card .content div {
    padding: 40px;
    color: #fff;
    visibility: hidden;
    opacity: 0;
    transform: translateY(50px);
    transition: 0.2s;
  }

  .warp .card:hover .content div {
    visibility: visible;
    opacity: 1;
    transform: translateY(0px);
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