window.onload = function(){
    //实例化
    new Vue({
        //作用域
        el: ".container",

        //初始数据
        data: {
            num: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            str: "",  //乘法口诀
            onoff: false,  //开关
            active: 2,  //选项卡
        },

        //预处理数据
        computed: {

        },

        //函数（事件）
        methods: {
            cfkj: function(){
                var temp = "";

                for(var i=0; i<this.num.length; i++){
                    for(var j=0; j<=i; j++){
                        temp += this.num[j] + "*" + this.num[i] + "=" + (this.num[j]*this.num[j]);
                        temp += "&nbsp;";
                    }

                    temp += "<br />";
                }

                //如果每次绑定的html类型的代码一定要让代码在一个标签里
                console.log(temp);
                this.str = temp;
            }
        }
    });
}