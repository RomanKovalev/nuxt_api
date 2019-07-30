import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    url: 'https://api.cdnjs.com/'
  },
  mutations: {
  },
  getters: {
    url(state) {
      return state.url
    }
  }
})

export default store
