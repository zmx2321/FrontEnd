/**
 * angular主要是依赖注入，vue主要是生命周期
 * vue是一个框架脚本，它需要实例化
 * 因为它本身已经写成了类的方式，所以需要new一个vue
 *
 * vue执行速度比angular快
 */

window.onload = function(){
    //实例化
    new Vue({
        //元素所在的位置(vue的作用范围)
        //实例化对象(#id, .class, element)
        //id唯一
        //不能使用body，尽量使用id和class
        el: '.container',

        //双向数据绑定(因为双向数据绑定最容易操作，只要管数据层，不用管视图层)
        //数据绑定，数据的初始化
        data: {
            title: 'hello',
            //数组
            student: ["aaa", "bbb", "ccc"],
            //数据对象
            userinfo: [{
                name: 'rrr',
                age: 20,
                job: 'teacher'
            }, {
                name: 'eee',
                age: 66,
                job: 'editor'
            }],

            //可以输出div标签
            des: "<div class='text-red'>可以输出div标签</div>",

            //预处理
            teacher: 'xxx',
            //判断是否是一个默认的老师
            ist: false
        },

        //预处理，在初始化数据的时候进行二次处理，可以直接绑定
        computed: {
            //预处理不能写死数据，用函数
            //用死数据就是初始化数据了
            //预处理必须是函数，这个函数必须要有返回值
            newTeacher: function() {
                //this代表当前data里面的数据
                console.log(this.teacher);
                //console.log(this.newTeacher);
                //根据ist判断
                if(!this.ist){
                    return "fff" + this.teacher + "fdasd";
                }
            }
        }
    });
}