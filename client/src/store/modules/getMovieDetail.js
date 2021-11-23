// import _ from 'lodash'
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

const getMovieDetail ={
  plugins: [createPersistedState()],
  namespaced : true,
  state: {  
    moviePk : null,
    movieDetail : [],
    likeMovie : null,
  },
  mutations: {
    SET_MOVIE_ID : function(state, moviePk){
      state.moviePk=moviePk
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
        // 좋아요 상태 바꿔주기
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
      })
    },
    likeUnlikeMovie : function({rootState,dispatch}, moviePk){
      const data ={
        'userid': rootState.login.userInfo.id
      }
      axios({
        method : 'post',
        url : `http://127.0.0.1:8000/movie/movie/${moviePk}/like/`,
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