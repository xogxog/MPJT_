import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import test from '../views/test.vue'
import index from '../views/index.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import MovieDetail from '../views/MovieDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/test',
    name: 'test',
    component: test
  },
  {
    path: '/main',
    name: 'Main',
    component: Main
  },
  {
    path: '/login',
    name: 'Loing',
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
    component: MovieDetail
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
