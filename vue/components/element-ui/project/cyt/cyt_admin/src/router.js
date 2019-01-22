import Vue from 'vue'
import Router from 'vue-router'

import md5 from 'js-md5';  //md5加密

// index
import Index from './views/Index'

// main
import Home from './views/main/Home'
import NotFound from './views/main/NotFound'

// admin
import Login from './views/admin/Login'
import ModifyPassword from './views/admin/ModifyPassword'

// manager
import DeviceManage from './views/manager/DeviceManage'
import CabinetManage from './views/manager/hide/CabinetManage'
import OperateManage from './views/manager/OperateManage'
// import AccountManage from './views/manager/AccountManage'

// 数据管理
import UserManage from './views/manager/data_manage/UserManage'
import RiderManage from './views/manager/data_manage/RiderManage'
import RecordManage from './views/manager/data_manage/RecordManage'

// 账号管理

// test
import Test from './views/test/Test'
import RichText from './views/test/RichText'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    // mode: 'hash',
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

                // 设备管理(device manage)
                { path: '/device_manage', name: 'device_manage', component: DeviceManage },
                // 柜口管理
                { path: '/cabinet_manage', name: 'cabinet_manage', component: CabinetManage },
                // 运营管理(operate manage)
                { path: '/operate_manage', name: 'operate_manage', component: OperateManage },
                // 账号管理(account manage)
                // { path: '/account_manage', name: 'account_manage', component: AccountManage },

                // 记录管理
                { path: '/record_manage', name: 'record_manage', component: RecordManage },
                //用户管理
                { path: '/user_manage', name: 'user_manage', component: UserManage },
                // 骑手管理
                { path: '/rider_manage', name: 'rider_manage', component: RiderManage },

                // test
                { path: '/test', name: 'test', component: Test },
                // 富文本
                { path: '/rich_text', name: 'rich_text', component: RichText },

            ]
        },
        // 登陆页面
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        // 修改密码
        {
            path: '/modify_password',
            name: 'modify_password',
            component: ModifyPassword
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
/*router.beforeEach((to, from, next) => {
    const isLogin = localStorage.code == md5("0") ? true : false;
    if (to.path == "/login" || to.path == '/register') {
        next();
    } else {
        isLogin ? next() : next("/login");
    }
});*/

export default router;