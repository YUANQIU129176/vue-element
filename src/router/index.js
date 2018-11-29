import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import login from '../views/login.vue'
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
  }
  ]
})
