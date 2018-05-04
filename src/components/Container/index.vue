<!--  -->
<template>
  <el-row :style="{ height:'100%' }">
    <el-col :span="12"><h4>2d map</h4></el-col>
    <el-col :span="12"><h4>3d map</h4></el-col>
    <el-col :span="12" :style="{ height:'calc( 100% - 61px )' }">
        <lMap></lMap>
    </el-col>
    <el-col :span="12" :style="{ height:'calc( 100% - 61px )', 'border-left':'1px solid #ccc'}">
        <tMap></tMap>
    </el-col>
  </el-row>
</template>

<script>
import lMap from '@/components/Container/2dMap/index'
import tMap from '@/components/Container/3dMap/index'
export default {
  data () {
    return {
 
    };
  },

  components: { lMap, tMap },

  computed: {},

  methods: {
  }
}

</script>
<style lang='scss' scoped>
</style>