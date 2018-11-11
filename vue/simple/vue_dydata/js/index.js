/**
 * Vue 可以添加数据动态响应接口。
 * 我们通过使用 $watch 属性来实现数据的监听，$watch 必须添加在 Vue 实例之外才能实现正确的响应
 *
 * Vue 不允许在已经创建的实例上动态添加新的根级响应式属性。
 * Vue 不能检测到对象属性的添加或删除，最好的方式就是在初始化实例前声明根级响应式属性，哪怕只是一个空值。
 * 如果我们需要在运行过程中实现属性的添加或删除，则可以使用全局 Vue，Vue.set 和 Vue.delete 方法。
 */
var myproduct = {"id":3, name:"book", "price":"20.00"};

var vm = new Vue({
    el: '#app',
    data: {
        counter: 1,  //初始值
        products: myproduct
    }
});

//如果我们想给 myproduct 数组添加一个或多个属性，我们可以在 Vue 实例创建后使用以下代码
vm.products.qty = "1";
// get/set 方法只可用于 id，name 和 price 属性，却不能在 qty 属性中使用
/*console.log(vm.products.qty);
console.log("qty不能get,set");
console.log(vm);*/

/*
	Vue.set 方法用于设置对象的属性，它可以解决 Vue 无法检测添加属性的限制
	Vue.set( target, key, value )
	target: 可以是对象或数组
	key : 可以是字符串或数字
	value: 可以是任何类型
 */
Vue.set(myproduct, 'qty', 2);
//get/set 方法可用于qty 属性
console.log("qty可以get,set");
console.log(vm);

/*
	Vue.delete 用于删除动态添加的属性
	Vue.delete( target, key )
	target: 可以是对象或数组
	key : 可以是字符串或数字
 */
// price 属性已删除，只剩下了 id 和 name 属性，price 属性的 get/set 方法也已删除
/*Vue.delete(myproduct, 'price');
console.log("price属性被清除");
console.log(vm);*/



// 监听counter值，当数值发生改变的时候，触发
// oval初始值(第二个参数)，nval新值(第一个参数)
// 我们不能通过添加 Vue 对象来实现响应
vm.$watch('counter', function(nval, oval) {
    alert('计数器值的变化 :' + oval + ' 变为 ' + nval + '!');
});

//2秒后数值变为20
setTimeout(
    function(){
        vm.counter = 20;
    },2000
);