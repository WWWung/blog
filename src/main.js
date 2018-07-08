// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store/store'
import './assets/css/clear.css'
import VueSocketio from 'vue-socket.io'
import socketio from 'socket.io-client'

import Prism from 'tinymce/plugins/codesample/Prism/prism.js'
Vue.prototype.Prism = Prism

const io = socketio('http://127.0.0.8:3000/')
Vue.use(VueSocketio, io)

axios.defaults.withCredentials = true
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

const url = 'http://127.0.0.8:3000/isLogin'

// router.beforeEach((to, from, next) => {
//   axios.post(url).then((d) => {
//     if (d.data !== '未登录') {
//       store.dispatch('setUserInfo', d.data)
//       store.dispatch('setLoginState', true)
//     } else {
//       // store.dispatch('setLoginState', false)
//       // store.dispatch('clearUserInfo')
//     }
//     // next()
//   }).catch((err) => {
//     console.log(err)
//     // next()
//   })
//   if (to.meta.isBloger) {
//     // console.log(1)
//     if (store.state.user.power === '0') {
//       next()
//     } else {
//       next('/login')
//     }
//   } else {
//     next()
//   }
// })

/*
*@  采取的判断是否登录方法：登陆过后会在服务端把用户信息存在session里，同时生成一个sessionID并通过cookie保存在浏览器上，下次打开页面的时候，向服务端发送一个请求，服务端判断请求的cookie里包含的sessionID
*@  如果cookie不存在或者sessionID不存在，则返回一条信息‘未登录’，否则去session里根绝sessionID取得对应的用户信息然后返回到前端
*@  判断store里是否有已登录的状态，如果有，则不需要从服务端获取用户信息，直接判断要去的页面是否需要博主权限，如果是博主，则直接跳转，否则回到首页
*@  如果store里面没有已登录的状态，通过ajax到服务端判断是否有cookie，如果有，根据cookie取session里获取用户信息并返回，在store里设置状态已登录，并且存下用户信息，然后在需要权限判断的页面前判断，如果满足权限，跳转，否则回到首页
*@  如果store里面没有已登录的状态，也没有cookie，则说明没有登录，此时去任何需要权限的页面都直接重定向到登录页面
*/
router.beforeEach((to, from, next) => {
  if (store.state.isLogin) {
    io.emit('login', {
      ioId: io.id,
      userId: store.state.user.id
    })
    if (to.meta.isBloger) {
      if (store.state.user.power === '0') {
        next()
      } else {
        next('/')
      }
    } else {
      next()
    }
  } else {
    axios.post(url).then((d) => {
      if (d.data === '未登录') {
        io.emit('login', {
          ioId: io.id,
          userId: 0
        })
        if (to.meta.isBloger) {
          next('/login')
        } else {
          next()
        }
      } else {
        io.emit('login', {
          ioId: io.id,
          userId: d.data.id
        })
        store.dispatch('setUserInfo', d.data)
        store.dispatch('setLoginState', true)
        if (to.meta.isBloger) {
          if (d.data.power === '0') {
            next()
          } else {
            next('/')
          }
        } else {
          next()
        }
      }
    }).catch(err => {
      console.log(err)
      next()
    })
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
