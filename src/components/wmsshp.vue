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
import {defaults,ZoomToExtent,MousePosition,OverviewMap} from "ol/control"
import ScaleLine from 'ol/control/ScaleLine';
import {createStringXY} from "ol/coordinate"
export default {
  name: 'wmsshp',
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
        /**
         * 鼠标移动获取位置信息
         */
        var mousePositionControl = new MousePosition({
            //坐标格式
            coordinateFormat: createStringXY(4),
            //地图投影坐标系（若未设置则输出为默认投影坐标系下的坐标）
            projection: 'EPSG:2435',
            //坐标信息显示样式类名，默认是'ol-mouse-position'
            className: 'custom-mouse-position',
            //显示鼠标位置信息的目标容器
            // target: document.getElementById('mouse-position'),
            //未定义坐标的标记
            undefinedHTML: '&nbsp;'
        })
        /**
         * 左侧移动指定范围
         */
        var movezoomToExtent= new ZoomToExtent({
            extent: [
                4052.327672494035,-34227.9969032525,12263326.906821292,131437.87578794747
            ]
        })
        /**
         * 比例尺
         */
        var scaleLineControl= new ScaleLine({
            bar: true,
            text: true,
            minWidth:70,
            units: "metric"
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
        
         /**
         * 鹰眼
         */
        var overviewMap = new OverviewMap({
            className: 'ol-overviewmap ol-custom-overviewmap',
            layers: [wmsshp],
        })
        
        
        
        this.map = new Map({
            target: "mapDivRef",
            layers: [wmsshp],
            view: new View({
                center: [36348.980519, 22068.403211], 
                zoom:19,
                minZoom:1, // 地图缩放最小级别
            }),
            controls: defaults({
                attibutionOptions:({
                    collapsible: true
                })
            }).extend([
               movezoomToExtent,mousePositionControl,scaleLineControl,overviewMap
            ])
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
  height: 900px;
}
 /*=S 自定义鹰眼样式 */
        .ol-custom-overviewmap, .ol-custom-overviewmap.ol-uncollapsible {
            bottom: auto;
            left: auto;
            /* 右侧显示 */
            right: 0;
            /* 顶部显示 */
            top: 0;
        }
        /* 鹰眼控件展开时控件外框的样式 */
        .ol-custom-overviewmap:not(.ol-collapsed)  {
            border: 1px solid black;
        }
         /* 鹰眼控件中地图容器样式 */
        .ol-custom-overviewmap .ol-overviewmap-map {
            border: none;
            width: 300px;
        }
        /* 鹰眼控件中显示当前窗口中主图区域的边框 */
        .ol-custom-overviewmap .ol-overviewmap-box {
            border: 2px solid red;
        }
        /* 鹰眼控件展开时其控件按钮图标的样式 */
        .ol-custom-overviewmap:not(.ol-collapsed) button{
            bottom: auto;
            left: auto;
            right: 1px;
            top: 1px;
        }
        /*=E 自定义鹰眼样式 */
</style>
