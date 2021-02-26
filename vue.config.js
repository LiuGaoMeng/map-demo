const path = require('path')

const BASE_URL = process.env.NODE_ENV === 'production' ? '/my-project/' : '/'

const resolve = dir => path.join(__dirname,dir)

module.exports = {
  lintOnSave: false,
  baseUrl:BASE_URL,

  chainWebpack: config => {
    config.resolve.alias
      .set('@',resolve('src'))
      .set('_c',resolve('src/components'))
  },
  productionSourceMap:false,
  // devServer: {
  //   proxy: 'http://localhost:3000'
  // }
}
