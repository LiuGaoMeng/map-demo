<template>
  <div class='mapDiv'>
    <div ref='mapDivRef' id='mapDivRef' class='mapDiv'>
    </div>
    <div class="anima-div">
          <Button @click="OrMeh()">Or</Button>
          <Button @click="AndMeh()">And</Button>
          <Button @click="NotMeh()">Not</Button>
          <Button @click="BboxMeh()">Bbox</Button>
          <Button @click="WithinMeh()">Within</Button>
          <Button @click="IsNullMeh()">IsNull</Button>
          <Button @click="IsLikeMeh()">IsLike</Button>
          <Button @click="DuringMeh()">During</Button>
          <Button @click="EqualToMeh()">EqualTo</Button>
          <Button @click="LessThanMeh()">LessThan</Button>
          <Button @click="ContainsMeh()">Contains</Button>
          <Button @click="IsBetWeenMeh()">IsBetWeen</Button>
          <Button @click="NotEqualToMeh()">NotEqualTo</Button>
          <Button @click="InstresectsMeh()">Instresects</Button>
          <Button @click="GreaterThanMeh()">GreaterThan</Button>
          <Button @click="LessThanOrEqualToMeh()">LessThanOrEqualTo</Button>
          <Button @click="greaterThanOrEqualToMeh()">greaterThanOrEqualTo</Button>
        </div>
  </div>
