import Vue from 'vue'
import { locales } from '@/configs/locales'
import { config } from '@/configs/consts'
export const isNullOrEmpty = (s) => {
  if (s === null || s === '') {
    return true
  } else {
    return false
  }
}

export const isString = (str) => {
  if (typeof str === 'string') {
    return true
  } else {
    return false
  }
}

// 分页
export const PagingCriteria = (pageIndex, pageSize, sort, mode) => {
  let paging = {}
  paging.limit = pageSize
  paging.offset = (pageIndex - 1) * pageSize
  if (!isNullOrEmpty(sort)) {
    paging.orderby = sort
  }
  if (!isNullOrEmpty(mode)) {
    paging.direction = mode
  }
  return paging
}
export const setLanguage = type => {
  let lang
  if (type === 1) { // 简体中文
    lang = 'ch'
  } else if (type === 2) { // 繁体中文
    lang = 'ha'
  } else if (type === 3) { // 英文
    lang = 'en'
  }
  Vue.config.lang = lang
  config.lang = lang
  Vue.locale(lang, locales[lang])
}
// 拼接URL参数
export const linkSubString = (url, data) => {
  if (url === null || url === '') {
    return url
  }
  let queryString = ''
  if (typeof data === 'object') {
    for (var i in data) {
      queryString += i + '=' + data[i] + '&'
    }
  }
  if (url.indexOf('?') > url.indexOf('/')) {
    url += '&'
  } else {
    url += '?'
  }
  if (queryString !== '') {
    queryString = queryString.substr(0, queryString.length - 1)
  }
  url += queryString
  return url
}

/**
 * 求一个最接近它的整数，它的值小于或等于这个浮点数
 */
export const floorNumber = number => {
  return Math.floor(number) ? Math.floor(number) : 0
}

/**
 * 解析一个字符串，并返回一个浮点数。
 */
export const parseFloatNumber = number => {
  return parseFloat(number) ? parseFloat(number) : 0
}

// 用户头像
export const GetAvatarImageFilter = (imageUrl, width, height, quality, scale) => {
  if (!imageUrl) {
    imageUrl = 'https://picobd-sk.yxt.com/common/imgs/default_head.png'
  }
  let imgeMogrList = []
  // 默认给80%的画质
  if (quality > 0) {
    imgeMogrList.push('q_' + quality)
  } else {
    imgeMogrList.push('q_80')
  }
  if (width > 0) {
    imgeMogrList.push('w_' + width)
  }
  if (height > 0) {
    imgeMogrList.push('h_' + height)
  }
  if (width && height && scale) {
    imgeMogrList.push('s_' + scale)
  }
  imageUrl += (imageUrl.indexOf('@') > 0 ? '|' : '@')
  imageUrl += imgeMogrList.join(',')
  return imageUrl
}

// 图片
export const GetCommonImageFilter = (imageUrl, width, height, quality, scale) => {
  if (!imageUrl) {
    imageUrl = 'https://picobd-bbs.yxt.com/common/imgs/covers/fail_img.png'
  }
  if (imageUrl.indexOf('xuanyes.com') > -1 || (imageUrl.indexOf('.yunxuetang.') === -1 && imageUrl.indexOf('.yxt.') === -1)) {
    return GetXuankeImageFilter(imageUrl, width, height, quality)
  }
  let imgeMogrList = []
  // 默认给80%的画质
  if (quality > 0) {
    imgeMogrList.push('q_' + quality)
  } else {
    imgeMogrList.push('q_80')
  }
  if (width > 0) {
    imgeMogrList.push('w_' + width)
  }
  if (height > 0) {
    imgeMogrList.push('h_' + height)
  }
  if (width && height && scale) {
    imgeMogrList.push('s_' + scale)
  }
  imageUrl += (imageUrl.indexOf('@') > 0 ? '|' : '@')
  imageUrl += imgeMogrList.join(',')
  return imageUrl
}

// 炫课图片(阿里云)
export const GetXuankeImageFilter = (imageUrl, width, height, quality) => {
  if (!imageUrl || imageUrl.indexOf('.yunxuetang.') > -1 || imageUrl.indexOf('.yxt.') > -1) {
    return GetCommonImageFilter(imageUrl, width, height, quality)
  }
  if (imageUrl.indexOf('xuanyes.com') === -1) {
    return imageUrl
  }
  imageUrl = imageUrl.split('?')[0]
  imageUrl = imageUrl.split('@')[0]
  let paramStr = '?x-oss-process=image'
  let resizeParams = ['resize']
  let qualityParams = ['quality']
  // 默认给80%的画质
  if (quality > 0) {
    qualityParams.push('q_' + quality)
  } else {
    qualityParams.push('q_80')
  }
  if (width > 0) {
    resizeParams.push('w_' + width)
  }
  if (height > 0) {
    resizeParams.push('h_' + height)
  }
  imageUrl += paramStr
  if (width || height) {
    imageUrl += '/' + resizeParams.join(',')
  }
  imageUrl += '/' + qualityParams.join(',')
  return imageUrl
}

