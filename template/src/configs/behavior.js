const method = {
  visit: '000', // 访问
  add: '001', // 增
  delete: '002', // 删
  modify: '003', // 改
  select: '004', // 查
  collect: '018', // 收藏
  praise: '019', // 点赞
  comment: '021', // 评论
  publish: '034', // 发布
  search: '056', // 搜索
  share: '057', // 分享
  cancel: '066', // 取消
  reply: '106', // 回复
  settop: '107', // 置顶
  close: '134', // 关闭
  expand: '136', // 展开
  collapse: '137', // 收起
  clear: '138', // 清空
  accept: '141', // 采纳
  recommend: '142', // 推荐
  highlight: '143', // 加精
  follow: '144' // 关注
}

const description = {
  Single: 'Single', // 单个操作对象
  List: 'List' // 批量操作对象
}

export const vcodes = {
  app_home: '000000000',
  app_course: '000000001',
  app_my: '000000002'
}
/*
  target对应页面编号(vcode)，可省略(子路由不配置vcode会默认取父路由vcode)
*/
export const logMap = {
  search: {
    // target: vcodes.app_home,
    method: method.search,
    description: description.list,
    logcontent: '搜索'
  }
}
