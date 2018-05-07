import Vue from 'vue'
import Vuex from 'vuex'
import scroll from './modules/scroll'
const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    scroll
  },
  state: {
    pageTitle: ''
  },
  mutations: {
    setPageTitle (state, title) {
      state.pageTitle = title
    }
  },
  actions: {
    setPageTitle (state, title) {
      store.commit('setPageTitle', title)
    }
  },
  strict: debug
})
export default store
