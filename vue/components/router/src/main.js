import Vue from 'vue'
import App from './App'
import Router from 'vue-router';  //这个要记住

//导入组件
import t1 from './components/title1';
import t2 from './components/title2';
import t3 from './components/title3';

Vue.use(Router);

//配置路由
const routes = [
  { path: '/title1', component: t1 },
  { path: '/title2', component: t2 },
  { path: '/title3', component: t3 }
];

let router = new Router({
  routes
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
