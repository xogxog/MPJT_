import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import getMovies from './modules/getMovies'
import getMovieDetail from './modules/getMovieDetail'
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
    getMovies,
    getMovieDetail,
  },
})

