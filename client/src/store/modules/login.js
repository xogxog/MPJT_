// import axios from 'axios'
// import _ from 'lodash'
import createPersistedState from "vuex-persistedstate";

const login ={
  plugins: [createPersistedState()],
  namespaced : true,
  state: {  
    isLogin : false,
    token : null,
    nickname : null,
  },
  mutations: {
    LOGIN_CHECK : function(state, isLogin){
      state.isLogin = isLogin
      console.log(state.isLogin)
    },
    SET_TOKEN : function(state, token){
      state.token = token
      // console.log(state.token)
    },
    SET_USER_NICK_NAME : function(state, nickname){
      state.nickname = nickname
      // console.log(state.token)
    }
  },
  actions: {
    loginCheck : function({commit}, isLogin){
      commit('LOGIN_CHECK', isLogin)
    },
    setToken : function({commit},token){
      commit('SET_TOKEN',token)
    },
    setUserNickname : function({commit},nickname){
      commit('SET_USER_NICK_NAME',nickname)
    },
  },
  getters:{

  }
}

export default login;