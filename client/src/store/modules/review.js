// import _ from 'lodash'
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

const review ={
  plugins: [createPersistedState()],
  namespaced : true,
  state: {  
    reviewDetail:[]
  },
  mutations: {
    GET_REVIEW_DETAIL : function(state, ReviewDetail){
      state.reviewDetail = ReviewDetail
      // console.log(state.reviewDetail)
    },
    EDIT_REVIEW : function(state, reviewData){
      state.reviewDetail=reviewData
    }
  },
  actions: {
    createReview:function({rootState},reviewData){
      let data = {
        'title' : reviewData.title,
        'content' : reviewData.content,
        'rank' : reviewData.rank,
      }
      axios({
        method : 'post',
        url : `http://127.0.0.1:8000/movie/movie/${reviewData.moviePk}/review/`,
        data : data,
        headers : rootState.login.token,
      })
      .then(()=>{
        // console.log(res.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    getReviewDetail : function({rootState,commit}, reviewPk){
      axios({
        method : 'get',
        url : `http://127.0.0.1:8000/movie/movie/review/${reviewPk}/`,
        headers : rootState.login.token,
      })
      .then((res)=>{
        console.log(res.data)
        commit('GET_REVIEW_DETAIL',res.data)
      })
    },
    editReview : function({rootState,commit},reviewData){
      let data = {
        'title' : reviewData.title,
        'content' : reviewData.content,
        'rank' : reviewData.rank,
      }
      axios({
        method : 'put',
        url : `http://127.0.0.1:8000/movie/movie/review/${reviewData.reviewPk}/`,
        data : data,
        headers : rootState.login.token,
      })
      .then((res)=>{
        commit('EDIT_REVIEW', res.data)
      })
    }
  },
  getters:{

  }
}

export default review;