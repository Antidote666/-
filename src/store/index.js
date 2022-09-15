import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HEIMATOUTIAO_TOKEN',
      storage: localStorage,
      reducer({ tokenObj, myChannels, histories }) {
        return { tokenObj, myChannels, histories }
      }
    })
  ],
  state: {
    tokenObj: {},
    myChannels: [],
    histories: []
  },
  getters: {
    isLogin: (state) => !!state.tokenObj.token
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
      console.log(token)
    },
    SET_MY_CHANNELS(state, channel) {
      state.myChannels = channel
    },
    SET_HISTORIES(state, histories) {
      state.histories = histories
    }
  },
  actions: {},
  modules: {}
})
