<!--  -->
<template>
  <div id="3dmap" class="three-map" ref="3dmap">
      <div id="stats"></div>
      <el-button type="success" class="test-btn" @click="test">测试</el-button>
  </div>
</template>

<script>
import * as THREE from 'three'
import Stats from 'stats-js'
import controls from '@/assets/gui'
export default {
  name: 'tMap',
  data () {
    return {
        scene: null,
        camera: null,
        renderer: null,
        stats: null,

        cube: null,
        spotLight: null //光源
    };
  },

  components: {},

  computed: {},

  mounted() {
      this.init3D();
      this.addSplotLight();
      this.addCube();
      this.addSphere();
      this.addStats();
      this.rendererScene();
  },
  methods: {
    init3D(){
          this.scene = new THREE.Scene();
          this.camera = new THREE.PerspectiveCamera(45, this.$refs['3dmap'].offsetWidth / this.$refs['3dmap'].offsetHeight, .1, 1000);
          this.renderer = new THREE.WebGLRenderer();
          this.renderer.setClearColor('#eeeeee');
          this.renderer.setSize(this.$refs['3dmap'].offsetWidth, this.$refs['3dmap'].offsetHeight);
          this.renderer.shadowMapEnabled = true; //渲染阴影效果
          this.renderer.shadowMapType=THREE.PCFSoftShadowMap
          
          let axes = new THREE.AxisHelper(40);
          this.scene.add(axes);

          let planeGeometry = new THREE.PlaneGeometry(60, 20);
          let planeMaterial = new THREE.MeshLambertMaterial({
              color: 0xffffff
          });
          let plane = new THREE.Mesh(planeGeometry, planeMaterial);
          plane.rotation.x = -0.5 * Math.PI;
          plane.position.x = 10,plane.position.y = 0, plane.position.z = 0;
          plane.receiveShadow = true;  //平面接受阴影
          this.scene.add(plane);

          this.camera.position.x = -30;
          this.camera.position.y = 40;
          this.camera.position.z = 30;
          this.camera.lookAt(this.scene.position);
          document.getElementById('3dmap').appendChild(this.renderer.domElement);
    },
    // 添加性能检测窗口
    addStats(){
        this.stats = new Stats();
        this.stats.setMode(0);
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = 0;
        this.stats.domElement.style.top = 0;
        document.getElementById('stats').appendChild(this.stats.domElement);
    },
    // 渲染动画函数
    rendererScene(){
        this.stats.update();
        this.cube.rotation.x += controls.rotationSpeed;
        this.cube.rotation.y += controls.rotationSpeed;
        this.cube.rotation.z += controls.rotationSpeed;
        this.spotLight.position.x += 1;
        if(this.spotLight.position.x >= 40){
            this.spotLight.position.x = -40;
        }
        requestAnimationFrame(this.rendererScene);
        this.renderer.render(this.scene,this.camera);
    },
    // 添加光源
    addSplotLight(){
        this.spotLight = new THREE.SpotLight( 0xffffff );
        this.spotLight.position.set(-40, 60, -10);
        this.spotLight.castShadow = true;  //光源产生阴影
        this.spotLight.shadowMapHeight=2048;
        this.spotLight.shadowMapWidth=2048;
        this.scene.add(this.spotLight);
    },
    // 添加长方体
    addCube(){
        let cubeGeo = new THREE.BoxGeometry(4, 4, 4);
        let cubeMater = new THREE.MeshLambertMaterial({ 
            color: 0x01aaaa
        });
        this.cube = new THREE.Mesh(cubeGeo, cubeMater);
        this.cube.position.x = -4, this.cube.position.y = 3, this.cube.position.z = 0;
        this.cube.castShadow = true;  //长方体渲染阴影
        this.scene.add(this.cube);
    },
    // 添加球体
    addSphere(){
        let sphereGeo = new THREE.SphereGeometry(4, 50, 50);
        let sphereMater = new THREE.MeshLambertMaterial({
            color: 0x7777ff
        });
        let sphere = new THREE.Mesh(sphereGeo, sphereMater);
        sphere.position.x = 20, sphere.position.y = 4, sphere.position.z = 0;
        sphere.castShadow = true; //球体渲染阴影
        this.scene.add(sphere);
    },

    test(){
        this.$message({
            showClose: true,
            message: `scene共有${this.scene.children.length}个物体`
        })
        console.log(this.scene.children[0] instanceof THREE.AxisHelper)
        this.scene.remove(this.scene.children[0])
    }

  }
}

</script>
<style lang='scss' scoped>
    .three-map{
        height: 100%; 
        position: relative;
        .test-btn{
            position: absolute;
            left: 0;
            top: 100px;
        }
    }
</style>