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

// 获取所有权限的请求方式
export const getRoleTtree = (tree) => {
  return axios.get(`rights/${tree}`).then((result) => {
    return result.data
  })
}

// 修改权限角色授权 （提交按钮的）
export const roleSubmit = (roleId, Ids) => {
  return axios.post(`roles/${roleId}/rights`, {rids: Ids}).then((result) => {
    return result.data
  })
}

// 删某些权限
export const delrole = (roleId, rightId) => {
  return axios.delete(`roles/${roleId}/rights/${rightId}`, roleId, rightId).then((result) => {
    return result.data
  })
}

// 权限列表list
export const getRoleList = (list) => {
  return axios.get(`rights/${list}`).then((result) => {
    return result.data
  })
}

// 左边菜单的数据的动态渲染
export const getRoleMenu = () => {
  return axios.get('menus').then((result) => {
    return result.data
  })
}

// 商品列表数据
export const getGoodsData = (pa) => {
  return axios.get('goods', {params: pa}).then((result) => {
    return result.data
  })
}
// 分类商品列表
export const getGoodsList = (type) => {
  return axios.get('categories', {params: {type: type}}).then((result) => {
    return result.data
  })
}

// 添加商品
export const addGoods = (pa) => {
  return axios.post('goods', pa).then((result) => {
    return result.data
  })
}

// 添加分类
export const addCategories = (pa) => {
  return axios.post('categories', pa).then((result) => {
    return result.data
  })
}
