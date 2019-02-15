import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'

Vue.use(Router)
var router = new Router({
  routes: [
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: './welcome',
      children: [{
        path: '/welcome',
        component: Welcome
      }]
    }
  ]
})
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (to.path === '/login') {
    return next()
  }

  // 访问login，判断token
  var token = window.sessionStorage.getItem('token')
  if (!token) {
    return next('/login')
  }
  next()
})
export default router
