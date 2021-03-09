import Login from '@/views/Login.vue'
import Layout from '@/views/Layout.vue'

export const routerMap =[
 
  {
    path: '/',
    name: 'OpenLayers实列',
    component: Layout,
    meta: {
      title: 'OpenLayers'
    },
    redirect: 'map',
    children:[
      {
        name: 'map',
        path: 'map',
        component: () => import(/* webpackChunkName: "about" */ '@/components/Map.vue'),
        meta:{
          title:'简单案例'
        }
      },
      {
        path: 'geomap',
        name: 'geoMap',
        component: () => import(/* webpackChunkName: "about" */ '@/components/GeoMap.vue'),
        meta:{
          title:'Geoserver案例'
        }
      },
      {
        path: 'arcmap',
        name: 'ArcMap', 
        component: () => import(/* webpackChunkName: "about" */ '@/components/ArcMap.vue'),
        meta:{
          title:'Arcgis案例'
        }
      },{
        path: 'tilewms',
        name: 'TileWms',
        component: () => import(/* webpackChunkName: "about" */ '@/components/TileWms.vue'),
        meta:{
          title:'TileWms'
        }
      },{
        path: 'imagewms',
        name: 'ImageWms',
       
        component: () => import(/* webpackChunkName: "about" */ '@/components/ImageWms.vue'),
        meta:{
          title:'ImageWms'
        }
      },{
        path: 'wmtsmap',
        name: 'WmtsMap',
        component: () => import(/* webpackChunkName: "about" */ '@/components/WmtsMap.vue'),
        meta:{
          title:'WmtsMap'
        }
      },{
        path: 'wfsmap',
        name: 'WfsMap',
        component: () => import(/* webpackChunkName: "about" */ '@/components/WfsMap.vue'),
        meta:{
          title:'WfsMap'
        }
      },{
        path: 'wmsshp',
        name: 'wmsshp',
        component: () => import(/* webpackChunkName: "about" */ '@/components/wmsshp.vue'),
        meta:{
          title:'WmsShp'
        }
      },{
        path: 'wmsAndWmts',
        name: 'wmsAndWmts',
        component: () => import(/* webpackChunkName: "about" */ '@/components/wmsAndWmts.vue'),
        meta:{
          title:'WmsAndWmts'
        }
      },
      {
        path: 'selectMap',
        name: '工具案例',
        component: () => import(/* webpackChunkName: "about" */ '@/components/selectMap.vue'),
        meta:{
          title:'工具案例'
        }
      },
      {
        path: 'animation',
        name: '动画',
        component: () => import(/* webpackChunkName: "about" */ '@/components/animation.vue'),
        meta:{
          title:'动画'
        }
      }
    ]
  }
  ,
  {
    path: '/',
    name: 'ArcGIS实列',
    component: Layout,
    meta: {
      title: 'ArcGIS'
    },
    children:[
      {
        name: 'esriMap',
        path: 'esriMap',
        component: () => import(/* webpackChunkName: "about" */ '@/components/Arcmap/map.vue'),
        meta:{
          title:'简单案例'
        }
      },
      {
        name: 'mapTool',
        path: 'mapTool',
        component: () => import(/* webpackChunkName: "about" */ '@/components/Arcmap/mapTool.vue'),
        meta:{
          title:'Arcgis图层'
        }
      },
    ]
  }
]

export const routes =[
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path:'*',
    component: () =>import('@/views/Error_404.vue')
  }
]

