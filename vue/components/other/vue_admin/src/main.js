import Vue from 'vue'
import App from './App.vue'

import axios from './http';  //请求文件

import ElementUI from 'element-ui'
import DGTable from 'dg-table'  //表格筛选
import 'element-ui/lib/theme-chalk/index.css'

import VueQuillEditor  from 'vue-quill-editor'  //富文本
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import router from './router'
import store from './store'

Vue.config.productionTip = false;

// 全局注册
Vue.use(ElementUI);
Vue.use(DGTable);
Vue.use(VueQuillEditor);

//挂载（使其可以在各个组件使用）
Vue.prototype.axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
