import Mock from 'mockjs'

const Random = Mock.Random

export const getUserInfo = (options) => {
  const template = {
      name: Random.cname(),
      img: Random.image('100x100','#0094ff','#fff','png','头像'),
      address: Random.province()+Random.city()+Random.county()+Random.zip(),
      phone:  /^1[345789]\d{9}$/
  }
  return Mock.mock(template)
}

export const getUserLists = () => {
  const template = {

    'lists|10': [
      {
        name: Random.cname(),
        img: Random.image('100x100','#0094ff','#fff','png','头像'),
        address: Random.province()+Random.city()+Random.county()+Random.zip(),
        phone:  /^1[345789]\d{9}$/
      }
    ],
  }
  return Mock.mock(template)
}

export const login = () => {
  return {
    code: 200,
    data: {
      token: 'xxx'
    },
    mes: ''
  }
}

export const getPhoneCode = () => {
  const template = {
    code: 200,
    data: {
      phoneCode: /\d{4}/
    },
    mes: '发送验证码成功'
  }
  return Mock.mock(template)
}

export const authorization = () => {
  return {
    code: 200,
    data: {
      token: 'xxx',
      rules: {
        page: {
          home: true,
          table: true,
          page1:true
        }
      }
    },
    mes: ''
  }
}
