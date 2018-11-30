window.onload = function(){
    //实例化
    var vheader = new Vue({
        //作用域
        el: ".container",

        //初始数据
        data: {
            title: "这是页面头"
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

        //模板(模板往作用域渲染)
        //指向一个模板,替换的范围是vue实例的innerHTML
        template: "#tp2",
    });

    //拿到实例中的变量
    console.log(vheader.title);

    //规定如果是实例中规定方法，必须以$开头
    //el，元素作用域范围
    //vheader.$data.title
    console.log(vheader.$el);

    var vcontent = new Vue({
        //作用域
        el: ".container2",

        //初始数据
        data: {
            //获取模板1的变量
            //不同模板直接的通信
            title2: "模板2的title" + vheader.title
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

        //模板(模板往作用域渲染)
        //指向一个模板,替换的范围是vue实例的innerHTML
        template: "#tp1",
    });
}