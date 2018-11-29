// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'

Vue.use(ElementUI)

Vue.config.productionTip = false
// 导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to)
  // 判断那个页面需要守卫不能直接登录
  // 1 已经登录的 不需要 首页不需要
  // 2 没有登录的需要
  var token = localStorage.getItem('loginValue')
  if (token || to.path === '/login') {
    next()
  } else {
    next({ name: 'login' })
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
