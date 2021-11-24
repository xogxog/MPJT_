import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import editProfile from './modules/editProfile'


import getMovies from './modules/getMovies'
import saveMovies from './modules/saveMovies'
import getMovieDetail from './modules/getMovieDetail'

import review from './modules/review'
import comment from './modules/comment'
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
    editProfile,
    getMovies,
    saveMovies,
    getMovieDetail,
    review,
    comment,
  },
})

