<!--
 * @Author: your name
 * @Date: 2021-03-08 16:05:46
 * @LastEditTime: 2021-03-16 16:10:57
 * @LastEditors: licheng
 * @Description: In User Settings Edit
 * @FilePath: \map-demo\src\components\Arcmap\Swipe.vue
-->
<template>
  <div class='mapDiv'>
    <div id='mapDivRef' class='mapDiv'></div>
    <div class="anima-div">
    </div>
  </div>
</template>
<script>

import { loadCss, loadModules } from 'esri-loader'
export default {
  name: 'mapTool',
  data () {
    return {
    }
  },
  mounted () {
    this.initMap()
    console.log(Swipe);
  },
  methods: {
    initMap () {
      loadModules([
        'esri/Map',
        'esri/views/MapView', // 2d视图模块
        'esri/layers/WebTileLayer',
        'esri/views/draw/Draw',
        'esri/Graphic',
        "esri/layers/GraphicsLayer",
        "esri/geometry/Polyline",
        "esri/symbols/TextSymbol",
        "esri/tasks/GeometryService",
        "esri/tasks/support/LengthsParameters",
        "esri/config",
        "esri/widgets/Swipe"
      ])
        .then(([
          Map,
          MapView,
          WebTileLayer,
          Draw,
          Graphic,
          GraphicsLayer,
          Polyline,
          TextSymbol,
          GeometryService,
          LengthsParameters,
          esriConfig,
          Swipe
        ]) => {
          this.layerDT = new WebTileLayer({
            urlTemplate: 'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=42dca576db031641be0524ee977ddd04'
          })
          this.layerZJ = new WebTileLayer({
            urlTemplate: 'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=42dca576db031641be0524ee977ddd04'
          })
          this.layerImgDT = new WebTileLayer({
            urlTemplate: 'http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=42dca576db031641be0524ee977ddd04'
          })
          this.layerImgZJ = new WebTileLayer({
            urlTemplate: 'http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=42dca576db031641be0524ee977ddd04'
          })
          this.map = new Map({
            layers: [this.layerDT, this.layerZJ, this.layerImgDT, this.layerImgZJ]
          })
          this.MapView = new MapView({
            container: 'mapDivRef',
            map: this.map,
            zoom: 10,
            center: [113.272579, 23.136134]
          })
          this.Draw = new Draw({
            view: this.MapView
          })
          var swipe = new Swipe({
            view: this.MapView,
            leadingLayers: [this.layerDT,  this.layerZJ],
            trailingLayers: [this.layerImgDT,  this.layerImgZJ],
            direction: "horizontal",
            position: 50
          });
          this.MapView.ui.add(swipe);
        })
    }
  }
}
</script>
<style lang='less' scoped>
.mapDiv {
  width: 100%;
  height: 1000px;
  .anima-div {
    position: absolute;
    top: 5px;
    left: 40%;
  }
}
</style>
