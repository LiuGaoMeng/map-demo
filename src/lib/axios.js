import axios from 'axios'
import { baseURL } from '@/config'
import { getToken } from '@/lib/util'
import iView from 'iview'

class HttpRequest {
  constructor(baseUrl=baseURL){
    this.baseUrl=baseUrl,
    this.queue = {} //请求队列
  }
  // 基础配置
  getInsideConfig() {
    const config = {
      baseURL:this.baseUrl,
      headers: {}
    }
    return config
  }
  distroyQueue(url) {
    delete this.queue[url]
    if(!Object.keys(this.queue).length){
      iView.Spin.hide()
    }
  }
  interceptors(axiosRequest, url) {
    axiosRequest.interceptors.request.use(config =>{
      // 添加全局的loading
      if(Object.keys(this.queue).length) {
        iView.Spin.show()
      }
      this.queue[url]=true
      // 获取权限token
      config.headers['Authorization'] = getToken()
      return config
    },error => {
      return Promise.reject(error)
    })
    axiosRequest.interceptors.response.use(res =>{
      this.distroyQueue(url)
      const { data } = res
      return data
    },error =>{
      this.distroyQueue(url)
      return Promise.reject(error)
    })
  }
  request(options) {
    const axiosRequest = axios.create()
    options = Object.assign(this.getInsideConfig(),options)
    this.interceptors(axiosRequest, options.url)
    return axiosRequest(options)
  }
}

export default HttpRequest
