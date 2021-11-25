import axios from 'axios'
// import _ from 'lodash'
import createPersistedState from "vuex-persistedstate";

const comment ={
  plugins: [createPersistedState()],
  namespaced : true,
  state: {  
    comments:[]
  },
  mutations: {
    CREATE_COMMENT: function(state, comment){
      state.comments.unshift(comment)
      // console.log(state.comments)
    },
    GET_COMMENTS : function(state, comments){
      state.comments=comments
      // console.log(comments)
    },
    DELETE_COMMENT : function(state, comment){
      const index = state.comments.indexOf(comment)
      state.comments.splice(index,1)
    }
  },
  actions: {
    createComment : function({rootState,commit}, commentData){
      const data ={
        'comment' : commentData.comment
      }
      axios({
        method :'post',
        url : `http://127.0.0.1:8000/movie/movie/review/${commentData.reviewPk}/comment/`,
        data : data,
        headers : rootState.login.token,
      })
      .then((res)=>{
        commit('CREATE_COMMENT',res.data)
      })
    },
    getComments : function({rootState,commit}, reviewPk){
      axios({
        method : 'get',
        url : `http://127.0.0.1:8000/movie/movie/review/${reviewPk}/comment/`,
        headers : rootState.login.token,
      })
      .then((res)=>{
        commit(('GET_COMMENTS'),res.data)
      })
      .catch(()=>{
        alert('댓글을 가지고오지 못했습니다.')
      })
    },
    deleteComment : function({rootState,commit}, comment){
      const commentPk = comment.id
      axios({
        method : 'delete',
        url : `http://127.0.0.1:8000/movie/movie/review/comment/${commentPk}/`,
        headers : rootState.login.token,
      })
      .then(()=>{
        commit('DELETE_COMMENT', comment)
      })
    }
  },
  getters:{

  }
}

export default comment;