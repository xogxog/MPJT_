import axios from 'axios'
// import _ from 'lodash'
import createPersistedState from "vuex-persistedstate";

const login ={
  plugins: [createPersistedState()],
  namespaced : true,
  state: {  
    isLogin : false,
    token : null,
    // nickname : null,
    userInfo : null, // user의 id,nickname,poster_path,username 
  },
  mutations: {
    LOGIN_CHECK : function(state, isLogin){
      state.isLogin = isLogin
      if(isLogin==false){
        state.userInfo = null
      }
      // console.log(state.isLogin)
    },
    SET_TOKEN : function(state, token){
      state.token = token
      // console.log(state.token)
    },
    SET_USER_INFO : function(state, userInfo){ // 맨처음 로그인했을때
      state.userInfo = userInfo
      // console.log(state.userInfo)
    },
    GET_USER_INFO : function(state, userInfo){ // 내 프로필조회
      state.userInfo = userInfo
      console.log(state.userInfo)
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
    },
    getUserInfo : function({rootState,commit,state}){ // 내 프로필조회
      const username={
        'username': state.userInfo.username
      }
      axios({
        method : 'get',
        url : 'http://127.0.0.1:8000/accounts/login/',
        params : username,
        headers : rootState.login.token,
      })
      .then((res)=>{
        console.log(res.data)
        commit('GET_USER_INFO',res.data)
      })
    },
  },
  getters:{

  }
}

export default login;