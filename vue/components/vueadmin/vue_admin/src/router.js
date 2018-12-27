import Vue from 'vue'
import Router from 'vue-router'

// 一级
import Index from './views/Index'
import Register from './views/Register'
import Login from './views/Login'
import Home from './views/Home'
import InfoShow from './views/InfoShow.vue'
import NotFound from './views/NotFound'

// 二级
import DeviceManage from './views/manage/DeviceManage'
import CabinetManage from './views/manage/hide/CabinetManage'
import OperateManage from './views/manage/OperateManage'
import AccountManage from './views/manage/AccountManage'

//三级
import DataManage from './views/manage/data_manage/DataManage'
import UserManage from './views/manage/data_manage/UserManage'
import RiderManage from './views/manage/data_manage/RiderManage'
import RecordManage from './views/manage/data_manage/RecordManage'

//test
import Test from './views/test/Test'
import RichText from './views/test/RichText'
import HelloDGTable from './views/sx/HelloDGTable'


Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,

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

            //test
            { path: '/test', name: 'test', component: Test },
            // 富文本
            { path: '/rich_text', name: 'rich_text', component: RichText },
            //DGTable
            { path: '/helloDGTable', name: 'helloDGTable', component: HelloDGTable },


            //设备管理(device manage)
            { path: '/device_manage', name: 'device_manage', component: DeviceManage },
            //柜口管理
            { path: '/cabinet_manage', name: 'cabinet_manage', component: CabinetManage },
            //运营管理(operate manage)
            { path: '/operate_manage', name: 'operate_manage', component: OperateManage },
            //账号管理(account manage)
            { path: '/account_manage', name: 'account_manage', component: AccountManage },

            //数据管理(data manage)
            { path: '/data_manage', name: 'data_manage', component: DataManage },
            //记录管理
            { path: '/record_manage', name: 'record_manage', component: RecordManage },
            //用户管理
            { path: '/user_manage', name: 'user_manage', component: UserManage },
            //骑手管理
            { path: '/rider_manage', name: 'rider_manage', component: RiderManage },
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
    },
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
