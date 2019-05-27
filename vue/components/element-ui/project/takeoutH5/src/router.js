/**
 * ------------------------------------------------------------------
 * auth:true是否验证登陆状态
 * 只有带参数:id的才添加name属性
 * 普通跳转{path:'/packet'}
 * 带ID跳转{name:'detail',params:{id:list.bid}}
 * ------------------------------------------------------------------
 */
/**
component (resolve) {
        require(['./views/project/index'], resolve)
      }
      动态组件载入会多生成一个js
      component: require('./views/project/index')
      直接加载
*/


export default function (router) {
  router.map({
    '*': {
      component (resolve) {
        require(['./views/welcome'], resolve)//错误地址跳转到欢迎页
      }
    },
    '/': {
      component (resolve) {
        require(['./views/welcome'], resolve)//欢迎页
      }
    },
    '/seller':{
      component:require('./views/dealer/home/seller') //商家首頁
    },
    '/order':{
      component:require('./views/dealer/home/order') //商家订单
    },
    '/account':{
      component:require('./views/dealer/home/account') //个人中心
    },
    '/order/detail':{
      component:require('./views/dealer/order/detail') //订单详情
    }
  })

  // router.redirect({
  //   '/': '/home'
  // })
  router.beforeEach(({to, from, next}) => {
    let toPath = to.path
    let fromPath = from.path
    // console.log('to: ' + toPath + ' from: ' + fromPath)
    if (toPath.replace(/[^/]/g, '').length > 1) {
      router.app.isIndex = false
    } else {
      router.app.isIndex = true
    }
      next()
  })

  router.afterEach(function ({to}) {
    console.log(`成功浏览到: ${to.path}`)
    // $.refreshScroller()
  })

}