/**
 *  短日期,如2018年8月20日
 */

export const fomateSort = (time) => {
  let friendlyDate = ''
  if (time === '' || time === undefined) {
    return friendlyDate
  } else {
    time = time.split('.', 1)[0]
    time = time.replace(new RegExp(/(-)/g), '/')
  }
  let createDate = new Date(time)
  friendlyDate = createDate.FormatDateStr()
  return friendlyDate
}

/**
 *  短日期,如2018-8-20
 */

export const fomateTime = (time) => {
  let friendlyDate = ''
  if (time === '' || time === undefined) {
    return friendlyDate
  } else {
    time = time.split('.', 1)[0]
    time = time.replace(new RegExp(/(-)/g), '/')
  }
  let createDate = new Date(time)
  friendlyDate = createDate.FormatTim()
  return friendlyDate
}

/**
 *  长日期,如2018-8-20 08:10
 */

export const fomateLong = (time) => {
  let friendlyDate = ''
  if (time === '' || time === undefined) {
    return friendlyDate
  } else {
    time = time.split('.', 1)[0]
    time = time.replace(new RegExp(/(-)/g), '/')
  }
  let createDate = new Date(time)
  friendlyDate = createDate.FormatDateLong()
  return friendlyDate
}

export const friendlyDateFilter = (time) => {
  let friendlyDate = ''
  if (time === '' || time === undefined) {
    return friendlyDate
  } else {
    time = time.split('.', 1)[0]
    time = time.replace(new RegExp(/(-)/g), '/')
  }
  let currTimeStr = new Date().Format('yyyy/MM/dd HH:mm:ss') // 当前时间字符串
  let now = new Date(currTimeStr) // 当前时间对象
  let createDate = new Date(time)
  let dayDiff = new Date(time).dateDiff('d', now) // 天数之差
  let minutesDiff = new Date(time).dateDiff('n', now) // 分钟之差
  let hoursDiff = new Date(time).dateDiff('h', now) // 小时之差
  let weeksDiff = new Date(time).dateDiff('w', now) // 星期之差
  if (Math.abs(dayDiff) <= 30) {
    // 上下三十天内
    if (dayDiff === 0) {
      // 当天
      if (minutesDiff === 0) {
        friendlyDate = '现在'
      } else if (Math.abs(minutesDiff) > 60) { // minutesDiff  Math.abs(hoursDiff) >= 1
        // 当天的前后一小时之外
        if (hoursDiff < 0) {
          friendlyDate = Math.abs(hoursDiff) + '小时后'
        } else {
          friendlyDate = Math.abs(hoursDiff) + '小时前'
        }
      } else {
        // 一小时之内
        if (minutesDiff < 0) {
          friendlyDate = Math.abs(minutesDiff) + '分钟后'
        } else {
          friendlyDate = Math.abs(minutesDiff) + '分钟前'
        }
      }
    } else if (dayDiff < 0) {
      // 后三十天内
      if (createDate.getFullYear() === now.getFullYear()) {
        // 同一年
        if (weeksDiff === -1) {
          friendlyDate = '下周' + createDate.getWeekDay()
        } else {
          // n天后
          friendlyDate = Math.abs(dayDiff) + '天后'
        }
      } else {
        // n天后
        friendlyDate = Math.abs(dayDiff) + '天后'
      }
    } else {
      // 前三十天内
      if (createDate.getFullYear() === now.getFullYear()) {
        if (weeksDiff === 1) {
          friendlyDate = '上周' + createDate.getWeekDay()
        } else {
          friendlyDate = Math.abs(dayDiff) + '天前'
        }
      } else {
        friendlyDate = Math.abs(dayDiff) + '天前'
      }
    }
  } else {
    if (createDate.getFullYear() !== now.getFullYear()) {
      friendlyDate = createDate.FormatDateStr()
    } else {
      friendlyDate = createDate.FormatDateStr()
    }
  }
  return friendlyDate
}

