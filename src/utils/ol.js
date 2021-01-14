import View from 'ol/View'
import Map from 'ol/Map'
import Feature from 'ol/Feature'
import Overlay from 'ol/Overlay'
import {Tile,Image,Vector} from 'ol/layer'
import {XYZ,WMTS,VectorSource,TileWms} from 'ol/source/XYZ'
import {WFS,GeoJSON,} from 'ol/format'
import {OSM,TileWMS,ImageWMS} from 'ol/sources'
import {Point,LineString,CirCle} from 'ol/geom'
import {transform, fromLonLat, toLonLat} from 'ol/proj'
import {Style,Fill,Stroke,Circle,Icon,ImageStyle} from 'ol/style'
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
  },
  proj: {
    transform: transform,
    fromLonLat: fromLonLat,
    toLonLat: toLonLat,
  },
  extent: {
    buffer: buffer
  }
}

export default ol

