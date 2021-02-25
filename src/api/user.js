import axios from './index'

export const getUserInfo = ({userId}) => {
  return axios.request({
    url:  'getUserInfo',
    method:'post',
    data: {
      userId
    }
  })
}

export const login = ({ phone, phoneCode }) => {
  return axios.request({
    url: 'login',
    method: 'post',
    data:{
      phone,
      phoneCode
    }
  })
}

export const getPhoneCode = ({ phone }) => {
  return axios.request({
    url: 'getPhoneCode',
    method: 'post',
    data:{
      phone
    }
  })
}

export const authorization = () => {
  return axios.request({
    url: 'authorization',
    method: 'get'
  })
}
