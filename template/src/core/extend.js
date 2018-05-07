/* eslint-disable no-extend-native */
// 数组移除某条数据
Array.prototype.remove = obj => {
  for (let i = 0; i < this.length; i++) {
    let temp = this[i]
    if (!isNaN(obj)) {
      temp = i
    }
    if (temp === obj) {
      for (let j = i; j < this.length; j++) {
        this[j] = this[j + 1]
      }
      this.length = this.length - 1
    }
  }
}
// 设置cookie
window.setCookie = function (cname, cvalue) {
  document.cookie = cname + '=' + cvalue + ';'
}
// 获取cookie
window.getCookie = function (cname) {
  var result = null
  var myCookie = '' + document.cookie + ';'
  var searchName = '' + cname + '='
  var startOfCookie = myCookie.indexOf(searchName)
  var endOfCookie
  if (startOfCookie !== -1) {
    startOfCookie += searchName.length
    endOfCookie = myCookie.indexOf(';', startOfCookie)
    result = (myCookie.substring(startOfCookie, endOfCookie))
  }
  return result
}
// 清除cookie
window.clearCookie = function (name) {
  window.setCookie(name, '')
}
// 取缓存value
window.getLocalStorage = function (key) {
  var value
  try {
    localStorage.setItem('TestKey', '123')
    value = localStorage.getItem(key)
  } catch (e) {
    value = window.getCookie(key)
  }
  return value
}
// 设置缓存值
window.setLocalStorage = function (key, value) {
  try {
    localStorage.setItem(key, value)
  } catch (e) {
    window.setCookie(key, value)
  }
}
window.removeLocalStorage = function (key) {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    window.clearCookie(key, '')
  }
}
