import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: {},
  isLogin: false
}

const mutations = {
  setUserInfo (state, user) {
    Object.assign(state.user, user)
  },
  setLoginState (state, statu) {
    state.isLogin = statu
  },
  clearUserInfo (state) {
    state.user = {}
  }
}

const actions = {
  setUserInfo (context, user) {
    context.commit('setUserInfo', user)
  },
  setLoginState (context, statu) {
    context.commit('setLoginState', statu)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
