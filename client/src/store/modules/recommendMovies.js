import axios from 'axios'
import createPersistedState from "vuex-persistedstate";

const recommendMovies ={
  plugins: [createPersistedState()],
  namespaced : true,
  state: {  
    
  },
  mutations: {
    
  },
  actions: {
    getRecommend: function ({ dispatch }, movieid) {
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
          dispatch('saveMovies/saveMovies',res.data.results, { root: true })
          dispatch('saveMovies/saveRecommendMovies',recommendMovies)
          dispatch('getMovieDetail/movieDetail', null, { root: true })

        })
        .then(()=>{
          this.$router.push({name: 'MovieDetail'})
      })
    }
  },
  getters:{

  }
}

export default recommendMovies;