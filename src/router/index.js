import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/views/mainPage'
import BlogPage from '@/views/blogPage'
import WritePage from '@/views/writePage'
import LoginPage from '@/views/loginPage'
import RegisterPage from '@/views/regPage'
import SelfPage from '@/views/selfPage'
import MsgPage from '@/views/msgPage'
import AdminPage from '@/views/adminPage'
import WordsPage from '@/views/WordsPage'
import LoadingPage from '@/views/loadingPage'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  },
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/blog/:type',
      name: 'ArticlePage',
      component: MainPage
    },
    {
      path: '/content/:id',
      name: 'BlogPage',
      component: BlogPage
    },
    {
      path: '/write/:id',
      name: 'WritePage',
      component: WritePage,
      meta: {
        isBloger: true
      }
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
    },
    {
      path: '/message/:name',
      name: 'MsgPage',
      component: MsgPage,
      meta: {
        isLogin: true
      }
    },
    {
      path: '/admin',
      name: 'AdminPage',
      component: AdminPage
    },
    {
      path: '/words',
      name: 'WordsPage',
      component: WordsPage
    },
    {
      path: '/loading',
      name: 'LoadingPage',
      component: LoadingPage
    }
  ]
})

export default router
