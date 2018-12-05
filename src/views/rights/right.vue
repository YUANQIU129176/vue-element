<template>
  <div class="right">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容区 -->
    <!-- 表格区域 -->
    <template>
      <el-table
        :data="rightList"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="authName"
          label="权限名称"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="path"
          label="路径"
          width="180"
        >
        </el-table-column>
        <el-table-column
          label="层级"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{scope.row.level | levelFormat}}</span>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import { getRoleList } from '@/api/index.js'
export default {
  data () {
    return {
      rightList: []
    }
  },
  mounted () {
    getRoleList('list').then(res => {
      console.log(res)
      if (res.meta.status === 200) {
        this.rightList = res.data
      }
    })
  },
  //   开启一个过滤器
  filters: {
    levelFormat (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else if (level === '2') {
        return '三级'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
