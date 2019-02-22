import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const router = new Router({
  // mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      component: () => import("pages/login/login")
    },
    {
      path: "/home",
      component: () => import("pages/home/home"),
      children: [
        {
          path: "",
          redirect: "/home/main1"
        },
        {
          path: "main1",
          component: () => import("@/components/home/main/main1")
        },
        {
          path: "main2",
          component: () => import("@/components/home/main/main2")
        },
        {
          path: "main3",
          component: () => import("@/components/home/main/main3")
        },
        {
          path: "main4",
          component: () => import("@/components/home/main/main4")
        },
        {
          path: "main5",
          component: () => import("@/components/home/main/main5")
        },
        {
          path: "main6",
          component: () => import("@/components/home/main/main6")
        },
        {
          path: "goods-detail",
          component: () => import("@/components/home/main/goods-detail")
        },
        {
          path: "news-detail",
          component: () => import("@/components/home/main/news-detail")
        },

        {
          path: "main5-1",
          component: () => import("@/components/home/main/ShopList")
        },
        {
          path: "main5-2",
          component: () => import("@/components/home/main/NewsList")
        },

        {
          path: "main6-1",
          component: () => import("@/components/home/main/UserControl")
        },
        {
          path: "main6-2",
          component: () => import("@/components/home/main/AuthorityControl")
        }
      ]
    }
  ]
});

// 全局前置守卫
// router.beforeEach((to, from, next) => { })

// 全局渲染守卫
// router.beforeResolve((to, from, next) => { })

// 全局后置钩子
// router.afterEach((to, from) => { })

export default router;
