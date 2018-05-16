import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: {},
  blogInfo: {},
  isLogin: false
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
  }
}

export default new Vuex.Store({
  state,
  mutations
})
