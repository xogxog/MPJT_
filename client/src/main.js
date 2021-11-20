import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuetify from 'vuetify/lib'
import VueParticles from 'vue-particles'
import Carousel3d from 'vue-carousel-3d';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

Vue.config.productionTip = false
// 배경
Vue.use(VueParticles)
Vue.use(Vuetify)
Vue.use(Carousel3d);


export default new Vuetify({
  theme: { dark: true },
  icons: {
    iconfont: 'mdi' // 'mdiSvg',   || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
