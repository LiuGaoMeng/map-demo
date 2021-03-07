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
                <Slider v-model="sliValue" :max=999></Slider>
                <Button @click="stopMove">关闭运动</Button>
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
            tdtMap_vec:null,
            sliValue:999,
            vectorLayer:null,
            map:null,
            animaVec:null
        }
    },
    created(){

    },
    mounted(){
        this.initMap()
    },
    methods:{
         initMap(){
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
            //实例化Map对象
            this.map= new ol.Map({
                target:'mapDiv',
                layers:[this.tdtMap_vec,tdtMap_cva],
                view:new ol.View({
                    //地图中心点
                    center:[12606072.0, 2650934.0],
                    zoom:6
                })
            })
    },
    animaShp(){
        var animaShp = new ol.source.Vector({
            wrapX: false
        });
        this.animaVec = new ol.layer.Vector({
            source: animaShp
        });
        this.map.addLayer(this.animaVec);
        animaShp.on('addfeature',  (e)=> {
            this.flash(e.feature);
        });
        for (var i = 0; i<500; i++) {
                var x = Math.random() * 360 - 180;
                var y = Math.random() * 180 - 90;
                var geom = new ol.geom.Point(ol.proj.transform([x, y], 'EPSG:4326', 'EPSG:3857'));
                //var predrawtime = new Date();//当前毫秒数;
                var feature = new ol.Feature(geom);
                animaShp.addFeature(feature);
                this.flash(feature);
                //drawtime += new Date() - predrawtime;
            }
    
    },
    flash(feature){
        debugger
         var start = new Date().getTime();
            var listenerKey;
        listenerKey = this.animaVec.on('postrender', (event)=>{
            // var vectorContext = event.vectorContext;
            debugger
                    var vectorContext = ol.render.getVectorContext(event)
                    var frameState = event.frameState;
                    var flashGeom = feature.getGeometry().clone();
                    var elapsed = frameState.time - start;
                    var elapsedRatio = elapsed / 50000;
                    //指定半径从5开始，到30结束
                    var radius = ol.easing.easeOut(elapsedRatio) * 25 + 5;
                    var opacity = ol.easing.easeOut(1 - elapsedRatio);

                    var style = new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: radius,
                            snapToPixel: false,
                            stroke: new ol.style.Stroke({
                                color: 'rgba(255, 0, 0, ' + opacity + ')',
                                width: 0.25 + opacity
                            })
                        })
                    });

                    vectorContext.setStyle(style);
                    vectorContext.drawGeometry(flashGeom);
                    if (elapsed > 50000) {
                        ol.Observable.unByKey(listenerKey);
                        return;
                    }
                    //继续postcompose动画
                    this.map.render();
        });
    },
    moveShp(){
        this.$refs.sliderDiv.hidden=false
             //构建一组离散化的点
        var Coordinates = new Array();
        for (var i = 0; i < 600000; i += 5000) {
            Coordinates.push([(13047453.0) + i, 3737873 - i]);
        }
        for (var j = 0; j < 600000; j += 5000) {
            Coordinates.push([(13047453.0) + 600000 + j, 3737873 - 600000]);
        }
        for (var k = 0; k < 600000; k += 5000) {
            Coordinates.push([(13047453.0) + 1200000 + k, 3737873 - 600000 - k]);
        }
        for (var h = 0; h < 600000; h += 5000) {
            Coordinates.push([(13047453.0) + 1800000 + h, 3737873 - 1200000]);
        }
        //将离散点构建成一条折线
        var route = new ol.geom.LineString(Coordinates)
        //获取直线的坐标
        var routeCoords = route.getCoordinates()
        var routeLength = routeCoords.length
        let markStyle= new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 7,
                    snapToPixel: false,
                    fill: new ol.style.Fill({ color: 'black' }),
                    stroke: new ol.style.Stroke({
                        color: 'black',
                        width: 2
                    })
                })
        })
        let moveline=new ol.Feature({
            type:'route',
            geometry:route
        })
        this.vectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [moveline],
                wrapX:false
            }),
            style:new ol.style.Style({
                stroke: new ol.style.Stroke({
                    width: 6,
                    color: [237, 212, 0, 0.8]
                })
            })
        })
        
        this.map.addLayer(this.vectorLayer)
        let now = new Date().getTime();
        this.vectorLayer.on('postrender', (event)=>{
            debugger
            var vectorContext = ol.render.getVectorContext(event)
            var frameState = event.frameState;
            var elapsedTime = frameState.time - now;
            //通过增加速度，来获得lineString坐标
            var index = Math.round(this.sliValue * elapsedTime / 1e5);
            if (index >= routeLength) {
            var feature = new ol.Feature(new ol.geom.Point(routeCoords[0]));
            vectorContext.drawFeature(feature, markStyle);
                return;
            }
            var currentPoint = new ol.geom.Point(routeCoords[index]);
            var feature = new ol.Feature(currentPoint);
            vectorContext.drawFeature(feature, markStyle);
            //继续动画效果
            this.map.render();
        });
        this.map.render();
        
    },
    airplineShp(){

    },
    stopMove(){
        this.$refs.sliderDiv.hidden=true
        this.vectorLayer.getSource().clear()
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