import Vue from 'vue'
import Router from 'vue-router'

// 一级
import Index from './views/Index.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import NotFound from './views/NotFound.vue'
import Home from './views/Home.vue'
import InfoShow from './views/InfoShow.vue'
import FoundList from './views/FoundList.vue'

import Test from './views/test/Test.vue'

// 二级
import DeviceManage from './views/manage/device_manage.vue'
import DataManage from './views/manage/data_manage.vue'
import OperateManage from './views/manage/operate_manage.vue'
import AccountManage from './views/manage/account_manage.vue'

//test
// import SX from './views/sx/HelloDGTable.vue'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    // 如果是根路径的话，重定向到index路径
    {
      path: '/',
      redirect: '/index'
    },
    // 如果访问index则跳转到index路径
    {
        path: '/index',
        name: '',
        component: Index,
        children: [
            { path: '', component: Home },
            { path: '/home', component: Home, name: 'home' },
            { path: '/infoshow', component: InfoShow, name: 'infoShow' },
            { path: '/foundlist', name: 'foundlist', component: FoundList },

            { path: '/test', name: 'test', component: Test },
            // { path: '/sx', name: 'sx', component: SX },

            //设备管理(device manage)
            { path: '/device_manage', name: 'device_manage', component: DeviceManage },
            //数据管理(data manage)
            { path: '/data_manage', name: 'data_manage', component: DataManage },
            //运营管理(operate manage)
            { path: '/operate_manage', name: 'operate_manage', component: OperateManage },
            //账号管理(account manage)
            { path: '/account_manage', name: 'account_manage', component: AccountManage },
        ]
    },
    // 注册页面
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    // 登陆页面
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // 404
    {
        path: '*',
        name: '404',
        component: NotFound
    }
  ]
});

// 添加路由守卫
// router.beforeEach((to, from, next) => {
//     const isLogin = localStorage.eleToken ? true : false;
//     if (to.path == "/login" || to.path == "/register") {
//         next();
//     } else {
//         isLogin ? next() : next("/login");
//     }
// })

export default router;
