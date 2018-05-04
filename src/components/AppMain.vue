<template>
  <el-container>
    <el-aside width="200px"></el-aside>
    <el-main>
      <container></container>
    </el-main>
  </el-container>
</template>

<script>
import Container from '@/components/Container/index'
export default {
  name: 'AppMain',
  data () {
    return {
      value2: 50
    }
  },
  components: { Container  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .el-container{
    height: 100%;
    cursor: pointer;
    .el-aside {
      background-color: #D3DCE6;
      color: #333;
      text-align: center;
    }
    .el-main {
      background-color: #E9EEF3;
      color: #333;
      text-align: center;
    }
  }
</style>
