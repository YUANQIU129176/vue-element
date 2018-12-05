<template>
  <div class="right">
    <!-- 头部面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button
      type="success"
      plain
    >添加角色</el-button>

    <!-- 表格框的分页内容 -->
    <template>
      <el-table
        border
        :data="tableData5"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 角色授权列表 -->
            <el-row
              v-for="first in scope.row.children"
              :key="first.id"
            >
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <el-tag
                    closable
                    type="success"
                    @close='removeRight(scope.row,first.id)'
                  >
                    {{first.authName}}
                  </el-tag>
                </div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple-light">
                  <el-row
                    v-for="second in first.children"
                    :key="second.id"
                  >
                    <el-col :span="4"
                      style="margin-right: 2px;"
                    >
                      <div class="grid-content bg-purple">
                        <el-tag
                          closable
                          :type="second.type"
                           @close='removeRight(scope.row,second.id)'

                        >
                          {{second.authName}}
                        </el-tag>
                      </div>
                    </el-col>
                    <el-col :span="20">
                      <div class="grid-content bg-purple-light">
                        <el-tag
                        v-for="third in second.children"
                          :key="third.id"
                          closable
                          :type="third.type"
                           @close='removeRight(scope.row,third.id)'
                        >
                          {{third.authName}}
                        </el-tag>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <span v-show='scope.row.children.length === 0'>没有权限 请去授权</span>
          </template>
        </el-table-column>
        <el-table-column type='index'>
        </el-table-column>
        <el-table-column
          label="角色名称"
          prop="roleName"
        >
        </el-table-column>
        <el-table-column
          label="描述"
          prop="roleDesc"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              content="编辑"
              placement="top"
            >
              <el-button
                type="primary"
                plain
                icon="el-icon-edit"
                size="mini"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              content="删除"
              placement="top"
            >
              <el-button
                plain
                icon="el-icon-delete"
                size="mini"
                type="danger"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              content="授权"
              placement="bottom"
            >
              <el-button
                class="el-icon-check"
                plain
                size="mini"
                type="primary"
                @click="handleRoles(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 角色列表授权弹框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="roledialogFormVisible"
    >
      <div class="box">
        <el-tree
          ref="tree"
          style="height:250px"
          :data="listData"
          show-checkbox
          node-key="id"
          :default-expand-all='true'
          :default-checked-keys="selectedNode"
          :props="defaultProps"
        >
        </el-tree>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="roledialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="roleSubmit"
        >确 定</el-button>
      </div>
    </el-dialog>

    <!-- 角色授权列表 -->
  </div>
</template>
<script>
import { roleuser, getRoleTtree, roleSubmit, delrole } from '@/api/index.js'
export default {
  data () {
    return {
      // 1 角色授权弹框
      roledialogFormVisible: false,
      tableData5: [],
      formLabelWidth: '120px',
      // 1.1 数据渲染
      listData: [],
      // 1.2 功能
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 1.3 被选中的按钮
      selectedNode: [],
      // 1.4 roleId
      roleId: ''
    }
  },
  mounted () {
    // 2 获取用户列表的数据
    this.init()
  },
  methods: {
    // 3.1 角色页面数据的渲染
    init () {
      roleuser().then(result => {
        console.log(result.data)
        this.tableData5 = result.data
      })
    },
    // 弹框
    handleRoles (row) {
      // console.log(row)
      // 3.1 获取传递过来的数据值
      this.roleId = row.id
      // 3.2 弹框
      this.roledialogFormVisible = true
      getRoleTtree('tree').then(result => {
        console.log(result)
        // 3.2 判断然后渲染页面
        if (result.meta.status === 200) {
          // 3.3 赋值渲染页面
          this.listData = result.data
        }
      })
      // 清除添加进啦的默认id值
      // 3.4 遍历获取到最后的id值来作为显示的要求
      this.selectedNode.length = 0
      row.children.forEach((first, index) => {
        if (first.children && first.children.length > 0) {
          first.children.forEach((second, inedx) => {
            if (second.children && second.children.length > 0) {
              second.children.forEach((third, index) => {
                this.selectedNode.push(third.id)
              })
            }
          })
        }
      })
    },
    // 4 提交按钮（修改权限值）
    roleSubmit () {
      // 4.1 获取被选中数据值
      // console.log(this.$refs.tree.getCheckedNodes())

      var selectCheck = this.$refs.tree.getCheckedNodes()
      // 4.2 遍历 找到被选中的id值
      var idArr = selectCheck.map(item => {
        return item.id + ',' + item.pid
      })
      // console.log(idArr)// ["105,104,101", "116,104,101"]
      // 4.3 因为数据中存在重复的值所以需要去掉重复的部分
      // 4.31转化成字符串的形式
      var idsString = idArr.join(',')
      console.log(idsString) // 105,104,101,116,104,101
      // 4.4去重复 new set()
      var newIds = new Set(idsString.split(','))
      console.log(newIds) // 得到的是_c的数组不能直接使用 通过使用Array.from从set对象返回数组
      var finerIds = Array.from(newIds)
      // 4.5转化成字符串的形式
      var finerStringIds = finerIds.join(',')
      // 4.6发送路由请求
      roleSubmit(this.roleId, finerStringIds).then(result => {
        console.log(result)
        if (result.meta.status === 200) {
          this.$message.success('更新权限成功')
          this.roledialogFormVisible = false
          this.init()
        }
      })
    },
    // 5 删除某些权限
    removeRight (row, rightId) {
      // console.log(rightId)
      // console.log(row)
      delrole(row.id, rightId).then((result) => {
        console.log(result)
        row.children = result.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  overflow: scroll;
}
.el-tag {
  margin: 0 5px 10px;

}
.el-col{
  padding:0 5px
}
</style>
