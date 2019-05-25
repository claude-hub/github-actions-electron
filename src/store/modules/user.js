import {
  setStore, getStore, removeStore,
  setCookies, getCookies, removeCookies
} from '../../utils/storage'
import { UserApi } from '../../api/user'
import { MenuApi } from '../../api/menu'
import { Msg } from '../../utils/message'

const user = {
  state: {
    /** token */
    access_token: getCookies('access_token') || null,
    refresh_token: getCookies('refresh_token') || null,
    expires_in: getCookies('expires_in') || null,
    user_id: getCookies('user_id') || '',
    /** 用户登陆角色信息 */
    userInfo: getStore('userInfo') || {},
    /** 是否登陆 */
    isLogin: getStore('isLogin') || false,
    /** 权限列表 */
    permissions: getStore('permissions') || [],
    /** 用户菜单列表 **/
    userMenus: getStore('userMenu') || []
  },
  /** 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation */
  mutations: {
    SET_USER_ID(state, user_id) {
      state.user_id = user_id
      setCookies('user_id', user_id)
    },
    SET_ACCESS_TOKEN(state, access_token) {
      state.access_token = access_token
      setCookies('access_token', access_token)
    },
    SET_REFRESH_TOKEN(state, refresh_token) {
      state.refresh_token = refresh_token
      setCookies('refresh_token', refresh_token)
    },
    SET_EXPIRES_IN(state, expires_in) {
      state.expires_in = expires_in
      setCookies('expires_in', expires_in)
    },
    SET_USER_INFO(state, user_info) {
      state.userInfo = user_info
      setStore('userInfo', user_info)
    },
    SET_PERMISSIONS(state, permissions) {
      state.permissions = permissions
      setStore('permissions', permissions)
    },
    SET_MENU(state, userMenu) {
      state.userMenu = userMenu
      setStore('userMenu', userMenu)
    },
    REMOVE_TOKEN(state) {
      removeCookies('token')
    },
    REMOVE_MENU_MSG(state) {
      removeStore('userInfo')
      removeStore('permissions')
      removeStore('openedPages')
      removeStore('currentPage')
      removeStore('userMenu')
    }
  },
  /** Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。 */
  actions: {
    /** 根据用户名登录 */
    LoginByUsername({ commit }, params) {
      params.scope = 'server'
      params.grant_type = 'password'
      params.client_id = 'qx'
      params.client_secret = 'qx'
      return new Promise((resolve, reject) => {
        UserApi.login(params).then((res) => {
          const data = res.data
          commit('SET_ACCESS_TOKEN', data.access_token)
          commit('SET_REFRESH_TOKEN', data.refresh_token)
          commit('SET_EXPIRES_IN', data.expires_in)
          commit('SET_USER_ID', data.user_id)
          resolve()
        }).catch(err => {
          Msg.error(err)
          reject(err)
        })
      })
    },
    /** 获取用户信息 **/
    GetUserInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        UserApi.getUserInfo(params).then((res) => {
          const data = res.data.data || {}
          console.log(data)
          resolve(data)
        }).catch((err) => {
          Msg.error(err)
          reject(err)
        })
      })
    },
    /** 获取用户动态菜单 */
    GetUserMenus({ commit }, params) {
      return new Promise((resolve, reject) => {
        MenuApi.userMenus().then((res) => {
          console.log(res)
          commit('SET_MENU', res.data.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    LogOut({ commit }) {
      commit('REMOVE_TOKEN')
      commit('REMOVE_MENU_MSG')
    }
  }
}
export default user
