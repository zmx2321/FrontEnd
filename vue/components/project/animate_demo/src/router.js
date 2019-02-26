import Vue from 'vue'
import Router from 'vue-router'

// index
import Index from './views/Index'

// main
import Home from './views/main/Home'
import NotFound from './views/main/NotFound'

// admin
import Login from './views/admin/Login'

// test
import Test from './views/test/Test'

/**
 * animate
 */
// Vue-3D-Model
import V3DMDemo1 from './views/animate/v3DMDemo/V3DMDemo1'
import V3DMDemo2 from './views/animate/v3DMDemo/V3DMDemo2'

// d3Demo
import D3Demo1 from './views/animate/d3Demo/D3Demo1'
import D3Demo2 from './views/animate/d3Demo/D3Demo2'

// casDemo
import CasDemo1 from './views/animate/casDemo/CasDemo1'
import CasDemo2 from './views/animate/casDemo/CasDemo2'

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

                // test
                { path: '/test', component: Test, name: 'test' },

                /**
                 * animate
                 */
                // Vue-3D-Model1
                { path: '/v3DMDemo1', component: V3DMDemo1, name: 'v3DMDemo1' },
                { path: '/v3DMDemo2', component: V3DMDemo2, name: 'v3DMDemo2' },

                // d3Demo
                { path: '/d3Demo1', component: D3Demo1, name: 'd3Demo1' },
                { path: '/d3Demo2', component: D3Demo2, name: 'd3Demo2' },

                // casDemo
                { path: '/casDemo1', component: CasDemo1, name: 'casDemo1' },
                { path: '/casDemo2', component: CasDemo2, name: 'casDemo2' },
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
/*router.beforeEach((to, from, next) => {
    const isLogin = localStorage.code == md5("0") ? true : false;
    if (to.path == "/login" || to.path == '/register') {
        next();
    } else {
        isLogin ? next() : next("/login");
    }
});*/

export default router;
