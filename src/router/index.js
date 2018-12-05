import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import login from '../views/login.vue'
// 引入home页面组件
import home from '@/views/Home.vue'
// 引入 user组件
import user from '@/views/users/users.vue'
// 引入右边的组件
import role from '@/views/rights/role.vue'
// 权限列表
import right from '@/views/rights/right.vue'
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
  {
    name: 'home',
    path: '/home',
    component: home,
    children: [{
      name: 'users',
      path: '/users',
      component: user
    },
    {
      name: 'role',
      path: '/roles',
      component: role
    },
    {
      name: 'right',
      path: '/rights',
      component: right
    }
    ]
  }
  ]
})
