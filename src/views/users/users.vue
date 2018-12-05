<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="searchValue"
        class="input-with-select"
        style="width:300px"
      >
        <el-button
          @click='searchUser'
          slot="append"
          icon="el-icon-search"
        ></el-button>
      </el-input>
      <el-button
        @click="dialogFormVisible = true"
        type="success"
        plain
      >添加用户</el-button>
    </div>

    <!-- 内容区 -->
    <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          prop="date"
          label="#"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
        >
        </el-table-column>
        <!-- 滑动按钮 -->
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
            @change="changeStatus(scope.row)"
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#666"
            >
            </el-switch>
          </template>
        </el-table-column>
        <!-- 删除  编辑 连接-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              plain
              icon="el-icon-share"
              size="mini"
              @click="handinsert(scope.row)"
            ></el-button>
            <el-button
              plain
              icon="el-icon-delete"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)"
            ></el-button>
            <el-button
              plain
              icon="el-icon-edit"
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 添加数据按钮的弹框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
      >
        <el-form-item
          label="用户名"
          prop='username'
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.username"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop='password'
          label="密码"
          :label-width="formLabelWidth"
        >
          <el-input
            type='password'
            v-model="form.password"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop='email'
          label="邮箱"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.email"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop='mobile'
          label="电话"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.mobile"
            auto-complete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click='addUser("form")'
        >确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户 -->
    <el-dialog
      title="编辑用户"
      :visible.sync="editdialogFormVisible"
    >
      <el-form
        :model="editform"
        :rules="rules"
        ref="editform"
      >
        <el-form-item
          label="用户名"
          prop='username'
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="editform.username"
            auto-complete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop='email'
          label="邮箱"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="editform.email"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop='mobile'
          label="电话"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="editform.mobile"
            auto-complete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editdialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click='editUser("editform")'
        >确 定</el-button>
      </div>
    </el-dialog>

    <!-- 授予角色 -->
    <el-dialog
      title="分配角色"
      :visible.sync="roledialogFormVisible"
    >
      <el-form
        :model="roleform"
        :rules="rules"
        ref="roleform"
      >
        <el-form-item
          label="用户名"
          prop='username'
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="roleform.username"
            auto-complete="off"
          ></el-input>
          <template>
          <el-select
            v-model="roleform.rid"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="roledialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click='roleUser("roleform")'>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// 引入home页面模块
import { GetUserList, addBtnUser, edituser, deluser, roleuser, getRoleUser, getRoleUserId, userStatus } from '@/api/index.js'
export default {
  data () {
    return {
      // 授予角色
      options: [],
      value: '',
      // 总条数
      total: 0,
      searchValue: '',
      // 状态的活动
      status: '',
      tableData: [],
      // 分页
      pagenum: 1,
      currentPage: 1,
      pagesize: 5,

      // 弹框 添加数据
      dialogFormVisible: false,
      editdialogFormVisible: false,
      roledialogFormVisible: false,
      // 传递的参数
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 编辑弹框
      editform: {
        username: '',
        id: '',
        email: '',
        mobile: ''
      },
      // 授予角色
      roleform: {
        username: '',
        id: '',
        rid: ''
      },
      formLabelWidth: '120px',
      // 输入警告
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        email: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      }
    }
  },
  // 钩子函数
  mounted () {
    this.init()
  },
  methods: {
    // 用户状态的修改
    changeStatus (row) {
      console.log(row)
      userStatus(row.id, row.mg_state).then(result => {
        // console.log(result)
        if (result.meta.status === 200) {
          this.$message('状态设置成功')
        }
      })
    },

    // 完成搜索用户
    searchUser () {
      // 调用发送路由组件的方法
      GetUserList({
        query: this.searchValue,
        pagenum: 1,
        pagesize: 5
      }).then(result => {
        // 渲染搜索到的数据
        this.tableData = result.data.users
        this.total = result.data.total
      })
    },

    // 编辑用户
    editUser (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          edituser(this.editform).then(result => {
            // 判断
            // console.log(result)
            if (result.meta.status === 200) {
              // 弹框提示
              this.$message('编辑用户成功')
              // 重新刷新页面
              this.init()
              // 消息框重新隐藏
              this.editdialogFormVisible = false
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 添加新用户
    addUser (formName) {
      // console.log(formName)
      this.$refs[formName].validate(valid => {
        if (valid) {
          addBtnUser(this.form).then(result => {
            // console.log(result)
            // 弹框提示
            this.$message('添加用户成功了')
            // 重置输入框的信息
            this.$refs[formName].resetFields()
            // 消息框重新隐藏
            this.dialogFormVisible = false
            this.init()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 页面的渲染
    init () {
      GetUserList({
        query: '',
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(result => {
        // console.log(result)
        // 判断数据是否回来成功
        if (result.meta.status === 200) {
          this.tableData = result.data.users
          this.total = result.data.total
        }
      })
    },

    // 编辑 删除 和修改角色功能
    handleEdit (row) {
      // console.log(row)
      this.editdialogFormVisible = true
      this.editform = row
    },
    // 删除功能
    handleDelete (id) {
      console.log(id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deluser(id).then(result => {
            // console.log(result)
            if (result.meta.status === 200) {
              this.init()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 角色列表
    handinsert (row) {
      this.roleform = row
      // console.log(row)
      this.roledialogFormVisible = true
      // 角色列表
      roleuser().then(res => {
        if (res.meta.status === 200) {
          this.options = res.data
          getRoleUserId(row.id).then((result) => {
            // console.log('选项列表的渲染', result.data.rid)
            this.roleform.rid = result.data.rid
            this.init()
            // this.roledialogFormVisible = false
          })
        }
      })
    },
    // 角色授予
    roleUser () {
      // 获取用户的id值和rid值
      getRoleUser(this.roleform).then((result) => {
        console.log(result)
        if (result.meta.status === 200) {
          this.$message('设置角色成功')
          // 关闭弹框
          this.roledialogFormVisible = false
          this.init()
        }
      })
    },

    // 分页功能
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
      this.init()
    }
  }
}
</script>
<style lang="scss" scoped>
.el-table {
  margin-top: 15px;
}
</style>
