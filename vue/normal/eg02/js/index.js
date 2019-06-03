// 组件名称，配置项（data,template...）
// 将组件名放到html中
Vue.component("counter",  {
    // 所有的标签需要放在一个父级当中
    template: '#btn',
    // 是一个方法
    data () {
    	return {
    	     count: 0
    	}
    }, 
    methods: {
    	add() {
    	    this.count++;
    	}
    }
});

// 避免使用大写字母
Vue.component("counterA", {
   // 模板 
   template: "#test",
})

new Vue({
    el: "#app",

});

new Vue({
    el: "#box",

});