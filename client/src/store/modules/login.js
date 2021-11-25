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
    userProfile :null,
    user_like_unlike : null,
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
    SET_USER_INFO : function(state, userInfo){ // 맨처음 로그인했을때 내 정보 저장
      state.userInfo = userInfo
      // console.log(state.userInfo)
    },
    GET_USER_INFO : function(state, userInfo){ // 내 프로필조회
      state.userProfile = userInfo
      // console.log(state.userInfo)
    },
    GET_OTHER_USER_INFO:function(state, userProfile){ // 다른 사람 프로필 조회
      state.userProfile=userProfile
    },
    USER_LIKE_UNLIKE : function(state,user_like_unlike){
      state.user_like_unlike=user_like_unlike
    }
    
  },
  actions: {
    loginCheck : function({commit}, isLogin){
      commit('LOGIN_CHECK', isLogin)
    },
    setToken : function({commit},token){
      commit('SET_TOKEN',token)
    },
    setUserInfo : function({commit}, userInfo){ // 현재 로그인한 사람의 정보
      commit('SET_USER_INFO',userInfo)
    },
    getUserInfo : function({rootState,commit,state}){ // 내 프로필 가져오기
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
    getOtherUserInfo : function({rootState, commit},otherUserPk){ // 다른사람 프로필 가져오기
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
        // console.log(res.data)
        if(res.data.followers.length===0){
          commit('USER_LIKE_UNLIKE',false)
        }else{
          for(let follower of res.data.followers){
            if(follower===rootState.login.userInfo.id){
              commit('USER_LIKE_UNLIKE',true)
              break
            }else{
              commit('USER_LIKE_UNLIKE',false)
            }
          }
        }
      })
    },
  },
  getters:{

  }
}

export default login;