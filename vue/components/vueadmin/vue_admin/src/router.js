import Vue from 'vue'
import Router from 'vue-router'

// 一级
import Index from './views/Index.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import NotFound from './views/NotFound.vue'

//test
// import SX from './views/sx/HelloDGTable.vue'

Vue.use(Router)

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
        name: 'index',
        component: Index
    },
    // 注册页面
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    // 注册页面
    {
      path: '/login',
      name: 'login',
      component: Login
    },

      // // 404
      // {
      //     path: '/sx',
      //     name: 'sx',
      //     component: SX
      // },


    // 404
    {
        path: '*',
        name: '404',
        component: NotFound
    }
  ]
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
    const isLogin = localStorage.eleToken ? true : false;
    if (to.path == "/login" || to.path == "/register") {
        next();
    } else {
        isLogin ? next() : next("/login");
    }
})

export default router;
