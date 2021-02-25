import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import user from './module/user'
import router from './module/router'
// 数据持久化
// import saveInLocalS from './plugin/saveInLocalS'

Vue.use(Vuex)

export default new Vuex.Store({
  strict:process.env.NODE_ENV === 'development',
  state,
  mutations,
  actions,
  modules:{
    user,
    router
  },
  // plugins: [ saveInLocalS ]
})
