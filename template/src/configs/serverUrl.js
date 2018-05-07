const apiUrl = (process.env.NODE_ENV === 'production')
  ? ((process.env.RELEASE_ENV === 'simulation')
    ? {
      qida: 'https://api-qida1.yunxuetang.cn/v1/',
      main: 'https://api-qida1.yunxuetang.cn/v1/',
      common: 'https://api-component.yxt.com/v1/',
      log: 'https://log-common.yunxuetang.cn/logapi/v1/'
    }
    : {
      qida: 'https://api-qidatestin.yunxuetang.cn/v1/',
      main: 'https://api-qidatestin.yunxuetang.cn/v1/',
      common: 'https://api-component.yxt.com/v1/',
      log: 'https://log-common.yunxuetang.cn/logapi/v1/'
    })
  : {
    qida: 'https://devinner.yunxuetang.com.cn/qidaapi/v1/',
    main: 'https://devinner.yunxuetang.com.cn/qidaapi/v1/',
    common: 'https://devinner.yunxuetang.com.cn/componentapi/v1/',
    log: 'https://log-qida.yunxuetang.com.cn/'
  }

const imageBaseUrl = process.env.NODE_ENV === 'production'
  ? 'https://picobd-bbs.yxt.com/'
  : 'https://picobd-bbs-test.yxt.com/test/'

export {apiUrl, imageBaseUrl}
