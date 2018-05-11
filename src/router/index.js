import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/views/mainPage'
import BlogPage from '@/views/blogPage'
import WritePage from '@/views/writePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/content',
      name: 'BlogPage',
      component: BlogPage
    },
    {
      path: '/write',
      name: 'WritePage',
      component: WritePage
    }
  ]
})
