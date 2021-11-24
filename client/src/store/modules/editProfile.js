import axios from 'axios'
// import _ from 'lodash'
import createPersistedState from "vuex-persistedstate";

const editProfile ={
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
      .then(res =>{
        console.log(res.data)
        dispatch('login/getUserInfo',null,{root:true})
      })
      .catch(()=>{
        alert('실패....')
      })
    }
    

  },
  getters:{

  }
}

export default editProfile;