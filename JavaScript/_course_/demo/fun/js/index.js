function show(name, age) {
	console.log("名字：" + name + ",年龄：" + age);
}
show('aa', 88);  //可以放在函数之前

//自执行函数
//第一个小括号表示声明了这样一个函数的对象
//第二个括号表示调用
(function(name, age) {
	console.log("名字：" + name + ",年龄：" + age);
})('张三', 66);

//匿名函数
var f = function(name, age) {
	console.log("名字：" + name + ",年龄：" + age);
}
f('ff', 88);  //不能放在函数之前

//使用function类构造匿名函数
//函数就是对象,函数会生成对象
var f = new Function('name', 'age', 
	'console.log("名字：" + name + ",年龄：" + age)'
);

f('rrrr', 44);  //不能放在函数之前
console.log(typeof f);
console.log(f instanceof Object);

//函数是window对象的一个属性
window.f("李四", 465);

//返回值
function show0() {}
var f = show0();  //拿一个变量来接收函数所返回的值
console.log(f);  //undefind

//返回字符串
function show1() {
	return "cmcc";
}
var f = show1();
console.log(f);

//返回函数
function show2(str) {
	return function(res){
		console.log(str + "aaaa" + res);
	};
}
//当调用这个方法的时候，接收的是这个函数的引用
var f = show2('qqq');
f('444');

//经典案例
//f3返回的是f4对象，即f指向f4对象，
//闭包：有权访问另一个函数作用域中的变量的函数
function f3(){
	var n=1;
	//局部函数
	//局部函数能访问全局函数内部的局部变量
	function f4(){
		console.log(n);
	}
	// f4(); //可以直接调用f4
	// 在下面直接调用f3的时候，f4不会被直接调用，所以必须在f3里面先调用f4，或者返回f4才能拿到f4里面的值
	// 所以可以直接return
	return f4;
}

//通过方法内return成员方法来调用方法内的方法
//声明一个变量来保存f3函数
var f = f3();
//然后可以直接调用f4函数
f();


//返回值
function f5(){
	var n=1;
	return n;
}

f5();  //无法调用
var f = f5();
console.log(f);




//函数的调用
function show5(name, age){
	console.log("你好" + name + ",今年：" +  age);
}
//最简单的调用方式(对象名.方法名(引用))
//当这个函数没有绑定给任何对象的时候，默认绑定的是windows对象
window.show5("张三", 30);

//第二种调用
//函数，被(对象)window调用
//call的第一个参数就是this指针要指向的对象
show5.call(window, "张三", 30);

//第三种调用
//函数，被(对象)window调用
//apply的第一个参数就是this指针要指向的对象
show5.apply(window, ['张三', 30]);


//有一组数据，要传过去一组数组，再传一个遍历数组的函数过去
//要传过来数组，还有一个函数
function show6(arr, func){
	//函数名被(对象)window调用
	//要把传过来的数据(arr)作为参数，交给传过来参数的函数进行遍历
	func.call(window, arr);
}

//在外面把参数传进去
//再把遍历数组的函数传进去(参数是接收你传过来的参数)
//把[1, 2, 3]传到上面的arr(参数)里面，把整个函数传给func
//整个函数会被window调用
//下面的function里面的参数接收的是上面方法体里面的arr,
//func.call(window, arr);里的arr指向的就是[1, 2, 3]
//
//就是把[1, 2, 3]传到function(arr){}中的arr,交给它来遍历
show6([1, 2, 3], function(arr){
	for(i in arr){
		console.log(arr[i]);
	}
});

console.log("apply");

//apply
function show7(arr, func){
	//以数组的方式传参
	func.apply(window, [arr]);
}

show7([1, 2, 3], function(arr){
	for(i in arr){
		console.log(arr[i]);
	}
});
