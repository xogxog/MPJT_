<template>
  <div class="container">
    <!-- 페이지 새로고침을 안함. -->
    <v-form class="container" @submit.prevent>
      <div class="d-flex">
        <v-text-field dark rounded background-color="rgba(255, 255, 255, 0.5)" filled v-model="searchString"
          label="Search the movie" clearable @keyup.enter="searchMovies">
        </v-text-field>
        <v-btn class="mx-2" fab dark color="rgba(255, 255, 255, 0.5)">
          <v-icon dark @click="searchMovies">
            search
          </v-icon>
        </v-btn>
      </div>
    </v-form>

    <div class="warp container d-flex justify-content-around">
      <div class="card" v-for="movie in searchedMovies" :key="movie.id">
        <span></span>
        <div class="imgBx"><img :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" alt="포스터가 없습니다."></div>
        <div class="content" @click="movieDetail(movie.id)">
          <div class="content">
            <h4>{{movie.title}}</h4>
            <p>{{movie.release_date}}</p>
          </div>
        </div>
      </div>
    <div><h3 style="color:gray">{{noSearhMovie}}</h3></div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import jQuery from "jquery";
const $ = jQuery;
window.$ = $;

  export default {
    name: "MovieSearch",
    data : function(){
      return{
        searchString : null, //서치검색어
        searchedMovies : null, // 서치결과
        noSearhMovie :'검색어를 입력해주세요.', // 검색한 영화가 없을 때를 위한 변수
      }
    },
    methods :{
      movieDetail: function (movieid) {
        let movieId = movieid
        this.$store.dispatch('getMovieDetail/setMovieId', movieId)
        this.$router.push({
          name: 'MovieDetail'
        })
      },
      searchMovies : function(){
        // console.log('일하기')
        const API_KEY='33e4ef19e015d915281ddd6881f93178'
        if(this.searchString){
          axios({
            method : 'get',
            url : `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${this.searchString}&page=1`
          })
            .then((res)=>{
              console.log(res.data.results)
              if(res.data.results.length >=1){
                this.$store.dispatch('saveMovies/saveMovies',res.data.results)
                this.searchedMovies= res.data.results
                this.noSearhMovie=null
              }
              else{
                this.noSearhMovie='검색결과가 없습니다.'
                this.searchString=null
              }
            })

        }else{
          alert('검색할 영화를 입력하세요.')
        }
      }
    },
    created:function(){
      $(document).ready(function(x, y) {
      $('.card').on('mouseenter', function(e){
        x = e.pageX - $(this).offset().left,
        y = e.pageY - $(this).offset().top;
        $(this).find('span').css({top:y, left:x})
      })
      $('.card').on('mouseout', function(e){
        x = e.pageX - $(this).offset().left,
        y = e.pageY - $(this).offset().top;
        $(this).find('span').css({top:y, left:x})
      })
    })
    }
  }
  // export function imgHover (x, y) {

  // }
</script>

<style>
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
    margin: 0px;
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

  .warp .card:hover span{
    width: 2000px;
    height: 2000px;
  }

  .warp .card .imgBx{
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




  .v-select.v-select--is-menu-active .v-input__icon--append .v-icon {
    transform: none;
  }
</style>