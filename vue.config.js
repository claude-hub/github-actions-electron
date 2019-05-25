const url = 'http://localhost:80'
// 基础路径，发布前修改这里,当前配置打包出来的资源都是相对路径
const publicPath = './'
module.exports = {
  publicPath: publicPath,
  lintOnSave: true,
  productionSourceMap: false,
  // 配置转发代理
  devServer: {
    proxy: {
      '/auth': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/auth': '/auth'
        }
      },
      '/admin': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/admin': '/admin'
        }
      },
      '/captcha': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/captcha': '/captcha'
        }
      }
    }
  }
}
