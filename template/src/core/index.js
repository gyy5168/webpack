import Vue from 'vue'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n' // 国际化
import filters from '@/core/filters'
import { config, enums, logMap } from '@/configs'
import { isNullOrEmpty, PagingCriteria, getQueryString, setLanguage, trim, animate, goMainStationUrl, loadScript } from './utils'
import { http, loghttp, qidahttp, commonhttp, setToken } from './apiInstances'
import { CreateLog } from '@/services/main.service'
import directives from './directives'

require('./extend')
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'ch',
  messages: locales
})

const setLanguage = type => {
  let lang
  if (type === 1) { // 简体中文
    lang = 'ch'
  } else if (type === 2) { // 繁体中文
    lang = 'ha'
  } else if (type === 3) { // 英文
    lang = 'en'
  }
  i18n.locale = lang
}

// const getUserInfo = () => {
//   GetUserInfo().then((data) => {
//     for (let key in data) {
//       Vue.set(Vue.prototype.$userContent, key, data[key])
//     }
//     store.commit('getUserContent', data)
//   })
// }

const goLogin = () => {
  if (config.isApp) {
    window.yxt.biz.user.logout({cause: 'tokenexpired'})
    return
  }
  // 如果存在returnurl，则不赋值，因为掉接口时是异步操作，可能会写登录界面的地址
  let rurl = window.location.href
  if (!window.getLocalStorage('returnUrl')) {
    window.setLocalStorage('returnUrl', rurl)
  }
  window.location.href = goMainStationUrl()
}
// 不能使用箭头函数，保留this关键字指向vue
const sendBehaviorLog = function (key) {
  let logData = logMap[key] ? Object.assign({}, logMap[key]) : {}
  logData.target = logData.target || this.$route.meta.vcode || this.$route.matched[0].meta.vcode
  if (logData.method) logData.target += logData.method
  logData.orgid = window.getLocalStorage('orgId') || ''
  logData.orgname = window.getLocalStorage('orgName') || ''
  logData.logtitle = 'ACTION' + this.$route.meta.title
  logData.pageuri = this.$route.fullPath
  logData.userid = window.getLocalStorage('userId') || ''
  logData.username = window.getLocalStorage('loginUserName') || ''
  logData.usercnname = window.getLocalStorage('userName') || ''
  logData.useragent = window.navigator.userAgent
  logData.source = config.source
  logData.sex = window.getLocalStorage('token') || ''
  logData.ouid = window.getLocalStorage('ouId') || ''
  logData.ouname = window.getLocalStorage('ouName') || ''
  logData.positionid = logData.target
  let querystring = Object.assign({}, this.$route.params, this.$route.query)
  logData.querystring = Object.keys(querystring).length === 0 ? '' : JSON.stringify(querystring)
  CreateLog(logData, 2)
}

const init = () => {
  window.yxt = window.yxt || {}
  if (process.env.NODE_ENV === 'production') {
    loadScript('https://media1.yunxuetang.cn/yxt/systemfiles/js/h5/tingyun-rum.js')
  }
  Vue.use(Vuex)
  Vue.use(filters)
  Vue.use(scroll)
  Vue.use(directives)

  Vue.prototype.isNullOrEmpty = isNullOrEmpty
  Vue.prototype.PagingCriteria = PagingCriteria
  Vue.prototype.getQueryString = getQueryString
  Vue.prototype.setLanguage = setLanguage
  Vue.prototype.$sendBehaviorLog = sendBehaviorLog
  Vue.prototype.goLogin = goLogin
  Vue.prototype.config = config
  Vue.prototype.enums = enums
  Vue.prototype.trim = trim
  Vue.prototype.animate = animate

  setCurrentLanguage()

  let token
  if (window.isApp) {
    token = window.yxt.token || getQueryString('token')
  }
  if (!token) {
    token = getQueryString('token') || window.getLocalStorage('token')
  }
  if (token) {
    window.setLocalStorage('token', token)
    setToken(token)
  }
  Vue.prototype.$userContent = {}
  // getUserInfo()
}

export { http, loghttp, qidahttp, commonhttp, setToken, init, goLogin }
