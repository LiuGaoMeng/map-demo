<template>
    <div class="mapDiv">
        <div ref="mapDiv" id="mapDiv" class="mapDiv"></div>
        <div class="anima-div">
            <Button @click="animaShp">要素动画</Button>
            <Button @click="moveShp">要素移动</Button>
            <Button @click="airplineShp">航线动画</Button>
        </div>
        <div class="sliderDiv" ref="sliderDiv" hidden>
                <label>运动速度：</label>
                <Slider v-model="sliValue" :max=5></Slider>
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
                }),
                
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
                })
            })
    },
    animaShp(){
    
    },
    moveShp(){
        debugger
        this.$refs.sliderDiv.hidden=false
        let line=new ol.Feature({
            type:'route',
            geometry:new ol.geom.LineString([[13047453.0, 3737873.0], [12606072.0, 2650934.0]])
        })

    },
    airplineShp(){

    },
    stopMove(){
        this.$refs.sliderDiv.hidden=true
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