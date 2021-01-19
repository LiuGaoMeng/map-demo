<template>
  <div class='mapDiv'>
    <div ref='mapDivRef' id='mapDivRef' class='mapDiv'></div>
    <div id="info"></div>
  </div>
</template>
<script type="text/javascript">
import "ol/ol.css"
import Map from "ol/Map"
import View from "ol/View"
import TileLayer from "ol/layer/Tile"
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import TileArcGISRest from 'ol/source/TileArcGISRest'
import Projection from 'ol/proj/Projection';

import XYZ from 'ol/source/XYZ'
import OSM from "ol/source/OSM"
import TileWMS from "ol/source/TileWMS"
import ImageWMS from "ol/source/ImageWMS"
import Image from "ol/layer/Image"
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import VectorLayer from 'ol/layer/Vector'
import {Stroke, Style} from 'ol/style'
import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import axios from 'axios'
import MousePosition from 'ol/control/MousePosition'
import {createStringXY as createStringXY }from 'ol/coordinate'
import {defaults} from 'ol/control';
export default {
  name: 'wmsAndWmts',
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

       var mousePositionControl = new MousePosition({
            coordinateFormat: createStringXY(9),//精确的位数
            projection: 'EPSG:2435',//改成自己的坐标系
            
            className: 'custom-mouse-position',
            target: document.getElementById('mouse-position'),
            undefinedHTML: '&nbsp;'
        });


    var gridNames = ['basemapnew:0', 'basemapnew:1', 'basemapnew:2', 'basemapnew:3', 'basemapnew:4', 'basemapnew:5', 'basemapnew:6', 'basemapnew:7', 'basemapnew:8', 'basemapnew:9', 'basemapnew:10', 'basemapnew:11'];
    //切片大小
    var resolutions = [323.56615759999994, 161.78167879999998, 80.89083799999999, 40.445420399999996,20.2227088,10.1113544, 5.0556772, 2.52784, 1.26392, 0.63196, 0.31598, 0.15799];
     var origins=[
                [4052.327672494035,131437.87578794747],
                [4052.327672494035,131436.44218794748],
                [4052.327672494035,131436.43932074748],
                [4052.327672494035,121082.41743274749],
                [4052.327672494035,121082.40668074749],
                [4052.327672494035,121082.40668074749],
                [4052.327672494035,121082.40668074749],
                [4052.327672494035,121082.4926967475],
                [4052.327672494035,120758.92917674751],
                [4052.327672494035,120758.92917674751],
                [4052.327672494035,120678.03829674749],
                [4052.327672494035,120637.5928567475]
            ]

     
           var projection = new Projection({
                        code: 'EPSG:2435',
                        units: 'm',
                        axisOrientation: 'neu'
                    });

        var tile=
            new TileLayer({
                source: new WMTS({
                     url: this.url+'geoserver/gwc/service/wmts',
                    //切片信息
                    tileGrid: new WMTSTileGrid({
                        tileSize: [256, 256],
                        extent: [4052.327672494035,-34227.9969032525,1.2263326906821292E7,131437.87578794747],
                        origins:origins,
                        resolutions: resolutions,
                        matrixIds: gridNames
                    }),
                    layer: 'basemap:basemap',
                    format: 'image/png',
                    matrixSet: 'basemapnew',
                    version:'1.0.0',
                    cacheSize:512,
                    style: '',
                    wrapX: true,
                })
            })
           var wmsshp=
            new TileLayer({
                source: new TileWMS({
                    url: this.url+'geoserver/pipe/wms',
                    params: {
                        'LAYERS': 'pipe:ps_pipe_zy_new',
                        'STYLES': '',
                        'VERSION': '1.1.0',
                        'FORMAT': 'image/png',
                        'CRS': 'EPSG:2435', 
                        'tiled': true
                    },
                    crossOrigin: 'anonymous',
                    cacheSize:512,
                    // gutter:0,
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
            layers: [tile,wmsshp],
            view: new View({
                center: [65087.233337379,29694.707695371], 
                // extent: [4052.327672494035,-34227.9969032525,12263326.906821292,131437.87578794747],//限制图层显示的范围。
                zoom:17,
                projection: projection,
            }),
              controls: defaults({
                attributionOptions: ({
                    collapsible: false
                })
            }).extend([mousePositionControl])
        })
        this.map.on('singleclick',(evt)=>{
            
            let view=this.map.getView().getResolution()
            
            let url=wmsshp.getSource().getFeatureInfoUrl(evt.coordinate,view,projection,{'INFO_FORMAT': 'text/html'})
            fetch(url).then((res)=>{
                debugger
                return res.text();
            }).then((html)=>{
                debugger
                document.getElementById('info').innerHTML = html;
            })
            //接口获取数据--wms
            axios.get(url).then(res=>{
              debugger
            })
            // if (url) {
            //     debugger
            //     document.getElementById('info').innerHTML =
            //         '<iframe seamless src="' + url + '"></iframe>';
            //   }
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
  height: 600px;
}
</style>
