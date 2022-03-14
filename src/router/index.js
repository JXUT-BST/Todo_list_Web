import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Register from '../components/Register.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: 'login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home },
  { path: '/register', component: Register }
]

const router = new VueRouter({
  routes
})

// 导航守卫
router.beforeEach(function (to, from, next) {
  if (to.path === '/home') {
    const token = localStorage.getItem('token');
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
