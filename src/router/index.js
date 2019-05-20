import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('../views/admin/layout/index'),
      children: [
        {
          path: '/',
          name: 'adminhome',
          component: () => import('../views/admin/home/index')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/admin/login/index')
    }
  ]
})

export default router
