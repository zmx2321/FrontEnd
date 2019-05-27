import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routerConfig from './router'
// import pullToRefresh from './directives/pullToRefresh'
// import infiniteScroll from './directives/infiniteScroll'
// import * as filters from './filters'
import app from './main'

/*配置全局的属性和方法
    影响其后的创建的所有实例，所以必须放在创建实例组件注册之前
    后面所有组件内，无需重复定义这里出现的属性和方法，可以通过this.xxx调用他们
*/
Vue.mixin({
    data: function() {
        return {
            toast : {
                show : false,
                msg : '',
            },
        }
    },
    methods: {
        ajaxerr: function(msg) {
            this.toast.show = true
            this.toast.msg = msg
        },
        //定义一个全局提示方法
        toastFn : function(msg,callback) {
            this.toast.msg  = msg
            this.toast.show = true
            if(callback) {
                this.callback = callback
            }
        }
    }
})

Vue.component('toast',require('./components/toast.vue'));
// Router
Vue.use(VueRouter)

const router = new VueRouter({
  hashbang: true,
  history: false,
  saveScrollPosition: true,
  suppressTransitionError: true
})

routerConfig(router)

// Resource
Vue.use(VueResource)


// Vue.http.options.root = 'http://flashcarry.thy360.com';
Vue.http.options.root = 'http://172.16.0.207:80';
Vue.http.options.emulateJSON = false
// Vue.http.options.xhr = {withCredentials: true};

Vue.http.headers.common['token'] = localStorage.token;



//ajax 拦截   全局做判断
Vue.http.interceptors.push({
  request: function (request) {
    return request
  },
  response: function (response) {
    // console.log(response)
    var code = response.data.statusCode
    if(code == 1) {
      this.ajaxerr(response.data.msg);
    }else if(code == 401 || code == 402) {

      // code = 401 用户未授权，提示完之后跳转登录
      // code = 402 账号已经在别的地方登录，提示完之后跳转登录
      // this.toastFn(response.data.msg,function() {
      //   console.log(111)
      // })
      router.go('/account/login')
    }
    return response
  }
});

// Directive
// Vue.directive('pullToRefresh', pullToRefresh)
// Vue.directive('infiniteScroll', infiniteScroll)

// Filters
// Vue.filter('date', filters.dateFilter)

router.start(app, '#app')

window.router = router
