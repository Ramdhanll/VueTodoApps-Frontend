import App from './App.vue'
import LandingPage from './components/marketing/LandingPage'
import About from './components/marketing/About'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

const routes = [
  { path:'/', component: LandingPage, name:'home'},
  { path:'/todo', component: App, name:'todo' },
  { path:'/about', component: About, name:'about' },
  { path:'/login', component: Login, name:'login' },
  { path:'/register', component: Register, name:'register' },
]

export default routes