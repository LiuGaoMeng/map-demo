import { login, authorization, getPhoneCode } from '@/api/user'
import { setToken } from '@/lib/util'

const state = {
  userInfo: {}
}

const mutations = {
  SET_USER_INFO (state, params) {
    state.userInfo=params
  }
}

const actions = {
  login ({ commit }, { phone, phoneCode }) {
    return new Promise((resolve, reject) => {
      login({ phone, phoneCode }).then(res => {
        if (res.code === 200 && res.data.token) {
          setToken(res.data.token)
          resolve()
        } else {
          reject(new Error('错误'))
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  getPhoneCode ({ commit }, { phone }) {
    return new Promise((resolve, reject) => {
      getPhoneCode({ phone }).then(res => {
        if (res.code === 200) {
          resolve()
        } else {
          reject(new Error('错误'))
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  authorization ({ commit }, token) {
    return new Promise((resolve, reject) => {
      authorization().then(res => {
        if (parseInt(res.code) === 401) {
          reject(new Error('token error'))
        } else {
          // setToken(res.data.token)
          resolve(res.data.rules.page)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout () {
    setToken('')
  }
}

export default {
  state,
  mutations,
  actions
}
