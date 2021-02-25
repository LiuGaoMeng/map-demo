<template>
  <div class='mapDiv'>
    <div ref='mapDivRef' id='mapDivRef' class='mapDiv'></div>
  </div>
</template>
<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
export default {
  name: 'map',
  data() {
    return {
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
        this.mapDivRef = new Map({
            target: "mapDivRef",
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                projection: "EPSG:4326", // 坐标系，有EPSG:4326和EPSG:3857
                center: [114.064839, 22.548857], // 深圳坐标
                minZoom:10, // 地图缩放最小级别
                zoom: 12 // 地图缩放级别（打开页面时默认级别）
            })
        })
    }
  }
};
</script>
<style lang='less' scoped>
.mapDiv {
  width: 100%;
//   height: 100%;
  //  width: 800px;
  height: 1000px;
}
</style>
