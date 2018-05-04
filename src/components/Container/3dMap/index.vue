<!--  -->
<template>
  <div id="3dmap" class="three-map" ref="3dmap"></div>
</template>

<script>
import * as THREE from 'three'
export default {
  name: 'tMap',
  data () {
    return {
        scene: null,
        camera: null,
        renderer: null
    };
  },

  components: {},

  computed: {},

  mounted() {
      this.init3D();
  },
  methods: {
      init3D(){
          this.scene = new THREE.Scene();
          this.camera = new THREE.PerspectiveCamera(45, this.$refs['3dmap'].offsetWidth / this.$refs['3dmap'].offsetHeight, .1, 1000);
          this.renderer = new THREE.WebGLRenderer();
          this.renderer.setClearColor('#000000');
          this.renderer.setSize(this.$refs['3dmap'].offsetWidth, this.$refs['3dmap'].offsetHeight);

          let axes = new THREE.AxisHelper(20);
          this.scene.add(axes);

          let planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
          let planeMaterial = new THREE.MeshBasicMaterial({
              color: 0xcccccc
          });
          let plane = new THREE.Mesh(planeGeometry, planeMaterial);
          plane.rotation.x = -0.5 * Math.PI;
          plane.position.x = 15,plane.position.y = 0, plane.position.z = 0;
          this.scene.add(plane);

          let cubeGeo = new THREE.BoxGeometry(4, 4, 4);
          let cubeMater = new THREE.MeshBasicMaterial({
              color: 0xff0000,
              wireframe: true
          });
          let cube = new THREE.Mesh(cubeGeo, cubeMater);
          cube.position.x = -4, cube.position.y = 3, cube.position.z = 0;
          this.scene.add(cube);

          let sphereGeo = new THREE.SphereGeometry(4, 20, 20);
          let sphereMater = new THREE.MeshBasicMaterial({
              color: 0x7777ff,
              wireframe: true
          });
          let sphere = new THREE.Mesh(sphereGeo, sphereMater);
          sphere.position.x = 20, sphere.position.y = 4, sphere.position.z = 2;
          this.scene.add(sphere);

          this.camera.position.x = -30;
          this.camera.position.y = 40;
          this.camera.position.z = 30;
          this.camera.lookAt(this.scene.position);
          document.getElementById('3dmap').appendChild(this.renderer.domElement);
          this.renderer.render(this.scene, this.camera);
      }
  }
}

</script>
<style lang='scss' scoped>
    .three-map{
        height: 100%;
    }
</style>