import Vue from 'vue'
import VueI18n from 'vue-i18n'

import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhCNLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enLocale from './en'
import zhCNLocale from './zh-CN'
import { getLanguage } from '@/utils/utiltools'

Vue.use(VueI18n)

let lang = getLanguage()

Vue.config.lang = lang

// vue-i18n 6.x+写法
Vue.locale = () => {}
const messages = {
  'zh-CN': Object.assign(zhCNLocale, elementZhCNLocale),
  'en': Object.assign(enLocale, elementEnLocale)
}
const i18n = new VueI18n({
  locale: lang,
  messages
})

export default i18n
