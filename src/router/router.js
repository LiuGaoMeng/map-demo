import Login from '@/views/Login.vue'
import Layout from '@/views/Layout.vue'

export const routerMap =[
 
  {
    path: '/map',
    name: '地图实列',
    component: Layout,
    meta: {
      title: '地图'
    },
    children:[
      // {
      //   path: 'table',
      //   name: 'table',
      //   component: () =>import('@/views/IndexTable.vue')
      // },
      // {
      //   path: 'table2',
      //   name: 'table2',
      //   component: () =>import('@/views/IndexTable.vue')
      // },
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
      },{
        path: 'selectMap',
        name: 'Tool工具',
        component: () => import(/* webpackChunkName: "about" */ '@/components/selectMap.vue'),
        meta:{
          title:'Tool工具'
        }
      }
    ]
  }
  // ,
  // {
  //   path: 'geomap',
  //   name: 'GeoMap',
  //   component: () => import(/* webpackChunkName: "about" */ '@/components/GeoMap.vue'),
  //   meta:{
  //     title:'Geoserver案例'
  //   }
  // },
  // {
  //   path: '/page1',
  //   name: 'page1',
  //   component: Layout,
  //   meta: {
  //     title: '测试'
  //   },
  //   children:[
  //     {
  //       path: 'page2',
  //       name: 'page2',
  //       component: () =>import('@/views/IndexTable.vue')
  //     }
  //   ]
  // },
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

