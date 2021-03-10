import View from 'ol/View'
import Map from 'ol/Map'
import Feature from 'ol/Feature'
import Overlay from 'ol/Overlay'
import {createStringXY} from "ol/coordinate"
import {Tile,Image,Vector,Heatmap } from 'ol/layer'
import {Cluster,XYZ,WMTS,Vector as VectorSource,TileWms} from 'ol/source'
import {WFS,GeoJSON,Polyline,KML} from 'ol/format'
import {OSM,TileWMS,ImageWMS} from 'ol/source'
import {Point,LineString,Circle as CirCle} from 'ol/geom'
import {transform, fromLonLat, toLonLat} from 'ol/proj'
import {Select,Draw, Modify, Snap,Interaction,defaults as defaultInteractions} from 'ol/interaction'
import {unByKey} from 'ol/Observable'
import {Style,Fill,Stroke,Text,Circle,Icon,Image as ImageStyle,RegularShape} from 'ol/style'
import {defaults,ZoomToExtent,MousePosition,OverviewMap,ScaleLine} from 'ol/control'
import { buffer } from 'ol/extent'
import {getArea, getLength} from 'ol/sphere'
import  * as renderJs from 'ol/render'
import * as olEasing from 'ol/easing'
import * as olfilter from 'ol/format/filter'
const ol = {
  View: View,
  Map: Map,
  Feature: Feature,
  Overlay: Overlay,
  control: {
    defaults:defaults,
    ZoomToExtent: ZoomToExtent,
    MousePosition:MousePosition,
    OverviewMap:OverviewMap,
    ScaleLine:ScaleLine
  },
  coordinate:{
    createStringXY:createStringXY
  },
  easing:olEasing,
  extent: {
    buffer: buffer
  },
  format: {
    WFS: WFS,
    GeoJSON: GeoJSON,
    Polyline:Polyline,
    filter:olfilter,
    KML:KML
  },
  geom: {
    Point: Point,
    LineString:LineString,
    Circle:CirCle
  },
  interaction:{
    Select:Select,
    Draw:Draw,
    Modify:Modify,
    Snap:Snap,
    Interaction:Interaction,
    defaults:defaultInteractions
  },
  layer: {
    Tile: Tile,
    Image: Image,
    Vector: Vector,
    Heatmap :Heatmap 
  },
  Observable:{
    unByKey:unByKey  //移除绑定三维on或者once事件
  },
  proj: {
    transform: transform,
    fromLonLat: fromLonLat,
    toLonLat: toLonLat,
  },
  render:renderJs,
  style: {
    Style: Style,
    Stroke: Stroke,
    Fill: Fill,
    Image: ImageStyle,
    Icon: Icon,
    Circle: Circle,
    Text:Text,
    RegularShape:RegularShape
  },
  source: {
    Vector: VectorSource,
    WMTS: WMTS,
    OSM: OSM,
    TileWMS: TileWMS,
    ImageWMS: ImageWMS,
    XYZ: XYZ,
    Cluster:Cluster
  },
  sphere:{
    getArea:getArea,
    getLength:getLength
  }
}

export default ol

