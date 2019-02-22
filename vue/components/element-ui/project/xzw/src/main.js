// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import 'reset-css'
import 'babel-polyfill'


// 全局引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import "./assets/iconfont/iconfont.css"


// 全局挂载公共函数类
import Utils from './utils/utils';
Vue.prototype.$utils = new Utils()


// 全局挂载eventBus
const Bus = new Vue()
Vue.prototype.Bus = Bus

// 图片上传服务器地址
Vue.prototype.$uploadImgServer = 'http://10.10.10.202:8083'

// loadsh
import _ from 'lodash'
Vue.prototype._lodsh = _

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
