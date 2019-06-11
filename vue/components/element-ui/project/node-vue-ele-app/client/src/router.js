import Vue from 'vue'
import Router from 'vue-router'

// index
import Index from './views/Index'

// main
import Home from './views/main/Home'
import NotFound from './views/main/NotFound'

// admin
import Login from './views/admin/Login'
import Register from './views/admin/Register'

// manager
import InfoShow from './views/manager/InfoShow'
import FoundList from './views/manager/FoundList'
import UserList from './views/manager/UserList'

Vue.use(Router)

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

              { path: '/infoshow', name: 'infoshow', component: InfoShow },
              { path: '/foundlist', name: 'foundlist', component: FoundList },
              { path: '/userlist', name: 'userlist', component: UserList },
          ]
      },
      // 登陆页面
      {
          path: '/login',
          name: 'login',
          component: Login
      },
      // 注册页面
      {
          path: '/register',
          name: 'register',
          component: Register
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
    const isLogin = localStorage.eleToken ? true : false;
    if (to.path == "/login" || to.path == "/register") {
        next();
    } else {
        isLogin ? next() : next("/login");
    }
});

export default router;
