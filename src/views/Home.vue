<template>
    <p>首页</p>
</template>
<script>
import {GetUserList} from '@/api/index.js'
export default{
  data () {
    return {

    }
  },
  mounted () {
    GetUserList({pagenum: 1, pagesize: 10})
      .then((result) => {
        console.log(result)
      })
  }
}
</script>
<style lang="scss" scoped>

</style>
