import Vue from 'vue'
import Router from 'vue-router'

// 引入路由
import Home from './components/Home'
import Dishes from './components/Dishes'
import Manage from './components/Manage'
import Order from './components/Order'
import About from './components/about/About'

// 引入二级路由
import Intro from './components/about/Intro'
import Join from './components/about/Join'
import Contact from './components/about/Contact'

// 引入三级路由
import Wechat from './components/about/contact/Wechat'
import QQ from './components/about/contact/QQ'
import Email from './components/about/contact/Email'

Vue.use(Router)

const router = new Router({
  mode: 'history',  // 去掉#用history
  linkActiveClass: 'active',  // 选中默认样式

  base: process.env.BASE_URL,

  routes: [
    // 重定向（当用户输入一个错误的地址后跳转）
    {path: '*', redirect: "/home"},

    // 根目录
    {path: '/home', component: Home},
    {path: '/dishes',name: 'dishes',component: Dishes},
    {path: '/order',name:'order0',component: Order},
    {path: '/manage',component: Manage,
        // 管理只有登陆才能看(路由独享守卫)
        beforeEnter(to, from, next) {
          alert("非登陆状态下无法管理");
          next('/login');
        }
    },

    // 二级路由
    {
        path: '/about',
        component: About,
        redirect: '/about/contact',  // 要展示的路由
        children: [
          // 要加父路由
          {path: '/about/intro', component: Intro},
          {path: '/about/join', component: Join},
          //  三级路由
          {
              path: '/about/contact',
              component: Contact,
              redirect: '/about/contact/qq',  // 要展示的路由
              children: [
                {path: '/about/contact/wechat', component: Wechat},
                {path: '/about/contact/qq', component: QQ},
                {path: '/about/contact/email', component: Email},
          ]},
    ]},

    /*{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/!* webpackChunkName: "about" *!/ './views/About.vue')
    }*/
  ]
})

// 全局守卫
// 点击路由就会触发
/*router.beforeEach((to, from, next) => {
  // 如果点击的是登陆的那个路由，直接跳转
  if (to.path == 'login') {
    // 如果是继续执行
    next();
  } else {  // 点击的不是登陆的路由，跳到登陆
    next("/login");
  }
});*/

export default router;