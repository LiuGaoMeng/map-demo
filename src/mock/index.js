import Mock from 'mockjs'

import { getUserInfo, getPhoneCode, login, authorization } from './response/user'

Mock.mock(/\/getUserInfo/,'post',getUserInfo)
Mock.mock(/\/getPhoneCode/,'post',getPhoneCode)
Mock.mock(/\/login/,'post',login)
Mock.mock(/\/authorization/,'get',authorization)

export default Mock
