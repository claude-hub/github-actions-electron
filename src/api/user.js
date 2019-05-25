import { server } from '../utils/server'

/**
 * 用户api接口
 */
export class UserApi {
  static login(params) {
    return server({
      url: '/auth/oauth/token',
      headers: {
        isToken: false
      },
      method: 'post',
      params: params
    })
  }
  static getUserList(params) {
    return server.get('/admin/api/sysUser/query', params)
  }

  static getUserInfo() {
    return server.get('/admin/api/sysUser/info')
  }
}
