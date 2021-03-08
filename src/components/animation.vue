<template>
    <div class="mapDiv">
        <div ref="mapDiv" id="mapDiv" class="mapDiv"></div>
        <div class="anima-div">
            <Button @click="animaShp">要素动画</Button>
            <Button @click="moveShp">要素移动</Button>
            <Button @click="airplineShp">航线动画</Button>
            <Button @click="hotShp">热力图</Button>
        </div>
        <div class="sliderDiv" ref="sliderDiv" hidden>
                <label>运动速度：</label>
                <Slider v-model="sliValue" :max=999></Slider>
                <Button @click="stopMove">关闭运动</Button>
        </div>
        <div class="sliderDiv" ref="heatDiv" hidden>
                <label>‎半径大小‎:</label>
                <Slider v-model="radiusValue" :step=1 :max=50 @on-input="changeRadius"></Slider>
                <label>‎模糊大小‎:</label>
                <Slider v-model="blurValue" :step=1 :max=50 @on-input="changeBlur"></Slider>
                <Button @click="stopHeat">关闭</Button>
        </div>
        <div class="sliderDiv" ref="closeDiv" hidden>
                <Button @click="stopClo">关闭</Button>
        </div>
    </div>
</template>
<script>
import"ol/ol.css"
import ol from "@/utils/ol"
import arc from "@/utils/arc"
export default {
    name:'animation',
    data(){
        return{
            tdtMap_vec:null,
            sliValue:999,
            vectorLayer:null,
            heatLayer:null,
            map:null,
            animaVec:null,
            flightsSource:null,
            tdtMap_cva:null,
            radiusValue:5,
            blurValue:15
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
            let scaleLineControl= new ol.control.ScaleLine({
                // className: 'my-scale-line',
                bar: true,
                // text: true,
                minWidth:70,
                units: "metric"
            })
            /**
             * 鼠标移动获取位置信息
             */
            let mousePositionControl = new ol.control.MousePosition({
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
                layerId:'tdtVec',
                name:'天地图矢量图层',
                source: new ol.source.XYZ({
                    url:"http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=42dca576db031641be0524ee977ddd04",
                    crossOrigin: 'anonymous',
                    wrapX:false
                })
            })
            this.tdtMap_cva=new ol.layer.Tile({
                layerId:'tdtCva',
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
                layers:[this.tdtMap_vec,this.tdtMap_cva],
                view:new ol.View({
                    //地图中心点
                    center:[12606072.0, 2650934.0],
                    zoom:6
                })
            })
    },
    animaShp(){
        this.$refs.closeDiv.hidden=false
        let animaShp = new ol.source.Vector({
            wrapX: false
        });
        this.animaVec = new ol.layer.Vector({
            source: animaShp
        });
        this.map.addLayer(this.animaVec);
        animaShp.on('addfeature',  (e)=> {
            this.flash(e.feature);
        });
        for (let i = 0; i<500; i++) {
                let x = Math.random() * 360 - 180;
                let y = Math.random() * 180 - 90;
                let geom = new ol.geom.Point(ol.proj.transform([x, y], 'EPSG:4326', 'EPSG:3857'));
                //let predrawtime = new Date();//当前毫秒数;
                let feature = new ol.Feature(geom);
                animaShp.addFeature(feature);
                this.flash(feature);
                //drawtime += new Date() - predrawtime;
            }
    
    },
    flash(feature){
        debugger
         let start = new Date().getTime();
            let listenerKey;
        listenerKey = this.animaVec.on('postrender', (event)=>{
            // let vectorContext = event.vectorContext;
            debugger
            let vectorContext = ol.render.getVectorContext(event)
            let frameState = event.frameState;
            let flashGeom = feature.getGeometry().clone();
            let elapsed = frameState.time - start;
            let elapsedRatio = elapsed / 50000;
            //指定半径从5开始，到30结束
            let radius = ol.easing.easeOut(elapsedRatio) * 25 + 5;
            let opacity = ol.easing.easeOut(1 - elapsedRatio);

            let style = new ol.style.Style({
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
        let Coordinates = new Array();
        for (let i = 0; i < 600000; i += 5000) {
            Coordinates.push([(13047453.0) + i, 3737873 - i]);
        }
        for (let j = 0; j < 600000; j += 5000) {
            Coordinates.push([(13047453.0) + 600000 + j, 3737873 - 600000]);
        }
        for (let k = 0; k < 600000; k += 5000) {
            Coordinates.push([(13047453.0) + 1200000 + k, 3737873 - 600000 - k]);
        }
        for (let h = 0; h < 600000; h += 5000) {
            Coordinates.push([(13047453.0) + 1800000 + h, 3737873 - 1200000]);
        }
        //将离散点构建成一条折线
        let route = new ol.geom.LineString(Coordinates)
        //获取直线的坐标
        let routeCoords = route.getCoordinates()
        let routeLength = routeCoords.length
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
            let vectorContext = ol.render.getVectorContext(event)
            let frameState = event.frameState;
            let elapsedTime = frameState.time - now;
            //通过增加速度，来获得lineString坐标
            let index = Math.round(this.sliValue * elapsedTime / 1e5);
            if (index >= routeLength) {
            let feature = new ol.Feature(new ol.geom.Point(routeCoords[0]));
            vectorContext.drawFeature(feature, markStyle);
                return;
            }
            let currentPoint = new ol.geom.Point(routeCoords[index]);
            let feature = new ol.Feature(currentPoint);
            vectorContext.drawFeature(feature, markStyle);
            //继续动画效果
            this.map.render();
        });
        this.map.render();
        
    },
    airplineShp(){
        this.$refs.closeDiv.hidden=false
        let pointsPerMs=0.1
        this.flightsSource = new ol.source.Vector({
            wrapX: false,
            attributions: 'Flight data by ' +
                  '<a href="http://openflights.org/data.html">OpenFlights</a>,',
            loader:  ()=> {
                let url = 'data/flights.json';
                fetch(url).then( (response)=> {
                    return response.json();
                }).then((json)=> {
                    let flightsData = json.flights;
                    for (let i = 0; i < flightsData.length; i++) {
                        let flight = flightsData[i];
                        let from = flight[0];
                        let to = flight[1];
                        //创建一个两个地点之间的弧段
                        let arcGenerator = new arc.GreatCircle(
                            { x: from[1], y: from[0] },
                            { x: to[1], y: to[0] })

                        let arcLine = arcGenerator.Arc(100, { offset: 10 });
                        if (arcLine.geometries.length === 1) {
                            let line = new ol.geom.LineString(arcLine.geometries[0].coords);
                            line.transform('EPSG:4326', 'EPSG:3857');
                            let feature = new ol.Feature({
                                geometry: line,
                                finished: false
                            });
                            //添加动画的特性与延迟所有功能并不在同一时间开始
                            this.addLater(feature, i * 50);
                        }
                    }
                    this.map.on('postrender', animateFlights);
                })
            }
        })
        let flightsLayer = new ol.layer.Vector({
                source: this.flightsSource,
                style: new ol.style.Style({
                stroke:new ol.style.Stroke({
                    color:'#EAE911',
                    width: 2
                })
            })
        })
        // flightsLayer.on('postrender', animateFlights);
        function animateFlights(event) {
            // var vectorContext = getVectorContext(event);
            let vectorContext = ol.render.getVectorContext(event);
            let frameState = event.frameState;
            vectorContext.setStyle(new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: '#EAE911',
                    width: 2,
                }),
            }))
            let features = this.flightsSource.getFeatures();
            for (let i = 0; i < features.length; i++) {
                let feature = features[i];
                if (!feature.get('finished')) {
                let coords = feature.getGeometry().getCoordinates();
                let elapsedTime = frameState.time - feature.get('start');
                let elapsedPoints = elapsedTime * pointsPerMs;
                if (elapsedPoints >= coords.length) {
                    feature.set('finished', true);
                }
                let maxIndex = Math.min(elapsedPoints, coords.length);
                let currentLine = new ol.geom.LineString(coords.slice(0, maxIndex));
                vectorContext.drawGeometry(currentLine);
              }
            }
            this.map.render();
        }
        this.map.addLayer(flightsLayer);
    },
    stopMove(){
        this.$refs.sliderDiv.hidden=true
        this.vectorLayer.getSource().clear()
    },
    addLater(feature, timeout){
        let c=this.flightsSource
        let vm=this
        window.setTimeout(function () {
            feature.set('start', new Date().getTime());
            vm.flightsSource.addFeatures([feature]);
        }, timeout)
    },
    hotShp(){
        this.$refs.heatDiv.hidden=false
        this.heatLayer=new ol.layer.Heatmap({
            source:new ol.source.Vector({
                url:'data/hot.kml',
                format:new ol.format.KML({
                    extractStyles:false
                })
            }),
            blur:this.blur,
            radius:this.radius,
            weight:function (feature) {
                let name=feature.get('name')
                let magnitude=parseFloat(name.substr(2))
                return magnitude-5
            }
        })
        this.map.addLayer(this.heatLayer)
    },
    stopHeat(){
        this.$refs.heatDiv.hidden=true
        this.heatLayer.getSource().clear()
    },
    changeRadius(value){
        this.heatLayer.setRadius(value)
        this.map.render()
    },
    changeBlur(value){
        this.heatLayer.setBlur(value)
        this.map.render()
    },
    stopClo(){
        if (this.animaVec!=null) {
            this.animaVec.getSource().clear()
        }
        if (this.vectorLayer!=null) {
            this.vectorLayer.getSource().clear()
        }

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
