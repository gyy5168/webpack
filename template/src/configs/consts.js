export const enums = {
  moduleName: 'app',
  functionName: {
    image: 'image',
    theme: 'theme',
    avatar: 'avatar',
    video: 'video',
    voice: 'voice'
  },
  appClient: {
    ios: 'ios',
    android: 'android',
    other: 'pc or other'
  },
  platform: {
    app: 'app',
    weixin: 'weixin',
    ding: 'ding',
    h5: 'html5',
    pc: 'pc'
  }
}
const appSource = 100
const ua = navigator.userAgent
const isApp = !!ua.match(/yxtapp/i)
const isWx = !!ua.match(/MicroMessenger/i)
const isDing = !!ua.match(/DingTalk/i)
const isAndroid = /Android/i.test(ua)
const isIos = /iPhone|iPad|iPod/i.test(ua)
export const config = {
  isDebug: process.env.NODE_ENV === 'development' && process.env.RELEASE_ENV === 'local',
  isApp: isApp,
  isWx: isWx,
  isDing: isDing,
  android: isAndroid,
  ios: isIos,
  appClient: isAndroid ? enums.appClient.android : (isIos ? enums.appClient.ios : enums.appClient.other),
  source: isApp ? (isAndroid ? (appSource + 3) : (appSource + 2)) : (isWx ? (appSource + 4) : (appSource + 6)),
  lang: 'ch',
  platform: isApp ? enums.platform.app : (isWx ? enums.platform.weixin : (isDing ? enums.platform.ding : enums.platform.h5))
}