export const GetXuanThumbnailFilter = (imageUrl, version) => {
  if (imageUrl.indexOf('http://') === -1 && imageUrl.indexOf('https://')) {
    return '//pic.xuanyes.com/works/defaultcourse.png@!small?version=2'
  }
  imageUrl = imageUrl.replace('http://', 'https://')
  imageUrl = imageUrl.replace('!middle', '!small')
  if (imageUrl.indexOf('?') === -1) {
    if (imageUrl.indexOf('@') === -1) {
      imageUrl = imageUrl + '@!small'
    }
    if (version) {
      imageUrl = imageUrl + '?version=' + version
    }
  }
  return imageUrl
}

export const dateToString = (text, format) => {
  if (isNullOrEmpty(text)) {
    return ''
  }
  if (isString(text)) {
    text = text.replace(/\.\d+/, '').replace(/-/g, '/')
  }
  let date = new Date(text)
  if (isNullOrEmpty(date) || date === 'Invalid Date') {
    return ''
  }
  let dateStr = format
  dateStr = dateStr
    .replace('yyyy', date.getFullYear())
    .replace('MM', (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1))
    .replace('dd', (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()))
    .replace('HH', (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()))
    .replace('mm', (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()))
    .replace('ss', (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()))
  dateStr = dateStr
    .replace('M', date.getMonth() + 1)
    .replace('d', date.getDate())
    .replace('H', date.getHours())
    .replace('m', date.getMinutes())
    .replace('s', date.getSeconds())
  return dateStr
}

// 日期字符串变为日期格式
export const stringToDate = (text) => {
  if (!isNullOrEmpty(text) && isString(text)) {
    text = text.replace(/\.\d+/, '').replace(/-/g, '/')
    return new Date(text)
  }
  return text
}

export const getQueryString = (name) => {
  try {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    let r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return decodeURIComponent(r[2])
    }
    r = window.location.hash.substr(window.location.hash.indexOf('?') + 1).match(reg)
    if (r != null) {
      return decodeURIComponent(r[2])
    }
    return null
  } catch (e) {
    return null
  }
}

export const seperate = (time) => {
  let year = time.getFullYear()
  let month = time.getMonth()
  let day = time.getDate()
  let hour = time.getHours()
  let minute = time.getMinutes()
  let second = time.getSeconds()
  return {year, month, day, minute, second, hour}
}

export const objectToString = (obj) => {
  return obj.year + '-' + (obj.month + 1) + '-' + obj.day +
  ' ' + obj.hour + ':' + obj.minute + ':' + obj.second
}

export const hasClass = (el, className) => {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export const addClass = (el, className) => {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export const goMainStationUrl = (page = 'login') => {
  let protocol = window.location.protocol
  let domainName = window.location.hostname
  return `${protocol}//${domainName}/#/${page}`
}

let trimFun = ''.trim
export const trim = trimFun && !trimFun.call('\uFEFF\xA0') ? function (e) {
  return e == null ? '' : trimFun.call(e)
} : function (e) {
  return e == null ? '' : (e + '').replace(
    /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
}

export const animate = function (obj, json, sp, fn) {
  let interval = 10
  let lastIcur
  if (!sp) sp = 0.1
  clearInterval(obj.timer)
  function getStyle (obj, arr) {
    if (obj.currentStyle) {
      return obj.currentStyle[arr]
    } else {
      return document.defaultView.getComputedStyle(obj, null)[arr]
    }
  }

  obj.timer = setInterval(function () {
    var flag = true
    for (var arr in json) {
      var icur = 0
      if (arr === 'opacity') {
        icur = Math.round(parseFloat(getStyle(obj, arr)) * 100)
      } else if (arr === 'scrollTop') {
        icur = parseInt(obj.scrollTop)
      } else {
        icur = parseInt(getStyle(obj, arr))
      }
      if (isNaN(icur)) icur = json[arr]
      var speed = (json[arr] - icur) * sp
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
      if (lastIcur !== icur && icur !== json[arr]) {
        flag = false
      }
      lastIcur = icur
      if (arr === 'opacity') {
        obj.style.filter = 'alpha(opacity : \'+(icur + speed)+\' )'
        obj.style.opacity = (icur + speed) / 100
      } else if (arr === 'scrollTop') {
        obj.scrollTop = icur + speed
      } else {
        obj.style[arr] = icur + speed + 'px'
      }
    }

    if (flag) {
      clearInterval(obj.timer)
      if (fn) {
        fn()
      }
    }
  }, interval)
}

export const loadScript = (url) => {
  if (!url) {
    return
  }
  let script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = url
  document.body.appendChild(script)
}
