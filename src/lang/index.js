import Vue from 'vue'
import VueI18n from 'vue-i18n'

import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhCNLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enLocale from './en'
import zhCNLocale from './zh-CN'

Vue.use(VueI18n)

Vue.config.lang = 'zh-CN'

// vue-i18n 6.x+写法
Vue.locale = () => {}
const messages = {
  'zh-CN': Object.assign(zhCNLocale, elementZhCNLocale),
  'en': Object.assign(enLocale, elementEnLocale)
}
const i18n = new VueI18n({
  locale: 'zh-CN',
  messages
})

export default i18n
