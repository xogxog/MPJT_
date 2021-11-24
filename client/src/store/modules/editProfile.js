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
    editProfileImg : function(){
      axios({
        // methods : 'update',
        // url : `http://127.0.0.1:8000/accounts/profile/${rootState}/editProfileImage/`,
        // data :{
        //   'file' : file,
        // },
        // headers: rootState
      })
    }

  },
  getters:{

  }
}

export default editProfile;