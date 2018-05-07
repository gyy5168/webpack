import Vue from 'vue'
import Router from 'vue-router'
import { goLogin } from '@/core'
import { CreateLog } from '@/services/main.service'
import { config, vcodes } from '@/configs'
import store from '@/store'
import demoRoute from './demo.route'
Vue.use(Router)

const route = [{
  path: '/',
  redirect: '/index'
}, {
  path: '/index',
  name: 'index',
  component: resolve => require(['@/view/index'], resolve),
  meta: {
    title: '首页',
    vcode: vcodes.app_home
  }
}, {
  path: '/course',
  name: 'course',
  component: resolve => require(['@/view/course.vue'], resolve),
  meta: {
    title: '搜索',
    vcode: vcodes.app_course,
    keepAlive: true
  }
}, {
  path: '/my',
  name: 'my',
  component: resolve => require(['@/view/my.vue'], resolve),
  meta: {
    title: '搜索',
    vcode: vcodes.bbs_search
  }
}]
const debugLoginRoute = [{
  path: '/debug/login',
  name: 'debugLogin',
  component: resolve => require(['@/view/login'], resolve),
  meta: {
    title: '调试登录',
    anonymous: true
  }
}]
let routes = route
if (config.isDebug) {
  routes = [...routes, ...debugLoginRoute, ...demoRoute]
}
const router = new Router({
  hashbang: true,
  history: true,
  linkActiveClass: 'active', // 当前路由默认添加的类名
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (store.state.scroll.positions[to.name]) {
        return store.state.scroll.positions[to.name]
      }
      return { x: 0, y: 0 }
    }
  }
})

router.updateScrollPosition = (route) => {
  let positionInfo = {
    name: route.name,
    position: {
      x: 0,
      y: document.documentElement.scrollTop || document.body.scrollTop
    }
  }
  store.dispatch('scroll/updateScrollPosition', positionInfo)
}

router.createAccessLog = (route) => {
  let token = window.getLocalStorage('token')
  if (token && route.meta.vcode) {
    let param = {
      orgid: window.getLocalStorage('orgId') || '',
      orgname: window.getLocalStorage('orgName') || '',
      logtitle: 'ACCESS' + route.meta.title,
      target: route.meta.target,
      pageuri: route.fullPath,
      userid: window.getLocalStorage('userId') || '',
      username: window.getLocalStorage('loginUserName') || '',
      usercnname: window.getLocalStorage('userName') || '',
      useragent: window.navigator.userAgent,
      source: config.source,
      sex: window.getLocalStorage('token') || '',
      ouid: window.getLocalStorage('ouId') || '',
      ouname: window.getLocalStorage('ouName') || '',
      positionid: route.meta.target,
      positionname: window.getLocalStorage('positionName') || ''
    }
    let querystring = route.params
    param.querystring = Object.keys(querystring).length === 0 ? '' : JSON.stringify(route.params)
    CreateLog(param)
  }
}

// route hook
router.beforeEach((to, from, next) => {
  if (from.meta.keepAlive) {
    router.updateScrollPosition(from)
  }
  // 路由跳转时判断需不需要登录
  if (to.matched.some(record => record.meta.anonymous)) {
    next()
  } else {
    if (!window.getLocalStorage('token')) {
      if (config.isDebug) {
        router.push({name: 'debugLogin'})
      } else {
        goLogin()
      }
    } else {
      next()
    }
  }
})
router.setTitle = (title) => {
  document.title = title
  store.dispatch('setPageTitle', title)
  if (config.isApp && window.yxt && window.yxt.ui) {
    window.yxt.ui.navigation.setTitle({param: {title: title}})
  }
  if (config.isDing) {
    window.dd.ready(() => {
      setTimeout(() => {
        window.dd.biz.navigation.setTitle({
          title: title
        })
      }, 0)
    })
  }
}
router.afterEach((route) => {
  let title = route.meta.title
  if (route.matched.length && route.matched[0].name === 'demo') {
    title = 'Demo-' + title
  }
  router.setTitle(title)
  // router.createAccessLog(route)
})
router.back = () => {
  window.history.back()
}
export default router
