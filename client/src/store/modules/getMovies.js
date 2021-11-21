import axios from 'axios'
// import _ from 'lodash'
import createPersistedState from "vuex-persistedstate";

const getMovies ={
  plugins: [createPersistedState()],
  namespaced : true,
  state: {  
    movieItems :[]
  },
  mutations: {
    GET_MOVIE : function(state, MovieItems){
      state.movieItems = MovieItems
      console.log(MovieItems)
    }
  },
  actions: {
    getMovie:function({rootState,commit}){
      // console.log(rootState.login.token)
      console.log(rootState.login.isLogin)
      let isLogin={
        'isLogin' : rootState.login.isLogin
      }
      console.log(isLogin)
      axios({
        method : 'get',
        url : 'http://127.0.0.1:8000/movie/movie/',
        params : isLogin,
        headers : rootState.login.token,
      })
      .then((res)=>{
        // console.log(res.data)
        commit('GET_MOVIE', res.data)
      })
    }
  },
  getters:{

  }
}

export default getMovies;