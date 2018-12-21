import Vue from 'vue'
import App from './App.vue'

import axios from './http';  //请求文件

import ElementUI from 'element-ui'
import DGTable from 'dg-table'  //表格筛选
import 'element-ui/lib/theme-chalk/index.css'

import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(ElementUI);
// 全局注册 dg-table 这样我们就可以 在html中<dg-table></dg-table>使用组件了
Vue.use(DGTable);

//挂载（使其可以在各个组件使用）
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
