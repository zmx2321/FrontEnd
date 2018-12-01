window.onload = function(){
    //vue加载插件（vue难点在插件）
    Vue.use(VueResource);

    //实例化
    new Vue({
        //作用域
        el: ".container",

        //初始数据
        data: {
            //提示
            tip: "数据正在请求中...",
            resdata: [],
            //接口地址
            apiurl: "http://www.coolneng.com/wap/json/link.php",
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

        //数据请求的操作要用到生命周期
        //页面一打开的时候调接口请求数据
        //then(成功，失败)
        //
        //在实例创建之前(beforeCreat),this不能用
        //
        created: function(){
            this.$http.get(this.apiurl).then(response=>{
                this.tip = "数据已经接收";

                console.log(response);
                console.log(response.body.content);

                this.resdata = response.body.content;
            }, response=>{
                this.tip = "数据未找到，请验证接口";
            });
        },
    });
}