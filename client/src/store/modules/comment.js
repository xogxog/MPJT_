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
      state.comments.push(comment)
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
        console.log(res.data)
        commit('CREATE_COMMENT',res.data)
      })
    }
  },
  getters:{

  }
}

export default comment;