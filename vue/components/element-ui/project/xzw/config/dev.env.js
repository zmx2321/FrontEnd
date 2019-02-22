'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"http://10.10.10.202:8083"'  //开发环境接口
  // API_ROOT: '"http://10.10.10.238:8084"'  //开发环境接口 
  API_ROOT: '"https://xzwapi.ximuok.com"'  //生产环境接口
})
