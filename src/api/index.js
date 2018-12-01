// 1 引入axios路由
import axios from 'axios'
// 2 配置基本路径
const baseUrl = 'http://127.0.0.1:8888/api/private/v1/'
axios.defaults.baseURL = baseUrl
export const loginSubmit = (pa) => {
  return axios.post('login',
    pa)
    .then((result) => {
      return result.data
    })
}

// 添加拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  var token = localStorage.getItem('loginValue')
  if (token) {
    // 通过请求头的方式发送token
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// home页面
export const GetUserList = (pa) => {
  return axios.get('users', { params: pa })
    .then((result) => {
      return result.data
    })
}
// 添加用户
export const addBtnUser = (pa) => {
  return axios.post('users', pa)
    .then((result) => {
      return result.data
    })
}
