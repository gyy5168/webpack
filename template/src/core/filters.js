import * as utils from './utils'

export default {
  install: (Vue) => {
    // 时间国际化
    Vue.filter('getDateString', function (date, type, lang) {
      if (!date) {
        return
      }
      let time = utils.stringToDate(date).valueOf()
      let ctime = new Date().setSeconds(new Date().getSeconds() - 1).valueOf()
      time = time > ctime ? ctime : time
      time = new Date(time)
      return window.getDateString(time, type, lang)
    })
    Vue.filter('floorNumber', (number) => {
      return utils.floorNumber(number)
    })
    Vue.filter('parseFloatNumber', (number) => {
      return utils.parseFloatNumber(number)
    })
    Vue.filter('GetAvatarImageFilter', (imageUrl, width, height, quality, scale) => {
      return utils.GetAvatarImageFilter(imageUrl, width, height, quality, scale)
    })
    Vue.filter('GetCommonImageFilter', (imageUrl, width, height, quality, scale) => {
      return utils.GetCommonImageFilter(imageUrl, width, height, quality, scale)
    })
    Vue.filter('GetXuankeImageFilter', (imageUrl, width, height, quality) => {
      return utils.GetXuankeImageFilter(imageUrl, width, height, quality)
    })
    Vue.filter('friendlyDateFilter', (time) => {
      return utils.friendlyDateFilter(time)
    })
    Vue.filter('fomateSort', (time) => {
      return utils.fomateSort(time)
    })
    Vue.filter('fomateLong', (time) => {
      return utils.fomateLong(time)
    })
    Vue.filter('fomateTime', (time) => {
      return utils.fomateTime(time)
    })
    Vue.filter('GetXuanThumbnailFilter', (imageUrl, version) => {
      return utils.GetXuanThumbnailFilter(imageUrl, version)
    })
    Vue.filter('dateToString', (time, format) => {
      return utils.dateToString(time, format)
    })
    Vue.filter('stringToDate', (text) => {
      return utils.stringToDate(text)
    })
  }
}
