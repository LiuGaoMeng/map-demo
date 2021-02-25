import View from 'ol/View'
import Map from 'ol/Map'
import Feature from 'ol/Feature'
import Overlay from 'ol/Overlay'
import {Tile,Image,Vector} from 'ol/layer'
import {Cluster,XYZ,WMTS,Vector as VectorSource,TileWms} from 'ol/source'
import {WFS,GeoJSON,} from 'ol/format'
import {OSM,TileWMS,ImageWMS} from 'ol/source'
import {Point,LineString,Circle as CirCle} from 'ol/geom'
import {transform, fromLonLat, toLonLat} from 'ol/proj'
import {Select,Draw, Modify, Snap,Interaction,defaults as defaultInteractions} from 'ol/interaction'
import {unByKey} from 'ol/Observable'
import {Style,Fill,Stroke,Text,Circle,Icon,Image as ImageStyle,RegularShape} from 'ol/style'
import {defaults,ZoomToExtent,MousePosition,OverviewMap,ScaleLine} from 'ol/control'
import { buffer } from 'ol/extent'

const ol = {
  View: View,
  Map: Map,
  Feature: Feature,
  Overlay: Overlay,
  geom: {
    Point: Point,
    LineString:LineString,
    Circle:CirCle
  },
  layer: {
    Tile: Tile,
    Image: Image,
    Vector: Vector,
  },
  control: {
    defaults:defaults,
    ZoomToExtent: ZoomToExtent,
    MousePosition:MousePosition,
    OverviewMap:OverviewMap,
    ScaleLine:ScaleLine
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
  interaction:{
    Select:Select,
    Draw:Draw,
    Modify:Modify,
    Snap:Snap,
    Interaction:Interaction,
    defaults:defaultInteractions
  },
  format: {
    WFS: WFS,
    GeoJSON: GeoJSON,
  },
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
  proj: {
    transform: transform,
    fromLonLat: fromLonLat,
    toLonLat: toLonLat,
  },
  extent: {
    buffer: buffer
  },
  Observable:{
    unByKey:unByKey  //移除绑定三维on或者once事件
  }
}

export default ol

