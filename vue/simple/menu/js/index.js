// 创建一个新的 Vue 实例
var demo = new Vue({
    // DOM 元素，挂载视图模型
    el: '#main',

    // 定义属性，并设置初始值
    data: {
        active: 'home'
    },

    // 点击菜单使用的函数
    methods: {
        makeActive: function(item){
            // 模型改变，视图会自动更新
            this.active = item;
        }
    }
});