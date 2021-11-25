import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import index from '../views/index.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import MovieDetail from '../views/MovieDetail.vue'
import MovieBoxOffice from '../views/MovieBoxOffice.vue'
import MovieSearch from '../views/MovieSearch.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/main',
    name: 'Main',
    component: Main
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/movieDetail',
    name: 'MovieDetail',
    component: MovieDetail,
    props :true,
  },
  {
    path: '/movieBoxOffice',
    name: 'MovieBoxOffice',
    component: MovieBoxOffice,
  },
  {
    path: '/movieSearch',
    name: 'MovieSearch',
    component: MovieSearch,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
