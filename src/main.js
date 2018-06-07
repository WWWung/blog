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
      store.dispatch('setUserInfo', d.data)
      store.dispatch('setLoginState', true)
    } else {
      // store.dispatch('setLoginState', false)
      // store.dispatch('clearUserInfo')
    }
    // next()
  }).catch((err) => {
    console.log(err)
    // next()
  })
  if (to.meta.isBloger) {
    // console.log(1)
    if (store.state.user.power === '0') {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

/*
*@  关于登录逻辑的疑问：
*@    目前这个webapp的用户信息是通过路由钩子，在进入任何一个页面之前都先用ajax请求获取服务端的登陆信息然后存到vuex里面(cookie里面存有sessionID，后端根据请求的cookie中的sessionID去session里取到相应的用户信息然后返回)
*@    但是由于ajax请求是异步的，所以在请求结果返回之前就会加载组件(除非把next函数在请求成功或者请求失败的回调函数里面调用，但是担心这样影响页面加载速度)
*@    所以问题就在于，如果一个页面(例如：www.quanxian.com)需要用户有某个权限才能进去，那么我就要在进入这个路由之前通过用户信息判断他是否具有这个权限，但是在判断的时候用户信息还不存在（原因是上面提到的ajax异步，返回请求需要时间）
*@    所以我永远无法进入这个页面，因为无法做出有效判断该用户是否拥有权限
*@    产生问题的原因在于vuex是打开该网页之后才存在的并且是空的
*@    那么是否在别的位置例如sessionStorage或者localStorage里面同样保存下来用户信息
*@      sessionStorage 由于sessionStorage的特性是关闭窗口之后清空，所以当我重新打开窗口并且直接输入www.quanxian.com的时候又会产生上文的异步矛盾
*@      localStorage  localStorage在保存时限上没有限制，那么如果在localStorage里保存用户的信息，怎么保证与cookie的有效时限一致？即在cookie失效之后也立刻删除掉localStorage
*@
*/

// console.log(store.state)
