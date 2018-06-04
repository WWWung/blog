import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: {},
  blogInfo: {},
  isLogin: false,
  mark: {
    time: null,
    random: null
  }
}

const mutations = {
  getBlogInfo (state, blog) {
    state.blogInfo.id = blog.id
    state.blogInfo.title = blog.title
    state.blogInfo.content = blog.content
    state.blogInfo.time = blog.time
  },
  getUserInfo (state, user) {
    Object.assign(state.user, user)
  },
  setLoginState (state, statu) {
    state.isLogin = statu
  },
  clearUserInfo (state) {
    state.user = {}
  },
  markVuex (state) {
    state.mark.time = Date.now().valueOf()
    state.mark.random = Math.random()
    console.log(state.mark.time)
  }
}

const actions = {
  getUserInfo (context, user) {
    context.commit('getUserInfo', user)
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
