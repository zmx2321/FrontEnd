window.onload = function(){
    //实例化
    new Vue({
        //作用域
        el: ".container",

        //初始数据
        data: {
            student: "张三",
        },

        //组件(组件放在初始化数据[data]之后)
        components: {
            //自定义标签(组件)
            "hello": {
                //自定义属性，这个属性名就是双向绑定的值
                //把vue实例中的值传给组件（组件和实例中的相互通信）
                props: ["sname"],

                //模板(要加标签，有一个大标签)
                template: "<div class='margbtm'>" +
                    "<h2>这是一个自定义标签</h2>" +
                    "<p>{{ sname }}</p>" +
                "</div>"
            }
        },

        //预处理数据
        computed: {

        },

        //函数（事件）
        methods: {
            
        },

        //数据监听
        watch: {

        }
    });
}