import { http, qidahttp, loghttp } from '@/core/'

// 行为日志:type=2
export const CreateLog = (data, type) => {
  let url = 'log'
  if (type) url += '?type=' + type
  return loghttp.post(url, data)
}
// 获取当前用户信息
export const GetUserInfo = () => {
  return http.get('userinfo')
}
// 企大获取用户信息
export const GetQidaUserInfo = () => {
  return qidahttp.get('userinfo')
}