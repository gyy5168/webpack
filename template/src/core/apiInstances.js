import axios from 'axios'
import { apiUrl, locales, config } from '@/configs/'
import { goLogin } from './index'

let excGet = (httpAxios) => {
  // 重置了GET方法，包装params
  httpAxios.oldGet = httpAxios.get
  httpAxios.get = (url, data) => {
    return httpAxios.oldGet(url, {params: data})
  }
}
const http = axios.create({
  'baseURL': apiUrl.main,
  'headers': {
    'Content-Type': 'application/json;charset=UTF-8',
    'source': config.source
  },
  validateStatus: (status) => {
    return status < 400
  }
})

const loghttp = axios.create({
  'baseURL': apiUrl.log,
  'headers': {
    'Content-Type': 'application/json;charset=UTF-8',
    'source': config.source
  },
  validateStatus: (status) => {
    return status < 400
  }
})

const qidahttp = axios.create({
  'baseURL': apiUrl.qida,
  'headers': {
    'Content-Type': 'application/json;charset=UTF-8',
    'source': config.source
  },
  validateStatus: (status) => {
    return status < 400
  }
})

const commonhttp = axios.create({
  'baseURL': apiUrl.qida,
  'headers': {
    'Content-Type': 'application/json;charset=UTF-8',
    'source': config.source
  },
  validateStatus: (status) => {
    return status < 400
  }
})

excGet(http)
excGet(loghttp)
excGet(qidahttp)
excGet(commonhttp)

const req = {
  'resolve': config => {
    return config
  },
  'reject': error => {
    // eslint-disable-next-line
    return Promise.reject('req', error)
  }
}

const res = {
  'resolve': response => {
    if (response.status === 201) {
      response.data = response.data || {}
      response.data.Location = response.headers.location
    }
    return response.data
  },
  'reject': error => {
    if (error.response && error.response.data && error.response.data.error && error.response.data.error.key) {
      let errorText = locales[config.lang][error.response.data.error.key]
      if (errorText && window.toast) {
        window.toast(errorText)
      }
    }
    if (error.response.status === 401) {
      goLogin()
      // eslint-disable-next-line
      return Promise.reject(null)
    }
    // eslint-disable-next-line
    return Promise.reject(error.response.data)
  }
}

// Add a request interceptor
http.interceptors.request.use(req.resolve, req.reject)
loghttp.interceptors.request.use(req.resolve, req.reject)
qidahttp.interceptors.request.use(req.resolve, req.reject)
commonhttp.interceptors.request.use(req.resolve, req.reject)
// Add a response interceptor
http.interceptors.response.use(res.resolve, res.reject)
loghttp.interceptors.response.use(res.resolve, res.reject)
qidahttp.interceptors.response.use(res.resolve, res.reject)
commonhttp.interceptors.response.use(res.resolve, res.reject)

let setToken = function (token) {
  http.defaults.headers.common['token'] = token
  qidahttp.defaults.headers.common['token'] = token
  commonhttp.defaults.headers.common['token'] = token
}

export { http, loghttp, qidahttp, commonhttp, setToken }
