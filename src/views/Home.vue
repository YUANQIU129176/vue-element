<template>
  <div class="home">
    <el-container>
      <el-aside width="auto" v-model="collapse">
        <div class="logo"></div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo el-menu-admin"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened='true'
          :router='true'
          :collapse='collapse'
        >
          <el-submenu :index="item.id+''" v-for="item in menuList" :key='item.id'>
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="subitem.path" v-for="subitem in item.children" :key='subitem.id'>
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subitem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <a href="javascript:;" class='myicon myicon-menu toggle-btn' @click="collapse=!collapse"></a>
          <div class="system-title">电商后台管理系统</div>
          <div class="welcome">
            <span>你好：admin <a href="javascript:;">退出</a></span>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {getRoleMenu} from '@/api/index.js'
export default {
  data () {
    return {
      collapse: false,
      menuList: []
    }
  },
  mounted () {
    getRoleMenu().then((res) => {
      this.menuList = res.data
    })
  }
  // methods: {
  //   handleOpen (key, keyPath) {
  //     console.log(key, keyPath)
  //   },
  //   handleClose (key, keyPath) {
  //     console.log(key, keyPath)
  //   }
  // }
}
</script>
<style lang="scss" scoped>
  .home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .logo {
    height:60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
    // z-index: 100;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292CF;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome, {
    color: white;
  }
}
</style>
