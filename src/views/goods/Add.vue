<template>
  <div class="add">
    <el-steps
      :active="activeName - 0"
      finish-status="success"
    >
      <el-step title="1"></el-step>
      <el-step title="2"></el-step>
      <el-step title="3"></el-step>
      <el-step title="4"></el-step>
      <el-step title="5"></el-step>
    </el-steps>
    <!-- tab兰 -->
    <el-tabs
      :tab-position="tabPosition"
      v-model="activeName"
    >
      <el-tab-pane
        label="基本信息"
        name='0'
      >
        <!-- 基本信息 -->
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="formLabelAlign"
        >
          <el-form-item label="商品名称">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input
              type='number'
              v-model="formLabelAlign.region"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input
              type='number'
              v-model="formLabelAlign.type"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <div class="block">
              <el-cascader
                :clearable='true'
                :props='props'
                :options="options"
                v-model="selectedOptions"
                @change="handleChange"
              >
              </el-cascader>
            </div>
          </el-form-item>
        </el-form>
        <!-- 基本信息 -->
      </el-tab-pane>
      <el-tab-pane
        label="商品参数"
        name='1'
      >商品参数</el-tab-pane>
      <el-tab-pane
        label="商品属性"
        name='2'
      >商品属性</el-tab-pane>
      <el-tab-pane
        label="商品图片"
        name='3'
      >
        <el-upload
          class="upload-demo"
          action="http://localhost:8888/api/private/v1/upload"
          :headers='getToken()'
          :before-upload='uploadBeforeValid'
          :on-success='uploadDone'
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList2"
          list-type="picture"
        >
          <el-button
            size="small"
            type="primary"
          >点击上传</el-button>
          <div
            slot="tip"
            class="el-upload__tip"
          >只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane
        label="商品内容"
        name='4'
      >商品内容</el-tab-pane>
    </el-tabs>
    <el-button
      type="success"
      style="float:right"
    >确认添加</el-button>

    <!-- 图片预览弹框 -->
    <el-dialog
      title="图片查看"
      :visible.sync="imgdialogTableVisible"
      style="width:100%"
    >
    <img :src="imgPath" alt="">
    </el-dialog>
  </div>
</template>
<script>
import { getGoodsList } from '@/api/index.js'
export default {
  data () {
    return {
      // 图片路径
      imgPath: '',
      // 顶头步骤
      activeName: 0,
      // tab布局
      tabPosition: 'left',
      // 内容区
      labelPosition: 'right',
      // 基本信息
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      // 商品分类
      selectedOptions: [],
      options: [],
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      addForm: {
        goods_name: '',
        goods_cat: '',
        goods_price: '0',
        goods_number: '1',
        goods_weight: '0',
        goods_introduce: '',
        pics: [],
        attrs: ''
      },
      // 图片上传
      fileList2: [],
      // 图片查看
      imgdialogTableVisible: false
    }
  },
  methods: {
    // s设置请求头
    getToken () {
      var token = localStorage.getItem('loginValue')
      // 返回一个请求头的 信息
      return { Authorization: token }
    },
    // 分类
    handleChange (value) {
      console.log(value)
    },
    // 图片上传之删除
    handleRemove (file, fileList) {
      // bug
      if (!file.response) {
        return
      }
      console.log(file, fileList)
      // 如果不存在临时路径的就不执行
      // 看两边路径是否相同
      // 1
      var filePath = file.response.data.tmp_path
      console.log(filePath)

      // 通过查找findIndexfindIndex:可以查找指定数据的所在索引位置：它有一个回调函数，回调函数有一个参数，就是遍历数组时每次遍历到的成员，每次使用一个成员的数据进行函数的业务逻辑的计算，如果满足条件，则返回当前索引
      var index = this.addForm.pics.findIndex(item => {
        console.log(item)
        // 结果正确则返回索引值
        return item.pic.indexOf(filePath) !== -1
      })
      console.log(index)
      this.addForm.pics.splice(index, 1)
    },
    // 上传预览
    handlePreview (file) {
      console.log(file)
      // 弹框显示
      this.imgdialogTableVisible = true
      // 图片加载
      this.imgPath = 'http://localhost:8888/' + file.response.data.tmp_path
    },
    // 上传成功
    uploadDone (response, file, fileList) {
      // console.log(response)
      // console.log(file)
      // console.log(fileList)
      // 拼接处pic的临时路径
      this.addForm.pics.push({'pic': '/' + response.data.tmp_path})
      // console.log(this.addForm.pics)
    },
    // 上传之前触发事件
    uploadBeforeValid (file) {
      console.log(file)
      // 1获取文件的大小
      var fileSize = file.size
      // 2 判断
      if (fileSize > 500000) {
        // 3终止上传
        this.$message.error('文件过大！请重新上传')
        return false
      } else {
        this.$message.success('文件上传成功')
      }
    }
  },
  mounted () {
    getGoodsList('3').then(res => {
      console.log(res)
      this.options = res.data
    })
  }
}
</script>
<style lang="scss" scoped>
</style>
