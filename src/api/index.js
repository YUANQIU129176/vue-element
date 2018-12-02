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

// 编辑用户
export const edituser = (pa) => {
  return axios.put(`users/${pa.id}`, pa).then(result => {
    return result.data
  })
}

// 删除用户
export const deluser = (id) => {
  return axios.delete(`users/${id}`, id).then(result => {
    return result.data
  })
}

// 角色列表、
export const roleuser = () => {
  return axios.get('roles').then(result => {
    return result.data
  })
}
// 授予角色
export const getRoleUser = (pa) => {
  return axios.put(`users/${pa.id}/role`, pa).then(result => {
    return result.data
  })
}
// 查询用户id值
export const getRoleUserId = (id) => {
  return axios.get(`users/${id}`, id).then(result => {
    return result.data
  })
}
// 修改用户状态
export const userStatus = (uid, type) => {
  return axios.put(`users/${uid}/state/${type}`).then(result => {
    return result.data
  })
}
