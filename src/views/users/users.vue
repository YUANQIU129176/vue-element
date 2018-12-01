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
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
            <el-button
              plain
              icon="el-icon-delete"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            ></el-button>
            <el-button
              plain
              icon="el-icon-edit"
              size="mini"
              type="primary"
              @click="handleDelete(scope.$index, scope.row)"
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
      <el-form :model="form" :rules="rules" ref="form">
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
        <el-button type="primary" @click='addUser("form")'>确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
// 引入home页面模块
import { GetUserList, addBtnUser } from '@/api/index.js'
export default {
  data () {
    return {
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
      // 传递的参数
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
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
        email: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      }
    }
  },
  // 钩子函数
  mounted () {
    this.init()
  },
  methods: {
    // 完成搜索用户
    // 添加新用户
    addUser (formName) {
      // console.log(formName)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addBtnUser(this.form).then((result) => {
            // console.log(result)
            // 弹框提示
            this.$message('添加用户成功了')
            // 重置输入框的信息
            this.$refs[formName].resetFields()
            // 消息框重新隐藏
            this.dialogFormVisible = false
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

    // 编辑功能
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
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
