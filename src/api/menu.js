import { server } from '../utils/server'

/**
 * 用户api接口
 */
export class MenuApi {
  static userMenus (params) {
    return server.get('/admin/api/sysMenu/userMenus', params)
  }
}
