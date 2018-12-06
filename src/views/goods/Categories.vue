<template>
  <div class="goods">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-button
        type="success"
        @click="addGoods"
      >添加分类</el-button>
      <router-view></router-view>
      <!-- 自定义模板 -->
      <tree-grid
        :treeStructure="true"
        :columns="columns"
        :data-source="dataSource"
        @deleteCate="deleteCategory"
        @editCate="editCategory"
        :props='valueData'
      >
      </tree-grid>
      <!-- 添加分类弹框 -->
      <el-dialog
        title="添加分类"
        :visible.sync="adddialogFormVisible"
      >
        <el-form :model="listForm">
          <el-form-item
            label="分类名称"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="listForm.cat_name"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="父级分类"
            :label-width="formLabelWidth"
          >
          <!-- 级联选择器 -->
            <div class="block">
              <el-cascader
                  :clearable='true'
                  :options="options"
                  v-model="selectedOptions"
                  @change="handleChange"
                  :props='props'
              >
              </el-cascader>
            </div>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="adddialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="addCateSubmit"
          >确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import treeGrid from '@/components/TreeGrid/TreeGrid.vue'
import { getGoodsList, addCategories } from '@/api/index.js'
export default {
  components: {
    treeGrid: treeGrid
  },
  data () {
    return {
      // 添加功能

      // 级联选择器
      selectedOptions: [],
      options: [],
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 弹框
      adddialogFormVisible: false,
      // 表单数据
      listForm: {
        cat_pid: '',
        cat_name: '',
        cat_level: ''
      },
      formLabelWidth: '120px',
      // 数据源
      valueData: {
        value: 'cat_id',
        lable: 'cat_name',
        children: 'children'
      },
      dataSource: [],
      columns: [
        {
          text: '分类名称',
          dataIndex: 'cat_name',
          width: ''
        },
        {
          text: '是否有效',
          dataIndex: 'cat_deleted',
          width: ''
        },
        {
          text: '排序',
          dataIndex: 'cat_level',
          width: ''
        }
      ]
    }
  },
  methods: {
    deleteCategory (cid) {
      console.log(cid)
    },
    editCategory (cid) {
      console.log(cid)
    },
    // 添加分类
    addGoods () {
      // 1 弹框
      this.adddialogFormVisible = true
      getGoodsList(2).then((res) => {
        console.log(res)
        // 2 渲染页面
        this.options = res.data
      })
    },
    handleChange (value) {
      console.log(value)
      // 判断是底基层级
      if (value.length === 1) {
        this.listForm.cat_level = 1
        this.listForm.cat_pid = value[0]
      } else if (value.length === 2) {
        this.listForm.cat_level = 2
        this.listForm.cat_pid = value[1]
      }
    },
    addCateSubmit () {
      // 调用模块方法
      addCategories(this.listForm).then((res) => {
        console.log(res)
        if (res.meta.status === 201) {
          this.adddialogFormVisible = false
          this.$message.sucess('添加分类成功')
        } else {
          this.$message.sucess('添加分类失败')
        }
        // 隐藏弹框
      })
    }
  },
  mounted () {
    getGoodsList('3').then(res => {
      console.log(res)
      if (res.meta.status === 200) {
        this.dataSource = res.data
      } else {
        this.$message.error('没有数据')
      }
    })
  }
}
</script>
<style lang="scss" scoped>
</style>
