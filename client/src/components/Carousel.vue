<template>
  <!-- 무비 숫자 카운트..? :count="movieList.length" -->

  <div>
    <carousel-3d class="carousel" :space="280" :width="300" :height="400" :border="1" :display="7" :inverseScaling="200"
      controlsVisible>
      <!-- <slide v-for="(movie, i) in movieList" :key="i" :index="i">
        
      </slide> -->

      <slide class="sld" v-for="(movieItem, index) in movieItems" :key="index" :index="index">
        <span>
        <figure class="snip1504">
          <img :src="movieItem.poster_path" alt="movie-poster">
          <figcaption>
            <h5>{{ movieItem.title }}</h5>
          </figcaption>
          <a src="" @click.prevent="movieDetail(movieItem.movie_id)"></a>
        </figure>
        </span>
      </slide>
    </carousel-3d>
  </div>
</template>

<script>
  import axios from 'axios'
  import {Carousel3d,Slide} from 'vue-carousel-3d';
  import {mapState} from 'vuex'
  export default {
    name: 'Carousel',
    components: {
      Carousel3d,
      Slide,
    },
    methods: {
      movieDetail: function (movieid) {
        if(this.isLogin){
          let movieId = movieid
        // console.log(movieId)
        this.$store.dispatch('getMovieDetail/setMovieId', movieId)
        const API_KEY='33e4ef19e015d915281ddd6881f93178'
        // console.log(this.movieDetail.movie.movie_id)

        axios({
          method : 'get',
          // url : `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
          url : `https://api.themoviedb.org/3/movie/${movieid}/recommendations?api_key=${API_KEY}&language=ko-KR&page=1/`,
          })
          .then((res)=>{
            console.log(res.data.results)
            const recommendMovies = res.data.results.slice(0,6)
            this.$store.dispatch('saveMovies/saveMovies',res.data.results)
            this.$store.dispatch('saveMovies/saveRecommendMovies',recommendMovies)
            this.$store.dispatch('getMovieDetail/movieDetail')
          })
          .then(()=>{
            this.$router.push({name: 'MovieDetail'})
          })
        
        }else{
          alert('로그인 시 열람이 가능합니다.')
        }
        
      },

    },

    computed: {
      ...mapState('getMovies', ['movieItems']),
      ...mapState('login', ['userInfo','isLogin'])
    },

    created: function () {
      this.$store.dispatch('getMovies/getMovie')
    },

  }
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro);
.sld {
  background: rgba(41, 41, 41, 0);
  -webkit-box-reflect: below -5px linear-gradient(transparent, transparent, #0005);

}

.snip1504 {
  /* font-family: 'Source Sans Pro', sans-serif; */
  position: relative;
  overflow: hidden;
  margin: 10px;
  min-width: 230px;
  max-width: 315px;
  width: 100%;
  color: #000000;
  text-align: left;
  font-size: 16px;
  background: linear-gradient(
  rgba(143, 143, 143, 0.3), 
  rgba(0, 0, 0, 0.9));
  /* background: rgba(41, 41, 41, 0.803); */
}

.snip1504 * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.45s ease;
  transition: all 0.45s ease;
}

.snip1504 img {
  vertical-align: top;
  max-width: 100%;
  backface-visibility: hidden;
}

.snip1504 figcaption {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  align-items: center;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.snip1504 h3,
.snip1504 h5 {
  margin: 0;
  opacity: 0;
  letter-spacing: 1px;
}

.snip1504 h3 {
  -webkit-transform: translateY(-100%);
  transform: translateY(-100%);
  text-transform: uppercase;
  font-weight: 400;
}

.snip1504 h5 {
  font-weight: normal;
  /* font-style: italic; */
  color: rgb(255, 255, 255);
  -webkit-transform: translateY(100%);
  transform: translateY(100%);
}

.snip1504 a {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  
}

.snip1504:hover > img,
.snip1504.hover > img {
  opacity: 0.1;
  
}

.snip1504:hover h3,
.snip1504.hover h3,
.snip1504:hover h5,
.snip1504.hover h5 {
  -webkit-transform: translateY(0);
  transform: translateY(0);
  opacity: 1;
}

  /* .carousel {
    z-index: 99;
    width: 100%;
  } */

  .carousel-3d-container figure {
    margin: 0;
  }

  /* .carousel-3d-container figcaption {
    position: absolute;
    color: #fff;
    bottom: 0;
    position: absolute;
    bottom: 0;
    padding: 15px;
    font-size: 12px;
    min-width: 100%;
    box-sizing: border-box;
  } */
</style>