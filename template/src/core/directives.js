export default {
  install: (Vue) => {
    Vue.directive('image-error', (el, binding) => {
      el.onerror = () => {
        let image = binding.value || 'https://picobd-bbs.yxt.com/common/imgs/covers/fail_img.png'
        let img = new Image()
        img.onload = () => {
          el.src = img.src
        }
        img.src = image
      }
    })
    Vue.directive('avatar-error', (el, binding) => {
      el.onerror = () => {
        let image = binding.value || 'https://picobd-sk.yxt.com/common/imgs/default_head.png'
        let img = new Image()
        img.onload = () => {
          el.src = img.src
        }
        img.src = image
      }
    })
    Vue.directive('auto-focus', {
      inserted: (el) => {
        el.focus()
      }
    })
  }
}
