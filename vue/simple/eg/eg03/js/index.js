window.onload = function(){
    //实例化
    new Vue({
        //作用域
        el: ".container",

        //初始数据
        data: {
            title: "vue 模板文件",
            skstyle: "text-red",
            skstyle2: "border",
            isshow: true,
            //定义地址
            url: "http://img95.699pic.com/",
        },

        //预处理数据
        computed: {
            //预处理图片（定义图片）
            skpic: function(){
                console.log(this.url);
                return this.url + "element/40038/9894.png_300.png";
            },
        },

        //函数（事件）
        methods: {
            
        },

        //监听
        watch: {

        }
    });
}