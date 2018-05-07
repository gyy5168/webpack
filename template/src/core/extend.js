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
