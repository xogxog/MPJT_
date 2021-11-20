// import axios from 'axios'
// import _ from 'lodash'
import createPersistedState from "vuex-persistedstate";

const login ={
  plugins: [createPersistedState()],
  namespaced : true,
  state: {  
    isLogin : false,
  },
  mutations: {
    LOGIN_CHECK : function(state, isLogin){
      state.isLogin = isLogin
      // console.log(state.isLogin)
    }
  },
  actions: {
    loginCheck : function({commit}, isLogin){
      commit('LOGIN_CHECK', isLogin)
    }
  },
  getters:{

  }
}

export default login;