// import axios from 'axios'
// import _ from 'lodash'
import createPersistedState from "vuex-persistedstate";

const login ={
  plugins: [createPersistedState()],
  namespaced : true,
  state: {  
    isLogin : false,
    token : null,
    // nickname : null,
    userInfo : [], // user의 id,nickname,poster_path,username 
  },
  mutations: {
    LOGIN_CHECK : function(state, isLogin){
      state.isLogin = isLogin
      // console.log(state.isLogin)
    },
    SET_TOKEN : function(state, token){
      state.token = token
      // console.log(state.token)
    },
    SET_USER_INFO : function(state, userInfo){
      state.userInfo = userInfo
    },
  },
  actions: {
    loginCheck : function({commit}, isLogin){
      commit('LOGIN_CHECK', isLogin)
    },
    setToken : function({commit},token){
      commit('SET_TOKEN',token)
    },
    setUserInfo : function({commit}, userInfo){
      commit('SET_USER_INFO',userInfo)
    }
  },
  getters:{

  }
}

export default login;