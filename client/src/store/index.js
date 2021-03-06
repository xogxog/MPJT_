import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import profile from './modules/profile'


import getMovies from './modules/getMovies'
import saveMovies from './modules/saveMovies'
import getMovieDetail from './modules/getMovieDetail'

import review from './modules/review'
import comment from './modules/comment'
import recommendMovies from './modules/recommendMovies'
import createPersistedState from "vuex-persistedstate";



Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login,
    profile,
    getMovies,
    saveMovies,
    getMovieDetail,
    review,
    comment,
    recommendMovies,
  },
})

