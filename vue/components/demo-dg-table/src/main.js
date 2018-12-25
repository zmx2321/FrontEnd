import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import DGTable from 'dg-table'
import 'element-ui/lib/theme-chalk/index.css' // elementui 的主题css 可以自定义主题

import router from './router'


Vue.config.productionTip = false

Vue.use(ElementUI) // 全局注册elementui
Vue.use(DGTable) // 全局注册 dg-table 这样我们就可以 在html中<dg-table></dg-table>使用组件了

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
