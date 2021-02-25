<template>
  <div class='mapDiv'>
    <div ref='mapDivRef' id='mapDivRef' class='mapDiv'></div>
  </div>
</template>
<script type="text/javascript">
import "ol/ol.css"
import Map from "ol/Map"
import View from "ol/View"
import TileLayer from "ol/layer/Tile"
import TileArcGISRest from 'ol/source/TileArcGISRest'
import OSM from "ol/source/OSM"
import TileWMS from "ol/source/TileWMS"
import ImageWMS from "ol/source/ImageWMS"
import Image from "ol/layer/Image"
export default {
  name: 'ArcMap',
  data() {
    return {
        url: 'http://192.168.30.147:8080/',
        map:null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
       
          //加载Arcgis 
          var maplayer=new TileLayer({
              source:new TileArcGISRest({
                  url:'http://121.33.231.74:60/arcgis/rest/services/yongjiang/nj/MapServer'
              })
          })
        this.map = new Map({
            target: "mapDivRef",
            layers: [maplayer],
            view: new View({
                center: [108.30,22.76], 
                zoom:14,
                minZoom:10, // 地图缩放最小级别
               projection: "EPSG:4326", 
            }),
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
