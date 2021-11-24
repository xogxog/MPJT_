// import axios from 'axios'
// import _ from 'lodash'
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

const otherUserProfile ={
  plugins: [createPersistedState()],
  namespaced : true,
  state: {  
    otherUserProfile:[],
  },
  mutations: {
    GET_OTHER_USER_INFO:function(state, otherUserProfile){
      state.otherUserProfile=otherUserProfile
    }
  },
  actions: {
    getOtherUserInfo : function({rootState, commit},otherUserPk){
      axios({
        method : 'post',
        url : `http://127.0.0.1:8000/accounts/profile/${otherUserPk}/`,
        data : {
          'user_pk' : otherUserPk
        },
        headers : rootState.login.token,
      })
      .then((res)=>{
        commit('GET_OTHER_USER_INFO', res.data)
      })
    }
  },
  getters:{

  }
}

export default otherUserProfile;