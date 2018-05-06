<!--  -->
<template>
  <div id="3dmap" class="three-map" ref="3dmap">
      <div id="stats"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import Stats from 'stats-js'
import controls from '@/assets/gui'
import { bus } from '@/assets/bus'
export default {
    name: 'tMap',
    data () {
        return {
            scene: null,
            camera: null,
            renderer: null,
            stats: null,

            cube: null,
            spotLight: null, //光源

            sceneChildren: []
        };
    },

    components: {},

    computed: {},
    created(){
        bus.$on('simplify',(msg)=>{
            if(msg){
                this.scene.overrideMaterial = new THREE.MeshLambertMaterial({
                    color: 0xffffff
                })
            }else{
                this.scene.overrideMaterial = null;
            }
        })
    },
    mounted() {
        this.init3D();
        this.addSplotLight();
        this.addCube();
        this.addSphere();
        this.addStats();
        this.rendererScene();
        bus.$emit('threeMenu', this.sceneChildren);
        this.$message({
            showClose: false,
            message: `场景加载完毕`
        })
        window.onresize = ()=>{
            this.camera.aspect = this.$refs['3dmap'].offsetWidth / this.$refs['3dmap'].offsetHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.$refs['3dmap'].offsetWidth, this.$refs['3dmap'].offsetHeight);
        }
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
            
            //   let axes = new THREE.AxisHelper(40);
            //   this.scene.add(axes);

            let planeGeometry = new THREE.PlaneGeometry(100, 100);
            let planeMaterial = new THREE.MeshLambertMaterial({
                color: 0xffffff
            });
            let plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.name = 'plane';
            this.sceneChildren.push(plane);
            plane.rotation.x = -0.5 * Math.PI;
            plane.position.x = 10,plane.position.y = 0, plane.position.z = 0;
            plane.receiveShadow = true;  //平面接受阴影
            this.scene.add(plane);

            this.camera.position.x = -50;
            this.camera.position.y = 50;
            this.camera.position.z = 50;
            this.camera.lookAt(this.scene.position);
            document.getElementById('3dmap').appendChild(this.renderer.domElement);

            let vertices = [
                new THREE.Vector3(0,0,0),
                new THREE.Vector3(0,5,0),
                new THREE.Vector3(5,5,0),
                new THREE.Vector3(5,0,0),
                new THREE.Vector3(0,0,-5),
                new THREE.Vector3(0,5,-5),
                new THREE.Vector3(5,5,-5),
                new THREE.Vector3(5,0,-5)
            ];
            let faces = [
                new THREE.Face3(0,2,1),
                new THREE.Face3(0,3,2),
                new THREE.Face3(4,5,6),
                new THREE.Face3(4,6,7),
                new THREE.Face3(0,5,4),
                new THREE.Face3(0,1,5),
                new THREE.Face3(3,6,2),
                new THREE.Face3(3,7,6),
                new THREE.Face3(4,3,0),
                new THREE.Face3(4,7,3),
                new THREE.Face3(1,2,6),
                new THREE.Face3(1,6,5)
            ]
            let geom = new THREE.Geometry();
            geom.vertices = vertices;
            geom.faces = faces;
            geom.computeFaceNormals();
            let material = new THREE.MeshLambertMaterial({
                color: 0xff0000,
                wireframe: true
            })
            let m = new THREE.Mesh(geom,material);
            m.castShadow = true;
            this.scene.add(m);
        },
        // 添加性能检测窗口
        addStats(){
            this.stats = new Stats();
            this.stats.setMode(0);
            this.stats.domElement.style.position = 'absolute';
            this.stats.domElement.style.left = 0;
            this.stats.domElement.style.bottom = 0;
            document.getElementById('stats').appendChild(this.stats.domElement);
        },
        // 渲染动画函数
        rendererScene(){
            this.stats.update();
            this.cube.rotation.x += controls.rotationSpeed;
            this.cube.rotation.y += controls.rotationSpeed;
            this.cube.rotation.z += controls.rotationSpeed;
            this.scene.fog = new THREE.Fog(0xcccccc, -10, controls.fogDistance);
            requestAnimationFrame(this.rendererScene);
            this.renderer.render(this.scene,this.camera);
        },
        // 添加光源
        addSplotLight(){
            this.spotLight = new THREE.SpotLight( 0xffffff );
            this.spotLight.position.set(-50, 50, 50);
            this.spotLight.castShadow = true;  //光源产生阴影
            this.spotLight.shadowMapHeight=2048;
            this.spotLight.shadowMapWidth=2048;
            this.spotLight.name = 'spotLight';
            this.sceneChildren.push(this.spotLight);
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
            this.cube.name = 'cube';
            this.sceneChildren.push(this.cube);
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
            sphere.name = 'sphere';
            this.sceneChildren.push(sphere);
            this.scene.add(sphere);
        }
    }
}

</script>
<style lang='scss' scoped>
    .three-map{
        height: 100%; 
        position: relative;
    }
</style>