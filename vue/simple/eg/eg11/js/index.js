var skrouter = new VueRouter({
    routes: [
        {
            path: "/", 
            components: {
                //默认加载的路由视图
                default: {
                    template: "#home",
                },

                //第二个路由
                skview: {
                    template: "<div>skview</div>",
                }
            }
        }
    ]
})

//实例化
new Vue({
    //路由
    router: skrouter,

    //作用域
    el: ".container",

    //初始数据
    data: {
        
    },

    //预处理数据
    computed: {
        
    },

    //函数（事件）
    methods: {
        
    },

    //监听
    watch: {

    }
});