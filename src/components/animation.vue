<template>
    <div class="mapDiv">
        <div ref="mapDiv" id="mapDiv" class="mapDiv"></div>
        <div class="anima-div">
            <Button @click="animaShp">要素动画</Button>
            <Button @click="moveShp">要素移动</Button>
            <Button @click="airplineShp">航线动画</Button>
             <Button @click="hotshp">热力图</Button>
        </div>
        <div class="sliderDiv" ref="sliderDiv" hidden>
                <label>运动速度：</label>
                <Slider v-model="sliValue" :max=5></Slider>
                <Button @click="startMove">开始运动</Button>
                <Button @click="stopMove">停止运动</Button>
        </div>
    </div>
</template>
<script>
import"ol/ol.css"
import ol from "@/utils/ol"
export default {
    name:'animation',
    data(){
        return{
            sliValue:1,
            map:null,
            animating:false,
            vectorLayer:null,
            moveLine:null
        }
    },
    created(){

    },
    mounted(){
        this.initMap()
    },
    methods:{
         initMap(){
            var vm=this
            /*
            * 比例尺dd
            */
            var scaleLineControl= new ol.control.ScaleLine({
                // className: 'my-scale-line',
                bar: true,
                // text: true,
                minWidth:70,
                units: "metric"
            })
            /**
             * 鼠标移动获取位置信息
             */
            var mousePositionControl = new ol.control.MousePosition({
                //坐标格式
                coordinateFormat: ol.coordinate.createStringXY(4),
                //地图投影坐标系（若未设置则输出为默认投影坐标系下的坐标）
                projection: 'EPSG:2435',
                //坐标信息显示样式类名，默认是'ol-mouse-position'
                className: 'custom-mouse-position',
                //显示鼠标位置信息的目标容器
                // target: document.getElementById('mouse-position'),
                //未定义坐标的标记
                undefinedHTML: '&nbsp;'
            })
            var tdtMap_cia=new ol.layer.Tile({
                name:'天地图影像标记层',
                source:new ol.source.XYZ({
                    url: "http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=42dca576db031641be0524ee977ddd04",//parent.TiandituKey()为天地图密钥,
                    crossOrigin: 'anonymous',
                    wrapX: false
                }),
                visible:false
            })
            this.tdtMap_vec=new ol.layer.Tile({
                name:'天地图矢量图层',
                source: new ol.source.XYZ({
                    url:"http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=42dca576db031641be0524ee977ddd04",
                    crossOrigin: 'anonymous',
                    wrapX:false
                })
            })
            var tdtMap_cva=new ol.layer.Tile({
                name:'天地图矢量标记图层',
                source:new ol.source.XYZ({
                    url:'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=42dca576db031641be0524ee977ddd04',
                    crossOrigin: 'anonymous',
                    wrapX:false
                })
            })
            this.tdtMap_img=new ol.layer.Tile({
                name:'天地图影像图层',
                source:new ol.source.XYZ({
                    url:'http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=42dca576db031641be0524ee977ddd04',
                    crossOrigin: 'anonymous',
                    wrapX:false
                }),
                visible:false
            })
            //实例化Map对象
            this.map= new ol.Map({
                target:'mapDiv',
                layers:[this.tdtMap_vec,tdtMap_cva,this.tdtMap_img,tdtMap_cia],
                view:new ol.View({
                    //地图中心点
                    center:[12606072.0, 2650934.0],
                    zoom:6
                }), controls:ol.interaction.defaults({
                    attibuttonOptions:({
                        collapsible: true
                    })
                }).extend([mousePositionControl])
                
            })
    },
    animaShp(){
    
    },
    moveShp(){
        this.$refs.sliderDiv.hidden=false
         //构建一组离散化的点
        var Coordinates = new Array();
        for (var i = 0; i < 600000; i += 5000) {
            Coordinates.push([(13047453.0) + i, 3737873.0 - i]);
        }
        // for (var j = 0; j < 600000; j += 5000) {
        //     Coordinates.push([(96888538.4642) + 600000 + j, 4657209.1502 - 600000]);
        // }
        // for (var k = 0; k < 600000; k += 5000) {
        //     Coordinates.push([(96888538.4642) + 1200000 + k, 4657209.1502 - 600000 - k]);
        // }
        // for (var h = 0; h < 600000; h += 5000) {
        //     Coordinates.push([(96888538.4642) + 1800000 + h, 4657209.1502 - 1200000]);

        // }
        debugger
        // Coordinates.push([13047453.0, 3737873.0])
        // Coordinates.push([12606072.0, 2650934.0])
        this.moveLine=new ol.Feature({
            type:'route',
            geometry:new ol.geom.LineString(Coordinates)
        })
        this.vectorLayer=new ol.layer.Vector({
            source:new ol.source.Vector({
                features:[this.moveLine]
            })
        })
        this.map.addLayer(this.vectorLayer)
    },
    airplineShp(){

    },
    startMove(){
         this.vectorLayer.on('postrender',(evt)=>{
             
            let vectorContext=ol.render.getVectorContext(evt)
            let frameState=evt.frameState
            let startTime = new Date().getTime();
            let elapsedTime=startTime-frameState.time
            var index = Math.round(this.sliValue * elapsedTime / 1000);
            // let distance=(this.sliValue*elapsedTime)/1000
            // if (distance>=1) {
            //     this.stopMove()
            //     return
            // }
            let c=this.moveLine.getGeometry().getCoordinateAt(index)
            let currentPoint=new ol.geom.Point(this.moveLine.getGeometry().getCoordinateAt(index))
            let feature=new ol.Feature(currentPoint)
            let style= new ol.style.Style({
                    image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({color: 'black'}),
                    stroke: new ol.style.Stroke({
                        color: 'white',
                        width: 2,
                    }),
                })
            })
             vectorContext.drawFeature(feature,style)
             this.map.render()
        })
        
    },
    stopMove(){
        this.$refs.sliderDiv.hidden=true
        // vectorLayer.un('postrender',)
    },
    hotshp(){
        
    }
}
}
</script>
<style lang="less" scoped>
.mapDiv{
    width: 100%;
    height: 100%;
}
.anima-div{
    position: absolute;
    top:5px;
    left: 40%;
}
.sliderDiv{
    position: absolute;
    bottom:5px;
    width: 200px;
    left: 40%;
    // display: none;
}
</style>