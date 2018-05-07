import Toast from './toast'
import Vue from 'vue'

const showToast = () => {
  return function (message, duration) {
    let ToatConstructor = Vue.extend(Toast)
    let instance = new ToatConstructor({
      el: document.createElement('div')
    })

    instance.message = this.$t ? this.$t(message) : message
    document.body.appendChild(instance.$el)
    instance.timer = setTimeout(() => {
      instance.close()
    }, duration * 1000 || 1500)
  }
}
const install = (Vue) => {
  Vue.prototype.toast = showToast()
  window.toast = showToast()
}

Toast.install = install

export default Toast
