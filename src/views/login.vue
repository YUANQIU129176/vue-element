<template>
  <div class="login">
    <div class="container">
      <img
        src="../assets/13.jpg"
        alt=""
        class="avatar"
      >
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
      >
        <el-form-item prop="name">
          <el-input
            v-model="loginForm.username"
            prefix-icon="myicon myicon-user" placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input
            v-model="loginForm.password"
            type="password"
            prefix-icon="myicon myicon-key" placeholder="密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        class="login-btn"
        @click="login('loginForm')"
      >登录</el-button>
    </div>
  </div>
</template>
<script>
// 引入api 方法 如果不是默认的则需要添加{}
import {loginSubmit} from '@/api/index.js'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      }
    }
  },
  // medules
  methods: {
    // 验证表单输入是否正确
    login (formName) {
      // console.log(this.$refs[formName])
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(valid)
          // this.$message('恭喜你登录成功了')
          // console.log(123)
          // 如果输入的值为正确的则发送请求获取后台的数据
          // 1 创建一个请求的办法 引入
          // 2 判断是否成功
          loginSubmit(this.loginForm)
            .then((result) => {
              console.log(result)
              // 2判断
              if (result.meta.status === 200) {
                // 4.1把登录的token存起来
                localStorage.setItem('loginValue', result.data.token)
                // 3实现跳转页码 编程试导航
                // 4验证用户是否登录了 否则 否则不能直接跳转到home页面
                this.$router.push({name: 'home'})
              } else {
                this.$message('用户名或密码输入不正确！！！')
              }
            })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
