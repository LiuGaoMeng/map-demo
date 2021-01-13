import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Map',
      component: () => import(/* webpackChunkName: "about" */ '@/components/Map.vue')
    },
    {
      path: '/geomap',
      name: 'GeoMap',
      component: () => import(/* webpackChunkName: "about" */ '@/components/GeoMap.vue')
    },{
      path: '/arcmap',
      name: 'ArcMap', 
      component: () => import(/* webpackChunkName: "about" */ '@/components/ArcMap.vue')
    },{
      path: '/tilewms',
      name: 'TileWms',
      component: () => import(/* webpackChunkName: "about" */ '@/components/TileWms.vue')
    },{
      path: '/imagewms',
      name: 'ImageWms',
     
      component: () => import(/* webpackChunkName: "about" */ '@/components/ImageWms.vue')
    },{
      path: '/wmtsmap',
      name: 'WmtsMap',
      component: () => import(/* webpackChunkName: "about" */ '@/components/WmtsMap.vue')
    },{
      path: '/wfsmap',
      name: 'WfsMap',
     
      component: () => import(/* webpackChunkName: "about" */ '@/components/WfsMap.vue')
    },{
      path: '/wmsshp',
      name: 'wmsshp',
      component: () => import(/* webpackChunkName: "about" */ '@/components/wmsshp.vue')
    },{
      path: '/wmsAndWmts',
      name: 'wmsAndWmts',
      component: () => import(/* webpackChunkName: "about" */ '@/components/wmsAndWmts.vue')
    },{
      path: '/selectMap',
      name: 'selectMap',
      component: () => import(/* webpackChunkName: "about" */ '@/components/selectMap.vue')
    }
   
  ]
})
