<template>
  <div class='mapDiv'>
    <div ref='mapDivRef' id='mapDivRef' class='mapDiv'>
    </div>
  </div>
</template>
<script type="text/javascript">
import "ol/ol.css"
import Map from "ol/Map"
import View from "ol/View"
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
  name: 'wfsmap',
  data() {
    return {
        url: 'http://192.168.30.147:8080/',
        map:null,
        wfsParams: {    
              service : 'WFS',    
              version : '1.0.0',    
              request : 'GetFeature', 
              styles:'sdepipe', 
              // maxFeatures:1000,
              // typeName : 'demo:polylineTest',  //图层名称     
               typeName : 'pipe:ps_pipe_zy_new',
              outputFormat : 'application/json',  //重点，不要改变  
        },
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
        //参数字段  
      // var wfsParams = {    
      //         service : 'WFS',    
      //         version : '1.0.0',    
      //         request : 'GetFeature',    
      //         typeName : 'demo:polylineTest',  //图层名称     
      //         outputFormat : 'text/javascript',  //重点，不要改变  
      //       //   format_options : 'callback:loadFeatures'  //回调函数声明  
      //   }; 
        var mousePositionControl = new MousePosition({
            coordinateFormat: createStringXY(6),//精确的位数
            projection: 'EPSG:2435',//改成自己的坐标系
            
            className: 'custom-mouse-position',
            target: document.getElementById('mouse-position'),
            undefinedHTML: '&nbsp;'
        });
      
      //方法二
        var source=new VectorSource({
            format: new GeoJSON(),
            loader: (extent,resolution, projection)=> {
              var url = 'http://192.168.30.147:8080/geoserver/wfs?bbox='+extent.join(','); 
              axios.request({    
                      url: url,    
                      params : this.wfsParams, 
                      method: 'get',
                      // responseType: 'jsonp',   //解决跨域的关键  
              })
              .then((res) => {
                source.addFeatures(new GeoJSON().readFeatures(res.data)); 
                
              });    
            },
            styles: '',
            strategy:bboxStrategy,
          })

         var vector = new VectorLayer({
         // 方法一
          source: new VectorSource({
                format: new GeoJSON(),
                url: function(extent) {
                  // return 'http://192.168.30.147:8080/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=demo:polylineTest&maxFeatures=50&outputFormat=application/json'
                      return 'http://192.168.30.147:8080/geoserver/pipe/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pipe:ps_pipe_zy_new&outputFormat=application/json'+
                      '&bbox='+extent.join(',')
                },
                styles: 'default',
                strategy:bboxStrategy,
          }),

          // source: source,
         
            });
        var map = new Map({
            layers: [vector],
            target: 'mapDivRef',
            view: new View({
                // center: [43253.10261, 28479.09492],
                center: [36348.980519, 22068.403211],
                zoom: 22,
                maxZoom: 25,
            }),
             controls: defaults({
                attributionOptions: ({
                    collapsible: true
                })
            }).extend([mousePositionControl])
        });
        map.on('click',(evt)=>{
          //点击获取数据
         let feature= map.getFeaturesAtPixel(evt.pixel)
         debugger
         if(feature.length>0){
           alert(feature[0].getProperties().addr)
         }else{
           alert('请正确选择')
         }
         
        })
    },
    
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
