<!--  -->
<template>
  <el-row :style="{ height:'100%'}">
    <el-col :span="24" :style="{ height:'100%' }">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
 
    };
  },

  components: { },

  computed: {},

  methods: {
  }
}

</script>
<style lang='scss' scoped>

</style>