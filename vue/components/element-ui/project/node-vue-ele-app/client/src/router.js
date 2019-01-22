import Vue from 'vue'
import Router from 'vue-router'

// index
import Index from './views/Index'

// main
import Home from './views/main/Home'
import NotFound from './views/main/NotFound'

// admin
import Login from './views/admin/Login'
import ModifyPassword from './views/admin/ModifyPassword'

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
        // isLogin ? next() : next("/login");
    }
});*/

export default router;
