import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './router'
import store from '@/store'
import { setTitle, setToken, getToken } from '@/lib/util'
import clonedeep from 'clonedeep'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由全局守卫，用于权限验证，页面title设置
router.beforeEach( ( to, from, next ) => {
  to.meta && setTitle(to.meta.title)
  const token = getToken()
  if (token) {
    if (!store.state.router.hasGetRules) {
      store.dispatch('authorization').then(rules => {
        store.dispatch('concatRoutes', rules).then(routers => {
          router.addRoutes(clonedeep(routers))
          next({ ...to, replace: true })
        }).catch(() => {
          next({ name: 'login' })
        })
      }).catch(() => {
        setToken('')
        next({ name: 'login' })
      })
    } else {
      next()
    }
  } else {
    if (to.name === 'login') next()
    else next({ name: 'login' })
  }
} )

export default router
