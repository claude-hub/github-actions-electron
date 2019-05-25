import store from './store'
import router from './router'
import { UserApi } from './api/user'

/** 路由控制 */
router.beforeEach((to, from, next) => {
  next()
  // UserApi.getUserInfo().then(next()).catch(err => {
  //   // console.log(err)
  //   // alert(err)
  //   window.location.href = 'http://localhost:8081/auth/authentication/require'
  // })

  // if (store.getters.access_token) {
  //   next()
  // } else {
  //   if (to.path === '/login') { // 如果是登录页面路径，就直接next()
  //     next()
  //   } else { // 不然就跳转到登录；
  //     next('/login')
  //   }
  // }
})
