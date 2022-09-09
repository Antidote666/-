import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HEIMATOUTIAO_TOKEN',
      storage: localStorage,
      reducer(tokenObj) {
        return tokenObj
      }
    })
  ],
  state: {
    tokenObj: {}
  },
  getters: {
    isLogin: (state) => !!state.tokenObj.token
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
      console.log(token)
    }
  },
  actions: {},
  modules: {}
})
