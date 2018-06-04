// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store/store'
import './assets/css/clear.css'

axios.defaults.withCredentials = true
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

const url = 'http://127.0.0.8:3000/isLogin'

router.beforeEach((to, from, next) => {
  axios.post(url).then((d) => {
    if (d.data !== '未登录') {
      store.dispatch('getUserInfo', d.data)
      store.dispatch('setLoginState', true)
    } else {
      // store.dispatch('setLoginState', false)
      // store.dispatch('clearUserInfo')
    }
    next()
  }).catch((err) => {
    console.log(err)
    next()
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// console.log(store.state)
