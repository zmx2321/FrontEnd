// 组件名称，配置项（data,template...）
// 将组件名放到html中
Vue.component("counter",  {
    // 所有的标签需要放在一个父级当中
    template: '<button>按钮</button>',
});

new Vue({
    el: "#app",

});