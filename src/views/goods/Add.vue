<template>
  <div class="add">
    <el-steps
      :active="active"
      finish-status="success"
    >
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 顶头步骤
      active: 0
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
