// import _ from 'lodash'
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

const review ={
  plugins: [createPersistedState()],
  namespaced : true,
  state: {  

  },
  mutations: {

  },
  actions: {
    createReview:function({rootState,commit},reviewData){
      let data = {
        'title' : reviewData.title,
        'content' : reviewData.content,
        'rank' : reviewData.rank,
      }
      axios({
        method : 'post',
        url : `http://127.0.0.1:8000/movie/movie/${reviewData.moviePk}/review/`,
        data : data,
        headers : rootState.login.token,
      })
      .then((res)=>{
        console.log(res.data)
        commit()
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  },
  getters:{

  }
}

export default review;