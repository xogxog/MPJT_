// import _ from 'lodash'
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

const getMovieDetail ={
  plugins: [createPersistedState()],
  namespaced : true,
  state: {  
    moviePk : null,
    movieDetail : [],
  },
  mutations: {
    SET_MOVIE_ID : function(state, moviePk){
      state.moviePk=moviePk
    },
    MOVIE_DETAIL : function(state, movieDetail){
      state.movieDetail=movieDetail
    }
  },
  actions: {
    setMovieId : function({commit}, moviePk){
      commit('SET_MOVIE_ID',moviePk)
    },
    movieDetail : function({rootState,commit,state}){
      axios({
        method : 'get',
        url : `http://127.0.0.1:8000/movie/movie/${state.moviePk}`,
        headers : rootState.login.token,
      })
      .then((res)=>{
        // console.log(res.data)
        commit('MOVIE_DETAIL',res.data)
      })
    }
  },
  getters:{

  }
}

export default getMovieDetail;