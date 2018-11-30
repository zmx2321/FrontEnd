//实例化
var vm =  new Vue({
    //作用域
    el: ".container",

    //初始数据
    //生命周期在3~4之间[]
    data: {
        title:  function() {
            console.log("data的值");
        },
        msg: 'hello',
    },

    //预处理数据
    //生命周期在3~4之间
    //预处理数据在初始化之后
    computed: {
        testTitle: function(){
            return console.log("预处理computed在初始化数据之后");
        }
    },

    //函数（事件）
    //在生命周期之外，靠用户触发
    methods: {
        
    },

    //监听
    watch: {

    },

    //生命周期（也属于实例中的方法）
    //实例创建之前
    beforeCreate: function(){
        console.log("1、实例创建之前beforeCreate");
        //在这个方法指向的时候，vue还未实例化，所以拿不到data的值
        //例如this.msg
    },

    //创建实例(被创建)
    created: function(){
        console.log("2、vue实例被创建created");
    },

    //挂载之前(在这之前找接口)
    beforeMount: function(){
        console.log("3、挂载之前beforeMount");
    },

    //挂载就是指渲染到界面，挂载之前到被挂在，数据被渲染到页面

    //被挂载
    mounted: function(){
        console.log("4、vue被挂载mounted");
    },

    //以上是自动，以下是触发

    //数据更新前
    //在数据渲染完成之后，用户操作，数据更新触发
    //首先data的数据发生改变，触发data，其次再是数据更新
    beforeUpdate: function(){
        console.log("5、数据更新前beforeUpdate");
    },

    //数据被更新(之后)
    updated: function(){
        console.log("6、数据更新后updated");
    },

    //实例销毁之前(实例只能在外部被销毁)
    beforeDestory: function(){
        console.log("7、实例销毁之前beforeDestory");
    },

    //实例销毁之后
    destroyed: function(){
        console.log("8、实例销毁之后destoryed");
    },
});

//console.log(vm);
//vm.$destroy();