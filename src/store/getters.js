export const getters = {
  user_id: state => state.user.user_id,
  userInfo: state => state.user.userInfo,
  isLogin: state => state.user.isLogin,
  access_token: state => state.user.access_token,
  userMenus: state => state.user.userMenus,

  langId: state => state.common.langId,
  isCollapse: state => state.common.isCollapse,
  isFullScreen: state => state.common.isFullScreen,
  isLock: state => state.common.isLock,
  lockPassword: state => state.common.lockPassword,
  theme: state => state.common.theme,
  language: state => state.common.language,

  openedPages: state => state.page.openedPages,
  currentPage: state => state.page.currentPage
}
