//使用路由，先声明它是路由实例
var skrouter = new VueRouter({
    //定义路由（数组）路由表
    routes: [
        //每一个节点表示一个路由
        //'/'表示默认路径，一个路由一个组件
        //template表示组件中的内容
        //加了一个#/
        //
        //component组件（自定义标签组合）
        {
            path: "/", 
            component: {
                template:"#home", 

                //路由中的data必须是函数,
                //必须返回对象
                //双向绑定
                data: function(){
                    //如果有多个数据
                    /*var skarr = {}
                    skarr.student = "eeeee";

                    return skarr;*/

                    return {student: "router实例中的数据"};
                }
            }
        },

        {
            //传参，必须以冒号开头
            path: "/user/:name", 
            component: {
                //template:"<div>用户内容，传过来的参数是：{{ name }}</div>", 
                template: "<div>" +
                        "用户内容，传过来的参数是：{{ name }}" +
                        "<input type='text' v-model='name'>" +
                    "</div>",

                //双向绑定
                data: function(){
                    var userarr = {};
                    //$route指路由传参过来的
                    userarr.name = this.$route.params.name;

                    return userarr;
                }
            }
        },

        //可以传参（动态路径参数，以冒号开头）
        //{path: "/list", component: {template:"#list"}},
        {path: "/list", component: {template:"#list"}, 
            children: [{
                //默认显示国内，写/gn页面不显示，点击才显示
                path: '', 
                component: {
                    template: "<div>国内新闻内容</div>"
                }
            }, {
                path: 'gw', 
                component: {
                    template: "<div>国外新闻内容</div>"
                }
            }]
        },
    ]
})


//实例化
var vm = new Vue({
    //路由
    router: skrouter,

    //作用域
    el: ".container",

    //初始数据
    data: {
        student: "vue实例中的数据",
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