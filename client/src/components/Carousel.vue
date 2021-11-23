<template>
  <!-- 무비 숫자 카운트..? :count="movieList.length" -->

  <div>
    <carousel-3d class="carousel" :space="280" :width="300" :height="400" :border="1" :display="7" :inverseScaling="200"
      controlsVisible>
      <!-- <slide v-for="(movie, i) in movieList" :key="i" :index="i">
        
      </slide> -->

      <slide v-for="(movieItem, index) in movieItems" :key="index" :index="index">
        <figure>
          <a src="" @click.prevent="movieDetail(movieItem.id)">
            <img :src="movieItem.poster_path" alt="movie-poster">
          </a>
          <figcaption>
            <h5>{{ movieItem.title }}</h5>
          </figcaption>
        </figure>
      </slide>
    </carousel-3d>
  </div>
</template>

<script>
  import {Carousel3d,Slide} from 'vue-carousel-3d';
  import {mapState} from 'vuex'
  export default {
    name: 'Carousel',
    components: {
      Carousel3d,
      Slide,
    },
    methods: {
      movieDetail: function (id) {
        let moviePk = id
        this.$store.dispatch('getMovieDetail/setMovieId', moviePk)
        this.$router.push({
          name: 'MovieDetail'
        })
      },

    },

    computed: {
      ...mapState('getMovies', ['movieItems'])
    },

    created: function () {
      this.$store.dispatch('getMovies/getMovie')
    },

  }
</script>

<style scoped>
  .carousel {
    z-index: 99;
    width: 100%;
  }

  .carousel-3d-container figure {
    margin: 0;
  }

  .carousel-3d-container figcaption {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    bottom: 0;
    position: absolute;
    bottom: 0;
    padding: 15px;
    font-size: 12px;
    min-width: 100%;
    box-sizing: border-box;
  }
</style>