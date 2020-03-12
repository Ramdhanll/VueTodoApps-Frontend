import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import Master from './components/layouts/Master'
import {store} from './store/store'

Vue.prototype.$Fire = new Vue();
Vue.config.productionTip = false

Vue.use(VueRouter)




const router = new VueRouter({
  mode: 'history',
  routes 
})

new Vue({
  render: h => h(Master),
  router,
  store: store,
}).$mount('#app')
