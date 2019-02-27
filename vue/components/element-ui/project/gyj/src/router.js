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

// manager
import Consultation from './views/manager/Consultation'
import IdentificationInfo from './views/manager/IdentificationInfo'
import ConsumeInfo from './views/manager/ConsumeInfo'
import Banner from './views/manager/Banner'
import DailyTask from './views/manager/DailyTask'
import Vote from './views/manager/Vote'
import Job from './views/manager/Job'
import UserStatistics from './views/manager/UserStatistics'
import ConsumptionStatistics from './views/manager/ConsumptionStatistics'
import Staff from './views/manager/Staff'

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

                // 资讯管理
                { path: '/consultation', component: Consultation, name: 'consultation' },
                // 资质认证管理
                { path: '/identificationInfo', component: IdentificationInfo, name: 'identificationInfo' },
                // 积分管理
                { path: '/consumeInfo', component: ConsumeInfo, name: 'consumeInfo' },
                // 轮播图管理
                { path: '/banner', component: Banner, name: 'banner' },
                // 签到管理
                { path: '/dailyTask', component: DailyTask, name: 'dailyTask' },
                // 投票管理
                { path: '/vote', component: Vote, name: 'vote' },
                // 职业管理
                { path: '/job', component: Job, name: 'job' },
                // 用户统计
                { path: '/userStatistics', component: UserStatistics, name: 'userStatistics' },
                // 消费统计
                { path: '/consumptionStatistics', component: ConsumptionStatistics, name: 'consumptionStatistics' },
                // 员工管理
                { path: '/staff', component: Staff, name: 'staff' },
            ]
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
router.beforeEach((to, from, next) => {
    const isLogin = localStorage.code == md5("0") ? true : false;
    if (to.path == "/login" || to.path == '/register') {
        next();
    } else {
        isLogin ? next() : next("/login");
    }
});

export default router;
