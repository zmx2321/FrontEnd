import Vue from 'vue'
import App from './App.vue'

import md5 from 'js-md5';  //md5加密

import axios from 'axios';  //请求文件

import ElementUI from 'element-ui'  // 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'

import echarts from 'echarts'  // 引入echarts

import router from './router'
import store from './store'

Vue.config.productionTip = false;

// 全局注册
Vue.use(ElementUI);

//挂载（使其可以在各个组件使用）
Vue.prototype.axios = axios;
Vue.prototype.md5 = md5;  //在main.js文件中将md5转换成vue原型
Vue.prototype.echarts = echarts

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
