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

/**
 * manager
 */
// 超市管理
import MerchandiseOrder from './views/manager/supermarket/MerchandiseOrder'
import Commodity from './views/manager/supermarket/Commodity'
import CommodityClassification from './views/manager/supermarket/CommodityClassification'

// 食堂管理
import FoodProducts from './views/manager/canteen/FoodProducts'  // 餐品管理
import FoodProductsOrder from './views/manager/canteen/FoodProductsOrder'  // 餐品订单

// test
import Test from './views/test/Test'

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
                * 超市管理
                */
                // 商品订单
                { path: '/merchandise_order', component: MerchandiseOrder, name: 'merchandise_order' },
                // 商品管理
                { path: '/commodity', component: Commodity, name: 'commodity' },
                // 商品分类
                { path: '/commodity_classification', component: CommodityClassification, name: 'commodity_classification' },

                /**
                * 食堂管理
                */
                // 餐品管理
                { path: '/food_products', component: FoodProducts, name: 'food_products' },
                // 餐品订单
                { path: '/food_products_order', component: FoodProductsOrder, name: 'food_products_order' },
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
