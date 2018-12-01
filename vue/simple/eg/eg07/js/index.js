window.onload = function(){
    //实例化
    new Vue({
        //作用域
        el: ".container",

        //初始数据
        data: {
            title: "sk",
        },

        //预处理数据
        computed: {
            
        },

        //函数（事件）
        methods: {
            
        },

        //监听
        watch: {
            
        },

        beforeCreate: function(){
            console.log("实例创建之前");
        },

        //混入在这之前渲染，所以title值又变为aaaaa
        //组件方法在混入方法之后
        created: function(){
            console.log("实例被创建");
            //实例创建之后，把title值改变
            this.title = "aaaaa";
        },

        //混入在实例创建之前完成
        //在实例创建之前之后，又在实例被创建之前
        //
        //混入中也包含了所有的生命周期
        //在每一个对应的生命周期之前
        //谁在最后面谁覆盖谁
        mixins: [{
            created: function(){
                console.log("1.9步 混入");
                
                this.title = "bbbbb";
            }
        }],
    });
}