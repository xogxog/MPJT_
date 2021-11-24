// import _ from 'lodash'
import axios from "axios"
import createPersistedState from "vuex-persistedstate";

const review ={
  plugins: [createPersistedState()],
  namespaced : true,
  state: {  
    reviewDetail:[],
    likeReview : false,
  },
  mutations: {
    GET_REVIEW_DETAIL : function(state, ReviewDetail){
      state.reviewDetail = ReviewDetail
      // console.log(state.reviewDetail)
    },
    EDIT_REVIEW : function(state, reviewData){
      state.reviewDetail=reviewData
      // console.log(state.reviewDetail)
    },
    DELETE_REVIEW : function(state){
      state.reviewDetail=[]
    },
    REVIEW_LIKE_UNLIKE : function(state, likeReview){
      state.likeReview=likeReview
      // console.log(state.likeReview)
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
        url : `http://127.0.0.1:8000/movie/movie/${reviewData.movieId}/review/`,
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
    getReviewDetail : function({rootState,state,commit}, reviewPk){
      axios({
        method : 'get',
        url : `http://127.0.0.1:8000/movie/movie/review/${reviewPk}/`,
        headers : rootState.login.token,
      })
      .then((res)=>{
        commit('GET_REVIEW_DETAIL',res.data)
        // 좋아요 상태 바꾸기
        if(state.reviewDetail.like_users.length===0){
          let likeReview=false
            commit('REVIEW_LIKE_UNLIKE', likeReview)
        }else{
          for(let like_user of state.reviewDetail.like_users){
            if(like_user.id===rootState.login.userInfo.id){
              let likeReview=true
              commit('REVIEW_LIKE_UNLIKE', likeReview)
              break
            }else{
              let likeReview=false
              commit('REVIEW_LIKE_UNLIKE', likeReview)
            }
          }
        }
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
        // this.getReviewDetail({rootState,commit},reviewData.reviewPk)
      })
    },
    deleteReview : function({rootState,commit},reviewPk){
      axios({
        method : 'delete',
        url : `http://127.0.0.1:8000/movie/movie/review/${reviewPk}/`,
        headers : rootState.login.token,
      })
      .then(()=>{
        commit('DELETE_REVIEW')
      })
    },
    likeUnlikeReview : function({rootState, dispatch}, reviewPk){
      const data ={
        'userid': rootState.login.userInfo.id
      }
      axios({
        method:'post',
        url : `http://127.0.0.1:8000/movie/movie/review/${reviewPk}/like/`,
        data : data,
        headers : rootState.login.token,
      })
      .then(()=>{
        dispatch('getReviewDetail', reviewPk)
      })
    }
  },
  getters:{
    
  }
}

export default review;