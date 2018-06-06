import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/views/mainPage'
import BlogPage from '@/views/blogPage'
import WritePage from '@/views/writePage'
import LoginPage from '@/views/loginPage'
import RegisterPage from '@/views/regPage'
import SelfPage from '@/views/selfPage'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/content/:id',
      name: 'BlogPage',
      component: BlogPage
    },
    {
      path: '/write',
      name: 'WritePage',
      component: WritePage
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage
    },
    {
      path: '/self/:name',
      name: 'SelfPage',
      component: SelfPage,
      meta: {
        isLogin: true
      }
    }
  ]
})

export default router
