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
  name: 'GeoMap',
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
        var tile=
            new TileLayer({
                source: new TileWMS({
                    url: this.url+'geoserver/demo/wms',
                    params: {
                        'LAYERS': 'demo:polylineTest',
                        'STYLES': '',
                        'VERSION': '1.1.0',
                        'FORMAT': 'image/png',
                        'CRS': 'EPSG:2435', 
                        'tiled': true
                    },
                    serverType: "geoserver",
                    // transition: 0,
                    //  projection: "EPSG:2435", 
                }),
                // visible: true,
                // className: 'wms'
            })
        this.map = new Map({
            target: "mapDivRef",
            layers: [tile],
            view: new View({
                center: [41916.95204,29395.31245], 
                zoom:14,
                minZoom:10, // 地图缩放最小级别
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
