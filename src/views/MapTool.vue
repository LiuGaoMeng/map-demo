<template>
    <div class="app-center-top">
        <div class="tool-container">
            <Dropdown trigger="click" @on-click="mapHander">
                <a href="javascript:void(0)">地图操作
                    <Icon type='ios-arrow-down'></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem name='fangda'>放大</DropdownItem>
                    <DropdownItem name='suoxiao'>缩小</DropdownItem>
                    <DropdownItem name='extent'>当前范围</DropdownItem>
                    <DropdownItem name='png'>导出成图片</DropdownItem>
                    <DropdownItem name='pdf'>导出成PDF</DropdownItem>
                    <DropdownItem name='watch'>地图探查</DropdownItem>
                    <DropdownItem name='unwatch'>关闭探查</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown trigger="click" @on-click="mapPicHander">
                <a href="javascript:void(0)">图形操作
                    <Icon type='ios-arrow-down'></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem name='pointDraw'>坐标图形</DropdownItem>
                    <DropdownItem name='clearXY'>清除坐标图形</DropdownItem>
                    <DropdownItem name='drawPoint'>绘制点</DropdownItem>
                    <DropdownItem name='drawLine'>绘制线</DropdownItem>
                    <DropdownItem name='drawPolygon'>绘制面</DropdownItem>
                    <DropdownItem name='drawSquare'>绘制正方形</DropdownItem>
                    <DropdownItem name='drawBox'>绘制矩形</DropdownItem>
                    <DropdownItem name='drawCircle'>绘制圆</DropdownItem>
                    <DropdownItem name='handLine'>画线</DropdownItem>
                    <DropdownItem name='handPolygon'>画面</DropdownItem>
                    <DropdownItem name='closeDraw'>关闭绘制</DropdownItem>
                    <DropdownItem name='stopDraw'>取消绘制</DropdownItem>
                    <DropdownItem name='cleardraw'>清除绘画图形</DropdownItem>
                    <DropdownItem name='openUpdate'>启动修改</DropdownItem>
                    <DropdownItem name='closeUpdate'>关闭修改</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown trigger="click" @on-click="mapInfo">
                <a href="javascript:void(0)">地图标注
                    <Icon type='ios-arrow-down'></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem name='image'>图片标注</DropdownItem>
                    <DropdownItem name='text'>文本标注</DropdownItem>
                    <DropdownItem name='union'>图文标注</DropdownItem>
                    <DropdownItem name='popup'>popup弹出</DropdownItem>
                    <DropdownItem name='merrage'>聚合标注</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown trigger="click" @on-click="shpCartoon">
                <a href="javascript:void(0)">要素动画
                    <Icon type='ios-arrow-down'></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem name='shpCar'>要素动画</DropdownItem>
                    <DropdownItem name='shpMove'>要素移动</DropdownItem>
                </DropdownMenu>
            </Dropdown>
             <Dropdown trigger="click" @on-click="mapTool">
                <a href="javascript:void(0)">工具箱
                    <Icon type='ios-arrow-down'></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem name='mesureLine'>测距</DropdownItem>
                    <DropdownItem name='measureArea'>测面</DropdownItem>
                     <DropdownItem name='selectShp'>选择要素</DropdownItem>
                    <!--<DropdownItem name='popup'>popup弹出</DropdownItem>
                    <DropdownItem name='merrage'>聚合标注</DropdownItem> -->
                </DropdownMenu>
            </Dropdown>
        </div>

    </div>
</template>
<script>
import bus from "@/utils/bus";
export default {
    data(){
        return{

        }
    },
    methods:{
        mapHander(type){
            bus.$emit("mapHander",type)

        },
        mapPicHander(type){
            bus.$emit("removeInteraction",type)
            bus.$emit("mapPicHander",type)
        },
        mapInfo(type){

            bus.$emit("mapInfo",type)
        },
        mapTool(type){
            bus.$emit("mapTool",type)
        },
        shpCartoon(type){

        }

    }
}
</script>
<style lang="less" scoped>
.app-center-top{
    position: absolute;
    top:5px;
    left: 36%;
    // width: 520px;
    height: 34px;
    line-height: 34px;
    background: #fff;
    box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.15);
    .tool-container{
        text-align: center;
        .ivu-dropdown{
            width: 130px;
        }
        b {
        height: 20px;
        display: inline-block;
        border-right: 1px solid #eee;
        top: 5px;
        position: relative;
        }
    }
}
</style>