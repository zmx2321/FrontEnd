import Vue from 'vue'
import App from './App.vue'

import md5 from 'js-md5';  // md5加密

import qs from 'qs';  // 序列化

import i18n from './assets/i18n/i18n';  // 引入国际化组件

import axios from 'axios';  //请求文件

import ElementUI from 'element-ui'  // 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'

import VueQuillEditor  from 'vue-quill-editor'  //富文本
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import echarts from 'echarts'  // 引入echarts

import router from './router'
import store from './store'

Vue.config.productionTip = false;

// 全局注册
Vue.use(ElementUI);
Vue.use(i18n);
Vue.use(VueQuillEditor);

//挂载（使其可以在各个组件使用）this.
Vue.prototype.axios = axios;
Vue.prototype.qs = qs;
Vue.prototype.md5 = md5;  //在main.js文件中将md5转换成vue原型
Vue.prototype.echarts = echarts;

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
