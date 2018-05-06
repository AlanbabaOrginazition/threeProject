<template>
  <div class="app-main">
      <container></container>
      <div class="memu-popver">
        <div class="menu-item">
          <span :style="{'padding-right': '15px'}">二维地图</span>
          <el-switch v-model="twoValue" inactive-color="#dcdfe6" @change="switch2d"></el-switch>
        </div>
        <div class="menu-item">
          <span :style="{'padding-right': '15px'}">三维视图</span>
          <el-switch v-model="threeValue" inactive-color="#dcdfe6"  @change="switch3d"></el-switch>
        </div>
        <div class="three-menu" v-if="threeValue">
          <div class="group-underline"></div>
          <div class="menu-item" v-for="item in threeMenu" :key="item.uuid" v-if="threeMenu">
              <span>{{item.name}}</span>
              <el-switch inactive-color="#dcdfe6" v-model="item.visible"></el-switch>
          </div>
          <div class="group-underline"></div>
          <el-button class="three-override" :class="{'simplify-active': simplify}" type="warning" circle @click="simplifyScene" >简</el-button>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Container from '@/components/Container/index'
import { bus } from '@/assets/bus'
export default {
  name: 'AppMain',
  data () {
    return {
      twoValue: false,
      threeValue: false,
      threeMenu: [],
      simplify: false
    }
  },
  components: { Container },
  computed: {
    ...mapState({
      switchValue(state){
        return state.app.switchValue
      }
    })
  },
  watch: {
    switchValue(val, oval){
      if(val){
        switch (val) {
          case '2d':
            this.twoValue = true;
            this.threeValue = false;
            break;
          case '3d':
            this.threeValue = true;
            this.twoValue = false;
            break;
          default:
            break;
        }
      }
    }
  },
  created(){
    this.switchValue == '2d' ? this.twoValue = true : this.threeValue = true;
    bus.$on('threeMenu',data=>{
       this.threeMenu = data
    })
    
  },
  methods: {
    switch2d(){
      if(this.twoValue){
        this.$router.push('/2d')
        this.$store.commit('SET_SWITCH', '2d')
      }else{
        this.threeValue = true
        this.$router.push('/3d')
        this.$store.commit('SET_SWITCH', '3d')
      }
      
    },
    switch3d(){
      if(this.threeValue){
        this.$router.push('/3d')
        this.$store.commit('SET_SWITCH', '3d')
      }else{
        this.twoValue = true
        this.$router.push('/2d')
        this.$store.commit('SET_SWITCH', '2d')
      }
    },
    simplifyScene(){
      this.simplify = !this.simplify;
      bus.$emit('simplify',this.simplify);
    }
  },
  mounted(){
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.app-main{
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  .memu-popver{
    box-sizing: border-box;
    padding: 20px 20px 10px;
    display: flex;
    position: fixed;
    top: 10px;
    left: 10px;
    width: 8vw;
    height: auto;
    z-index: 1000;
    background: #303133;
    color: #fff;
    border-radius: 10px;
    flex-direction: column;
    align-items: flex-start;
    &:hover{
      cursor: pointer;
    }
    .menu-item{
      font-weight: 600;
      display: flex;
      align-items: center;
      padding: 5px 0;
      font-size: 14px;
    }
    .three-menu{
      .menu-item{
        text-align: left;
        span{
          display: inline-block;
          width: 70px;
          color:darkkhaki;
        }
        &:first-child{
          margin-top: 5px;
        }
        &:nth-of-type(2n+1){
          span{
            color:aqua;
          }
        }
      }
      .three-override{
        float: right;
        margin-right: 10px;
        margin-top: 5px;
        border-width: 3px;
        &.simplify-active{
          border-color: #13e654;
        }
      }
    }
    .group-underline{
      height: 10px;
      width: 8vw;
      margin-left: -20px;
      border-bottom: 1px solid #fff;
    }
  }
}
</style>
