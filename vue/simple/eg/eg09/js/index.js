window.onload = function(){
    //实例化
    new Vue({
        //作用域
        el: ".container",

        //初始数据
        data: {
            apidata: [],
            //接口地址
            apiurl: "http://www.coolneng.com/wap/json/link.php",
        },

        //预处理数据
        computed: {
            
        },

        //函数（事件）
        methods: {
            getdata: function(){
                //将vue的this中转一下
                //that指全局变量
                var that = this;  //这里的this值vue实例

                //jquery方法
                $.getJSON(this.apiurl, function(res){
                    console.log(res);
                    console.log(this, that);  //this指$.getJSON，不是vue
                    that.apidata = res.content;
                });
            }
        },

        //监听
        watch: {

        }
    });
}