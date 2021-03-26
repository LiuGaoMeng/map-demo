<!--
 * @Author: your name
 * @Date: 2021-03-08 16:05:46
 * @LastEditTime: 2021-03-26 18:01:33
 * @LastEditors: licheng
 * @Description: In User Settings Edit
 * @FilePath: \map-demo\src\components\Arcmap\mapTool.vue
-->
<template>
  <div class='mapDiv'>
    <div class="layerTree-card">
      <el-card class="box-card">
        <h4>图层列表</h4>
        <el-checkbox-group v-model="checkedlist">
          <el-checkbox v-for="item in list" :label="item.name" :key="item.name" @change="layerControl(item)">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-card>
    </div>
    <div id='mapDivRef' class='mapDiv'></div>
    <div class="anima-div">
      <el-dropdown>
        <Button class="el-dropdown-link">
            绘制<i class="el-icon-arrow-down el-icon--right"></i>
        </Button>
        <el-dropdown-menu size="small" slot="dropdown" @click="handleClick">
          <el-dropdown-item @click.native="drawPoint">绘制点</el-dropdown-item>
          <el-dropdown-item @click.native="drawPoliny">绘制线</el-dropdown-item>
          <el-dropdown-item @click.native="drawPolygon">绘制面</el-dropdown-item>
          <el-dropdown-item @click.native="ranging">测距</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <Button @click="HeatmapRenderer">热力图</Button>
      <!-- <Button @click="drawPoint">绘制点</Button>
      <Button @click="drawPoliny">绘制线</Button>
      <Button @click="drawPolygon">绘制面</Button>
      <Button @click="ranging">测距</Button> -->
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
      checkedlist: [],
      list: [],
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
      // loadCss('https://js.arcgis.com/4.18/esri/themes/light/main.css')
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
        "esri/config"
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
          esriConfig
        ]) => {
          this.layerDT = new WebTileLayer({
            name:"天地图底图",
            urlTemplate: 'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=42dca576db031641be0524ee977ddd04'
          })
          this.layerZJ = new WebTileLayer({
            name:"天地图注记",
            urlTemplate: 'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=42dca576db031641be0524ee977ddd04'
          })
          this.layerYX = new WebTileLayer({
            name:"天地图影像",
            visible:false,
            urlTemplate: 'http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=42dca576db031641be0524ee977ddd04'
          })
          this.layerYXZJ = new WebTileLayer({
            name:"天地图影像注记",
            visible:false,
            urlTemplate: 'http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=42dca576db031641be0524ee977ddd04 '
          })
          this.map = new Map({
            layers: [this.layerDT, this.layerZJ, this.layerYX, this.layerYXZJ]
          })
          this.InitLayerTree()
          this.MapView = new MapView({
            container: 'mapDivRef',
            map: this.map,
            zoom: 10,
            center: [113.272579, 23.136134]
          })
          this.Draw = new Draw({
            view: this.MapView
          })
          esriConfig.fontsUrl = "http://120.79.149.109:12306/arcgis_js_api/library/4.11/4.11/fonts"
          this.TextSymbol = TextSymbol
          this.Graphic = Graphic
          this.Polyline = Polyline
          this.GeometryService = GeometryService
          this.LengthsParameters = LengthsParameters
          let hightLayer = new GraphicsLayer({id : 'hightLayer'});
          this.map.add(hightLayer)
        })
    },
    HeatmapRenderer () {
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
          for (var i = 0; i < this.heatData.length; i++) {
            var x = this.heatData[i].lng
            var y = this.heatData[i].lat
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
            id: 'heatmapLayer',
            // source: features,
            url:"http://172.26.40.225:6080/arcgis/rest/services/MapDemo/heatPoint/FeatureServer/0",
            title: '热力图',
            objectIdField: 'ObjectID',
            renderer: heatmapRenderer// 渲染器
          })
          this.map.add(Layer)
        })
    },
    drawPoint () {
      this.MapViewEvent = this.MapView.on('click',x => {
        this.pointAction = this.Draw.create('point',{mode: "click"})
        this.pointAction.on('draw-complete', (evt) => {
          let point = {
            type: "point",
            x: evt.coordinates[0],
            y: evt.coordinates[1],
            spatialReference: this.MapView.spatialReference
          }
          let graphic = new this.Graphic({
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
          let hightLayer = this.map.findLayerById('hightLayer')
          hightLayer.add(graphic);
        })
      })
    },
    drawPoliny () {
      let _this = this
      var action = this.Draw.create("polyline");
      action.on(["cursor-update","draw-complete"],function (evt) {
        debugger
        _this.clear()
        let Polyline = {
            type: 'polyline',
            paths: evt.vertices,
            spatialReference: _this.MapView.spatialReference
        }
        let Point = {
          type: 'point',
          x: evt.vertices[evt.vertices.length - 1][0],
          y: evt.vertices[evt.vertices.length - 1][1],
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
        var textSymbol = {
          type: "text",  // autocasts as new TextSymbol()
          color: "white",
          haloColor: "black",
          haloSize: "1px",
          text: "双击结束绘制",
          xoffset: 3,
          yoffset: 3,
          font: {  // autocasts as new Font()
            size: 12,
            family: "Josefin Slab",
            weight: "bold"
          }
        }
        let testTip = new _this.Graphic({
          geometry: Point,
          symbol: textSymbol
        })
        let hightLayer = _this.map.findLayerById('hightLayer')
        hightLayer.add(graphic);
        hightLayer.add(testTip);
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
    ranging () {
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
        if (evt.type === 'draw-complete') {
          let lengths = new _this.GeometryService('http://121.33.231.74:60/arcgis/rest/services/Utilities/Geometry/GeometryServer')
          let LengthsParameters = new _this.LengthsParameters()
          LengthsParameters.distanceUnit = 'meters';
          LengthsParameters.polylines=[Polyline]
          lengths.lengths(LengthsParameters).then(x => {
            let Point = {
              type: 'point',
              x: evt.vertices[evt.vertices.length - 1][0],
              y: evt.vertices[evt.vertices.length - 1][1],
              spatialReference: _this.MapView.spatialReference
            }
            var textSymbol = {
              type: "text",  // autocasts as new TextSymbol()
              color: "white",
              haloColor: "black",
              haloSize: "1px",
              text: x.lengths + "米",
              xoffset: 3,
              yoffset: 3,
              font: {  // autocasts as new Font()
                size: 12,
                family: "Josefin Slab",
                weight: "bold"
              }
            }
            let testTip = new _this.Graphic({
              geometry: Point,
              symbol: textSymbol
            })
            hightLayer.add(testTip);
          })
        }
      })
    },
    clear () {
      if (this.MapViewEvent) this.MapViewEvent.remove()
      this.map.findLayerById('hightLayer').removeAll()
      if (this.map.findLayerById('heatmapLayer')) this.map.remove(this.map.findLayerById('heatmapLayer')  )
    },
    //初始化图层列表
    InitLayerTree() {
      this.map.layers.items.map(x => {
        if (x.visible) {
          this.checkedlist.push(x.name)
        }
        this.list.push(x)
      })
    },
    layerControl (layer) {
      layer.visible = !layer.visible
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
  .layerTree-card {
    width: 250px;
    display: inline-block;
    position: absolute;
    z-index: 999;
    right: 10px;
    top: 10px;
  }
}
</style>
