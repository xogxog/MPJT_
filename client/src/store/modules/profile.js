import axios from 'axios'
// import _ from 'lodash'
import createPersistedState from "vuex-persistedstate";

const profile ={
  plugins: [createPersistedState()],
  namespaced : true,
  state: {
  },
  mutations: {
  },
  actions: {
    editProfileImg : function({rootState,dispatch}, file){
      let data = new FormData()
      data.append('file', file)
      axios({
        method : 'post',
        url : `http://127.0.0.1:8000/accounts/profile/${rootState.login.userInfo.id}/editProfileImage/`,
        data : data,
        headers : {
          'content-type': 'multipart/form-data',
          'Authorization': rootState.login.token.Authorization,
        },
      })
      .then(() =>{
        dispatch('login/getUserInfo',null,{root:true})
      })
      .catch(()=>{
        alert('실패....')
      })
    },
    likeUnlikeUser : function({rootState,dispatch},userProfile_pk){
      axios({
        method : 'post',
        url :  `http://127.0.0.1:8000/accounts/${userProfile_pk}/follow/`,
        headers : rootState.login.token,
      })
      .then(()=>{
        dispatch('login/getOtherUserInfo',userProfile_pk,{root:true})
      })
    }

  },
  getters:{

  }
}

export default profile;