</template>
<script type="text/javascript">
import "ol/ol.css"
import ol from "@/utils/ol"
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
        filterSource:null,
        filterLayer:null,
        map:null
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
        this.filterSource=new ol.source.Vector({
          wrapX:false
        })
        this.filterLayer=new ol.layer.Vector({
          source:this.filterSource,
          style:new ol.style.Style({
            fill:new ol.style.Fill({
                    color:'rgba(255,255,0.2)'
                }),
            stroke:new ol.style.Stroke({
                    color:'#ffcc33',
                    width:5
                }),
            image:new ol.style.Circle({
                    radius:7,
                    fill:new ol.style.Fill({
                        color:'#ffcc33'
                    })
                })

          })
        })
       
      
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
        this.map = new Map({
            layers: [vector,this.filterLayer],
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
        this.map.on('click',(evt)=>{
          //点击获取数据
         let feature= map.getFeaturesAtPixel(evt.pixel)
         
         if(feature.length>0){
           alert(feature[0].getProperties().addr)
         }else{
           alert('请正确选择')
         }
         
        })
    },
    OrMeh(){
      this.filterSource.clear()
      let featureRequest=new ol.format.WFS().writeGetFeature({
        srsName:'EPSG:2435',//坐标系
        featureNS:'http://192.168.30.147:8080/pipe',// 注意这个值必须为创建工作区时的命名空间URI
        featurePrefix:'pipe',//工作区的命名
        featureTypes:['ps_pipe_zy_new'],//所要访问的图层
        outputFormat:'application/json',
        filter:ol.format.filter.or(
          ol.format.filter.like('addr',"东沙小学"),
          ol.format.filter.like('addr',"紫翠街")
        )
        // filter:ol.format.filter.and(
        //   ol.format.filter.like('addr',"东沙小学")
        // )district  "荔湾区"
      })
      this.queryData(featureRequest)
    },
    AndMeh(){
      this.filterSource.clear()
      let featureRequest=new ol.format.WFS().writeGetFeature({
        srsName:'EPSG:2435',//坐标系
        featureNS:'http://192.168.30.147:8080/pipe',// 注意这个值必须为创建工作区时的命名空间URI
        featurePrefix:'pipe',//工作区的命名
        featureTypes:['ps_pipe_zy_new'],//所要访问的图层
        outputFormat:'application/json',        
        filter:ol.format.filter.and(
          ol.format.filter.equalTo('gid',459662),
          ol.format.filter.equalTo('district',"荔湾区")
        )  
      })
      this.queryData(featureRequest)
    },
    NotMeh(){
      this.filterSource.clear()
      let featureRequest=new ol.format.WFS().writeGetFeature({
        srsName:'EPSG:2435',//坐标系
        featureNS:'http://192.168.30.147:8080/pipe',// 注意这个值必须为创建工作区时的命名空间URI
        featurePrefix:'pipe',//工作区的命名
        featureTypes:['ps_pipe_zy_new'],//所要访问的图层
        outputFormat:'application/json',        
        filter:ol.format.filter.and(
          ol.format.filter.like('addr',"东沙小学"),
          ol.format.filter.not(
            ol.format.filter.notEqualTo('sort',"污水"),
            ol.format.filter.notEqualTo('sort',"雨水"),
            ol.format.filter.notEqualTo('addr', "紫翠街")
          )
        )
        //无线循环
        // filter: ol.format.filter.not(
        //     ol.format.filter.like('addr',"东沙小学"),
        //     ol.format.filter.notEqualTo('addr', "紫翠街")
        //   )
      })
      this.queryData(featureRequest)
    },
    BboxMeh(){},
    WithinMeh(){},
    IsNullMeh(){
      this.filterSource.clear()
      let featureRequest=new ol.format.WFS().writeGetFeature({
        srsName:'EPSG:2435',//坐标系
        featureNS:'http://192.168.30.147:8080/pipe',// 注意这个值必须为创建工作区时的命名空间URI
        featurePrefix:'pipe',//工作区的命名
        featureTypes:['ps_pipe_zy_new'],//所要访问的图层
        outputFormat:'application/json',        
        filter:ol.format.filter.and(
          ol.format.filter.like('addr',"东沙小学"),
          ol.format.filter.isNull('project_name'),
        )
      })
      this.queryData(featureRequest)
    },
    IsLikeMeh(){
      let featureRequest=new ol.format.WFS().writeGetFeature({
        srsName:'EPSG:2435',//坐标系
        featureNS:'http://192.168.30.147:8080/pipe',// 注意这个值必须为创建工作区时的命名空间URI
        featurePrefix:'pipe',//工作区的命名
        featureTypes:['ps_pipe_zy_new'],//所要访问的图层
        outputFormat:'application/json',
        filter:ol.format.filter.like('addr',"东沙小学")
        
        // filter:ol.format.filter.and(
        //   ol.format.filter.like('addr',"东沙小学")
        // )
      })
      this.queryData(featureRequest)
    },
    DuringMeh(){},
    EqualToMeh(){
      let featureRequest=new ol.format.WFS().writeGetFeature({
        srsName:'EPSG:2435',//坐标系
        featureNS:'http://192.168.30.147:8080/pipe',// 注意这个值必须为创建工作区时的命名空间URI
        featurePrefix:'pipe',//工作区的命名
        featureTypes:['ps_pipe_zy_new'],//所要访问的图层
        outputFormat:'application/json',        
        filter:ol.format.filter.and(
          ol.format.filter.equalTo('addr',"东沙小学"),
          ol.format.filter.equalTo('district',"荔湾区")
        )  
      })
      this.queryData(featureRequest)
    },
    LessThanMeh(){},
    ContainsMeh(){},
    IsBetWeenMeh(){},
    NotEqualToMeh(){},
    InstresectsMeh(){},
    GreaterThanMeh(){},
    LessThanOrEqualToMeh(){},
    greaterThanOrEqualToMeh(){},
    queryData(featureRequest){
      fetch('http://192.168.30.147:8080/geoserver/pipe/wfs',{
        method:'POST',
        body:new XMLSerializer().serializeToString(featureRequest)
      }).then((response)=>{
        return response.json()
      }).then((json)=>{
        debugger
        let feature=new ol.format.GeoJSON().readFeatures(json)
        this.filterSource.addFeatures(feature)
        this.map.getView().fit(this.filterSource.getExtent());
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
.anima-div{
    position: absolute;
    top:5px;
    left:5%;
}
</style>
