<!--
 * @Author: your name
 * @Date: 2021-03-08 16:05:46
 * @LastEditTime: 2021-03-10 12:01:16
 * @LastEditors: licheng
 * @Description: In User Settings Edit
 * @FilePath: \map-demo\src\components\Arcmap\map.vue
-->
<template>
  <div class='mapDiv'>
    <div id='mapDivRef' class='mapDiv'></div>
  </div>
</template>
<script>

import { loadCss, loadModules } from  'esri-loader'
export default {
  name: 'esriMap',
  data() {
    return {
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // loadCss('https://js.arcgis.com/4.18/esri/themes/light/main.css')
      loadModules([
        "esri/Map", 
        "esri/views/MapView",//2d视图模块
        "esri/layers/MapImageLayer",
      ])
      .then(([
        Map,
        MapView,
        MapImageLayer
      ])=>{
        this.layer = new MapImageLayer({
          url:'http://121.33.231.74:60/arcgis/rest/services/yongjiang/nj/MapServer'
        })
        this.map = new Map({
          layers: [this.layer]
        })
        this.MapView = new MapView({
          container: "mapDivRef",
          map: this.map,
          zoom: 4,
          center: [108.30,22.76],
        })
      })
    }
  }
};
</script>
<style lang='less' scoped>
.mapDiv {
  width: 100%;
  height: 1000px;
}
</style>
