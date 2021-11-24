// import _ from 'lodash'
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

const getMovieDetail ={
  plugins: [createPersistedState()],
  namespaced : true,
  state: {  
    movieId : null,
    movieDetail : [],
    likeMovie : null,
  },
  mutations: {
    SET_MOVIE_ID : function(state, movieId){
      state.movieId=movieId
    },
    MOVIE_DETAIL : function(state, movieDetail){
      state.movieDetail=movieDetail
      // console.log(state.movieDetail)
    },
    MOVIE_LIKE_UNLIKE : function(state,likeMovie){
      state.likeMovie=likeMovie
      // console.log(state.likeMovie)
    }
  },
  actions: {
    setMovieId : function({commit}, movieId){
      commit('SET_MOVIE_ID',movieId)
    },
    movieDetail : function({rootState,commit,state}){
      // console.log(state.movieId)
      axios({
        method : 'get',
        url : `http://127.0.0.1:8000/movie/movie/${state.movieId}`,
        headers : rootState.login.token,
      })
      .then((res)=>{
        commit('MOVIE_DETAIL',res.data)
        // 좋아요 상태 바꿔주기
        if(state.movieDetail.movie.like_users.length===0){
          let likeMovie=false
            commit('MOVIE_LIKE_UNLIKE',likeMovie)
        }else{
          for(let like_user of state.movieDetail.movie.like_users){
            if(like_user.id===rootState.login.userInfo.id){
              let likeMovie=true
              commit('MOVIE_LIKE_UNLIKE',likeMovie)
              break
            }else{
              let likeMovie=false
              commit('MOVIE_LIKE_UNLIKE',likeMovie)
              break
            }
          }
        }
      })
    },
    likeUnlikeMovie : function({rootState,dispatch}, movieId){
      const data ={
        'userid': rootState.login.userInfo.id
      }
      axios({
        method : 'post',
        url : `http://127.0.0.1:8000/movie/movie/${movieId}/like/`,
        data : data,
        headers : rootState.login.token,
      })
      .then(()=>{
        dispatch('movieDetail')
      })
    }
  },
  getters:{

  }
}

export default getMovieDetail;