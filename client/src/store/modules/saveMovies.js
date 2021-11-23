import axios from 'axios'
import createPersistedState from "vuex-persistedstate";

const saveMovies ={
  plugins: [createPersistedState()],
  namespaced : true,
  state: {  

  },
  mutations: {

  },
  actions: {
    saveMovies : function({rootState}, movies){
      axios({
        method : 'post',
        url :'http://127.0.0.1:8000/movie/movie/save_movies/',
        data : movies,
        headers : rootState.login.token,
      })
      .then(()=>{
        console.log('성공성공')
      })
      .catch(()=>{
        console.log('실패실패~!~!')
      })
    }
  },
  getters:{

  }
}

export default saveMovies;