import Vue from 'vue'
import App from './App.vue'

import md5 from 'js-md5';  //md5加密

import axios from 'axios';  //请求文件

import ElementUI from 'element-ui'  // 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'

import './assets/icon/iconfont.css'  // icon

import VueQuillEditor  from 'vue-quill-editor'  //富文本
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import router from './router'
import store from './store'

Vue.config.productionTip = false;

// 全局注册
Vue.use(ElementUI);
Vue.use(VueQuillEditor);

//挂载（使其可以在各个组件使用）
Vue.prototype.axios = axios;
Vue.prototype.md5 = md5;  //在main.js文件中将md5转换成vue原型

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
