import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueParticles from 'vue-particles'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

Vue.config.productionTip = false
// 배경
Vue.use(VueParticles)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
