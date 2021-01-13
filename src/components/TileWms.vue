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
import XYZ from 'ol/source/XYZ'
import OSM from "ol/source/OSM"
import TileWMS from "ol/source/TileWMS"
import ImageWMS from "ol/source/ImageWMS"
import Image from "ol/layer/Image"
export default {
  name: 'TileWms',
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
                    url: this.url+'geoserver/basemap/wms',
                    params: {
                        'LAYERS': 'basemap:basemap',
                        'STYLES': '',
                        'VERSION': '1.1.1',
                        'FORMAT': 'image/png',
                        'CRS': 'EPSG:2435', 
                        'tiled': false
                    },
                    cacheSize:512,
                    gutter:0,
                    hidpi:true,
                    // imageSmoothing:true,//图片模糊
                    serverType: "geoserver",
                    transition: 0,
                    //  projection: "EPSG:2435", 
                }),
                // visible: true,
                className: 'wms'
            })
        this.map = new Map({
            target: "mapDivRef",
            layers: [tile],
            view: new View({
                center: [41613.14338386732, 27390.501934476404], 
                zoom:12,
                minZoom:1, // 地图缩放最小级别
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
