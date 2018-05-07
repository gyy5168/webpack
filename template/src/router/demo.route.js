export default [{
  path: '/demo',
  name: 'demo',
  component: resolve => require(['@/view/demo/demo'], resolve),
  redirect: '/demo/index',
  meta: {
    anonymous: true
  },
  children: [{
    path: 'index',
    name: 'demo.index',
    component: resolve => require(['@/view/demo/index'], resolve),
    meta: {
      title: '首页'
    }
  }, {
    path: 'my',
    name: 'demo.my',
    component: resolve => require(['@/view/demo/my'], resolve),
    meta: {
      title: '我的'
    }
  }]
}]
