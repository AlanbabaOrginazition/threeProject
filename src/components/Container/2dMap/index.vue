<!-- 2d地图 -->
<template>
    <div id="map-main" class="leaflet-map"></div>
</template>

<script>
import L from 'leaflet'
export default {
  name: 'lMap',
  data () {
    return {
      map: null
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.map = L.map('map-main',{
      crs: L.CRS.Simple,
      minZoom: -2,
      maxZoom: 5,
      closePopupOnClick: false,
      zoomControl: false,
      doubleClickZoom: false,
      zoomAnimation: false,
      attributionControl: false
    })
    this.curImg = L.imageOverlay('http://dev-service.jtl3d.com/coord/images/05/05-4.png', [[0,0],[ 800, 1000]]).addTo(this.map);
    this.map.setView([400, 500],-1);
  },
  methods: {
  }
}

</script>
<style lang='scss' scoped>
  .leaflet-map{
    height: 100%;
  }
</style>