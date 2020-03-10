import Vue from 'vue'
import App from './App.vue'
import {store} from './store/store'

Vue.prototype.$Fire = new Vue();

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store: store
}).$mount('#app')
