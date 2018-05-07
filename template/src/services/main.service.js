import { http, qidahttp, loghttp } from '@/core/'

// 获取微信配置
export const GetWxJsconfig = (data) => {
  return http.post('weixin/jsconfig', data)
}
// 行为日志:type=2
export const CreateLog = (data, type) => {
  let url = 'log'
  if (type) url += '?type=' + type
  return loghttp.post(url, data)
}
// 获取当前用户信息
export const GetUserInfo = () => {
  return qidahttp.get('userinfo')
}
