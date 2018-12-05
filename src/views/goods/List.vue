<template>
  <div class="list">
    <!-- 搜索框 -->
    <el-input
      style="width:300px"
      placeholder="请输入内容"
      class="input-with-select"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
      ></el-button>
    </el-input>
    <el-button type="success" plain @click="$router.push({name:'add'})">添加商品</el-button>
    <!-- 内容区 -->
    <template>
      <el-table
        :data="listData"
        border
        style="width: 100%"
      >
        <el-table-column
          type='index'
          label="#"
        >
        </el-table-column>
        <el-table-column
          prop="goods_name"
          label="商业名称"
          width="350"
        >
        </el-table-column>
        <el-table-column
          width="80"
          prop="goods_price"
          label="商品价格"
        >
        </el-table-column>
        <el-table-column
          width="80"
          prop="goods_weight"
          label="商品重量"
        >
        </el-table-column>
        <el-table-column
          prop="add_time"
          label="创建时间"
        >
        </el-table-column>
        <el-table-column
          prop="price"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total='total'>
    </el-pagination>
  </div>
</template>
<script>
// 引入模块方法
import { getGoodsData } from '@/api/index.js'
export default {
  data () {
    return {
      listData: [],
      query: '',
      pagenum: 1,
      pagesize: 10,
      total: 10
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 渲染页面
    init () {
      getGoodsData({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(res => {
        // console.log(res)
        // 获取总页数
        this.total = res.data.total
        // 1 判断
        if (res.meta.status === 200) {
          this.listData = res.data.goods
        } else {
          console.log('错误')
        }
      })
    },
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
</style>
