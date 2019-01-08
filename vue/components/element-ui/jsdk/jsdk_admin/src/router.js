import md5 from 'js-md5';  //md5加密

import Vue from 'vue'
import Router from 'vue-router'

// 一级
import Index from './views/Index'
import Register from './views/Register'
import Login from './views/Login'
import Home from './views/Home'
import InfoShow from './views/InfoShow.vue'
import NotFound from './views/NotFound'

import ProjectManage from './views/ProjectManage'
import ModifyPassword from './views/ModifyPassword'
import UV from './views/UV'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,

    routes: [
        // 如果是根路径的话，重定向到index路径
        {
            path: '/',
            redirect: '/login'
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

                //项目管理
                { path: '/project_manage', component: ProjectManage, name: 'project_manage' },
                //UV
                { path: '/uv', component: UV, name: 'UV' },
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
router.beforeEach((to, from, next) => {
    const isLogin = localStorage.code == md5("0") ? true : false;
    if (to.path == "/login" || to.path == '/register') {
        next();
    } else {
        isLogin ? next() : next("/login");
    }
});

export default router;
