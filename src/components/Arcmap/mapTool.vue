<!--
 * @Author: your name
 * @Date: 2021-03-08 16:05:46
 * @LastEditTime: 2021-03-08 18:07:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-demo\src\components\Arcmap\map.vue
-->
<template>
  <div class='mapDiv'>
    <div id='mapDivRef' class='mapDiv'></div>
     <div class="anima-div">
            <!-- <Button @click="animaShp">要素动画</Button>
            <Button @click="moveShp">要素移动</Button>
            <Button @click="airplineShp">航线动画</Button> -->
            <Button @click="HeatmapRenderer">热力图</Button>
      </div>
  </div>
</template>
<script>

import { loadCss, loadModules } from  'esri-loader'
export default {
  name: 'mapTool',
  data() {
    return {
      heatData:[
        {"lng":"108.51293787947446","lat":"18.8995620366488552"},
        {"lng":"108.51298787947446","lat":"18.899562095488552"},
        {"lng":"108.51273787947446","lat":"18.899565096488552"}
      ]
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      loadCss('https://js.arcgis.com/4.18/esri/themes/light/main.css')
      loadModules([
        "esri/Map", 
        "esri/views/MapView",//2d视图模块
        "esri/layers/WebTileLayer",
        "esri/renderers/HeatmapRenderer",
        "esri/layers/KMLLayer"
      ])
      .then(([
        Map,
        MapView,
        WebTileLayer,
        HeatmapRenderer,
        KMLLayer
      ])=>{
        this.layerDT = new WebTileLayer({
          urlTemplate: 'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=42dca576db031641be0524ee977ddd04',
        })
        this.layerZJ = new WebTileLayer({
          urlTemplate: 'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=42dca576db031641be0524ee977ddd04',
        })
        this.map = new Map({
          layers: [this.layerDT, this.layerZJ ]
        })
        this.MapView = new MapView({
          container: "mapDivRef",
          map: this.map,
          zoom: 10,
          center: [113.272579,23.136134],
        })
      })
    },
    HeatmapRenderer () {
      let _this = this
      loadModules([
        "esri/renderers/HeatmapRenderer",
        "esri/layers/FeatureLayer"
      ])
      .then(([
        HeatmapRenderer,
        FeatureLayer
      ])=>{
        let heatmapRenderer = new HeatmapRenderer({//设置渲染器
          colorStops: [
            { ratio: 0.4, color: "rgba(0, 255, 0, 0)" },
            { ratio: 0.75, color: "rgba(255, 140, 0, 1)" },
            { ratio: 0.9, color: "rgba(255, 0,   0, 1)" }
          ],
          blurRadius: 8,
          maxPixelIntensity: 230,
          minPixelIntensity: 10
        })
        
        let features = []
        for (var i = 0; i < _this.heatData.length; i++) {
          var x = _this.heatData[i].lng;
          var y = _this.heatData[i].lat;
          features.push({
            geometry: {
              type: "point",
              x: x,
              y: y
            },
            attributes: {
              ObjectID: i,//重要！！！
            }
          })
        }

        let Layer = new FeatureLayer({
          source: features,
          title: "热力图",
          objectIdField: "ObjectID",//重要！！！
          renderer: heatmapRenderer//渲染器
        });
        _this.map.add(Layer)
      })
    }
  }
}
</script>
<style lang='less' scoped>
.mapDiv {
  width: 100%;
  height: 1000px;
  .anima-div{
    position: absolute;
    top:5px;
    left: 40%;
  }
}
</style>
