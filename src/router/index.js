import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import login from '../views/login.vue'
// 引入home页面组件
import home from '@/views/Home.vue'
Vue.use(Router)
export default new Router({
  routes: [{
    path: '/',
    redirect: { 'name': 'login' }
  },
  {
    name: 'login',
    path: '/login',
    component: login
  },
    // home页面的路由
  {
    name: 'home',
    path: '/home',
    component: home
  }
  ]
})
