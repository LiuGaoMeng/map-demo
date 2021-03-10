<!--
 * @Author: your name
 * @Date: 2021-03-08 16:05:46
 * @LastEditTime: 2021-03-10 10:05:06
 * @LastEditors: licheng
 * @Description: In User Settings Edit
 * @FilePath: \map-demo\src\components\Arcmap\mapTool.vue
-->
<template>
  <div class='mapDiv'>
    <div id='mapDivRef' class='mapDiv'></div>
    <div class="anima-div">
      <!-- <Button @click="animaShp">要素动画</Button>
            <Button @click="moveShp">要素移动</Button>
            <Button @click="airplineShp">航线动画</Button> -->
      <Button @click="HeatmapRenderer">热力图</Button>
      <Button @click="drawPoint">绘制点</Button>
      <Button @click="drawPoliny">绘制线</Button>
      <Button @click="drawPolygon ">绘制面</Button>
      <Button @click="clear">清除要素</Button>
    </div>
  </div>
</template>
<script>

import { loadCss, loadModules } from 'esri-loader'
export default {
  name: 'mapTool',
  data () {
    return {
      heatData: [
        { 'lng': '113.241533', 'lat': '23.174944' },
        { 'lng': '113.295845', 'lat': '23.169628' },
        { 'lng': '113.215570', 'lat': '23.175434' },
        { 'lng': '113.214564', 'lat': '23.115446' },
        { 'lng': '113.241545', 'lat': '23.115464' },
        { 'lng': '113.241561', 'lat': '23.125354' },
        { 'lng': '113.201554', 'lat': '23.102765' },
        { 'lng': '113.202659', 'lat': '23.159014' },
        { 'lng': '113.281054', 'lat': '23.101584' },
        { 'lng': '113.248750', 'lat': '23.140897' },
        { 'lng': '113.204789', 'lat': '23.181070' },
        { 'lng': '113.208056', 'lat': '23.104895' },
        { 'lng': '113.214592', 'lat': '23.104849' },
        { 'lng': '113.201546', 'lat': '23.159029' },
        { 'lng': '113.210564', 'lat': '23.160465' },
        { 'lng': '113.243057', 'lat': '23.149466' },
        { 'lng': '113.230489', 'lat': '23.190659' },
        { 'lng': '113.245807', 'lat': '23.154065' },
        { 'lng': '113.250604', 'lat': '23.189056' },
        { 'lng': '113.245649', 'lat': '23.154565' },
        { 'lng': '113.287890', 'lat': '23.178068' },
        { 'lng': '113.287098', 'lat': '23.189498' },
        { 'lng': '113.280879', 'lat': '23.132387' },
        { 'lng': '113.264616', 'lat': '23.146495' }
      ]
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      let _this = this
      // loadCss('https://js.arcgis.com/4.18/esri/themes/light/main.css')
      loadModules([
        'esri/Map',
        'esri/views/MapView', // 2d视图模块
        'esri/layers/WebTileLayer',
        'esri/renderers/HeatmapRenderer',
        'esri/layers/KMLLayer',
        'esri/views/draw/Draw',
        'esri/Graphic',
        "esri/layers/GraphicsLayer",
        "esri/geometry/Polyline"
      ])
        .then(([
          Map,
          MapView,
          WebTileLayer,
          HeatmapRenderer,
          KMLLayer,
          Draw,
          Graphic,
          GraphicsLayer,
          Polyline
        ]) => {
          _this.layerDT = new WebTileLayer({
            urlTemplate: 'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=42dca576db031641be0524ee977ddd04'
          })
          _this.layerZJ = new WebTileLayer({
            urlTemplate: 'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=42dca576db031641be0524ee977ddd04'
          })
          _this.map = new Map({
            layers: [this.layerDT, this.layerZJ]
          })
          _this.MapView = new MapView({
            container: 'mapDivRef',
            map: this.map,
            zoom: 10,
            center: [113.272579, 23.136134]
          })
          _this.Draw = new Draw({
            view: _this.MapView
          })
          _this.Graphic = Graphic
          _this.Polyline = Polyline
          let hightLayer = new GraphicsLayer({id : 'hightLayer'});
          _this.map.add(hightLayer)
        })
    },
    HeatmapRenderer () {
      let _this = this
      loadModules([
        'esri/renderers/HeatmapRenderer',
        'esri/layers/FeatureLayer'
      ])
        .then(([
          HeatmapRenderer,
          FeatureLayer
        ]) => {
          let heatmapRenderer = new HeatmapRenderer({// 设置渲染器
            colorStops: [
              { ratio: 0.1, color: 'rgba(0, 255, 0, 0)' },
              { ratio: 0.5, color: 'rgba(255, 140, 0, 1)' },
              { ratio: 1, color: 'rgba(255, 0,   0, 1)' }
            ],
            blurRadius: 8,
            maxPixelIntensity: 15,
            minPixelIntensity: 0,
            field: 'ObjectID'
          })

          let features = []
          for (var i = 0; i < _this.heatData.length; i++) {
            var x = _this.heatData[i].lng
            var y = _this.heatData[i].lat
            features.push({
              geometry: {
                type: 'point',
                x: x,
                y: y
              },
              attributes: {
                ObjectID: i
              }
            })
          }

          let Layer = new FeatureLayer({
            source: features,
            title: '热力图',
            objectIdField: 'ObjectID',
            renderer: heatmapRenderer// 渲染器
          })
          _this.map.add(Layer)
        })
    },
    drawPoint () {
      let _this = this
      this.pointAction = this.Draw.create('point',{mode: "click"})
      this.pointAction.on('draw-complete', (evt) => {
        let point = {
          type: "point",
          x: evt.coordinates[0],
          y: evt.coordinates[1],
          spatialReference: _this.MapView.spatialReference
        }
        let graphic = new _this.Graphic({
          geometry: point,
          symbol: {
            type: "simple-marker",
            color: "#87CEFA",
            size: "16px",
            outline: {
              color: [255, 255, 0],
              width: 3
            }
          }
        });
        let hightLayer = _this.map.findLayerById('hightLayer')
        hightLayer.add(graphic);
      })
    },
    drawPoliny () {
      let _this = this
      var action = this.Draw.create("polyline");
      action.on(["cursor-update","draw-complete"],function (evt) {
        _this.clear()
        let Polyline = {
          type: 'polyline',
          paths: evt.vertices,
          spatialReference: _this.MapView.spatialReference
        }
        let graphic = new _this.Graphic({
          geometry: Polyline,
          symbol: {
            type: "simple-line", // autocasts as SimpleLineSymbol
            color: [4, 90, 141],
            width: 3,
            cap: "round",
            join: "round"
          }
        })
        let hightLayer = _this.map.findLayerById('hightLayer')
        hightLayer.add(graphic);
      })
    },
    drawPolygon () {
      let _this = this
      var action = this.Draw.create("polygon");
      action.on(["cursor-update","draw-complete"],function (evt) {
        _this.clear()
        let polygon = {
          type: 'polygon',
          rings: evt.vertices,
          spatialReference: _this.MapView.spatialReference
        }
        let graphic = new _this.Graphic({
          geometry: polygon,
          symbol: {
            type: "simple-fill",
            color: [227, 139, 79, 0.8],  // Orange, opacity 80%
            outline: {
                color: [255, 255, 0],
                width: 1
            }
          }
        })
        let hightLayer = _this.map.findLayerById('hightLayer')
        hightLayer.add(graphic);
      })
    },
    clear () {
      this.map.findLayerById('hightLayer').removeAll()
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
