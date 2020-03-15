import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import Master from './components/layouts/Master'
import {store} from './store/store'
import { ValidationProvider,ValidationObserver, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

Vue.prototype.$Fire = new Vue();
Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes 
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        path: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.loggedIn) {
      next({
        path: 'todo',
      })
    } else {
      next()
    }
  }  else {
    next() // make sure to always call next()!
  }
})

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})


// Add a rule.
// No message specified.
extend('email', email);

// Override the default message.
extend('required', {
  ...required,
  message: 'This field is required'
});

extend('password', {
  validate: value => value.length >= 8,
  message: 'The password field must be at least 6 characters'
})

// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);




new Vue({
  render: h => h(Master),
  router,
  store: store,
}).$mount('#app')
