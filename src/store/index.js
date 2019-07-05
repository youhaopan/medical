import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    indexInfo: false
  },
  mutations: {
    showIndexInfo(state){
      state.indexInfo = true
    },
    closeIndexInfo(state){
      state.indexInfo = false
    }
  },
  actions: {
  }
})

export default store
