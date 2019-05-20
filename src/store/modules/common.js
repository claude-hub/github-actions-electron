import { setStore, getStore, removeStore, setCookies } from '../../utils/storage'

const common = {
  state: {
    langId: 1,
    /** 菜单是否缩放 **/
    isCollapse: false,
    /** 是否全屏 **/
    isFullScreen: false,
    /** 是否锁屏 **/
    isLock: getStore('isLock') || false,
    /** 锁屏密码 **/
    lockPassword: getStore('lockPassword'),
    /** 主题色 **/
    theme: getStore('theme') || '#409EFF',
    /** 语言设置 **/
    language: 'zh-CN'
  },
  mutations: {
    SET_COLLAPSE: (state, action) => {
      state.isCollapse = !state.isCollapse
    },
    SET_FULL_SCREEN: (state, action) => {
      state.isFullScreen = !state.isFullScreen
    },
    SET_LOCK: (state, action) => {
      state.isLock = true
      setStore('isLock', state.isLock)
    },
    SET_THEME: (state, color) => {
      state.theme = color
      setStore('theme', state.theme)
    },
    SET_LOCK_PASSWORD: (state, lockPassword) => {
      state.lockPassword = lockPassword
      setStore('lockPassword', state.lockPassword)
    },
    CLEAR_LOCK: (state, action) => {
      state.isLock = false
      state.lockPasswd = ''
      removeStore('lockPassword')
      removeStore('isLock')
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      setCookies('language', language)
    }
  },
  actions: {
    SetCollapseState ({ commit }) {
      commit('SET_COLLAPSE')
    },
    SetLanguage ({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    SetFullScreen ({ commit }) {
      commit('SET_FULL_SCREEN')
    }
  }
}
export default common
