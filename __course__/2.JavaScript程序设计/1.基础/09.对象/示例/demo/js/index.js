/*
以下是视频中演示的代码，你可以在chrome浏览器的Console面板中逐个练习：

//创建一个对象，给他属性和方法，并进行调用
var car = {
	color : "red",
	run : function(){alert("run")}
};
car.color;     // "red"
car.run();     // alert("run")
car["color"];  // "red"
car["run"]();  // alert("run")

//给对象添加属性和方法
var car = {
	color : "red",
	run : function(){alert("run")}
};
car.type = "suv";
car.stop = function(){alert("stop")};

//给对象修改属性和方法
var car = {
	color : "red",
	run : function(){alert("run")}
};
car.color = "white";
car.run = function(){alert("run2")};

//删除对象的属性和方法
var car = {
	color : "red",
	run : function(){alert("run")}
};
delete car.color;
car.color;  // undefined
delete car.run;

//查看对象是由什么方法构建出来的
var car = {
	color : "red",
	run : function(){alert("run")}
};
car.constructor;   // Object

//查看对象是由什么方法构建出来的
//得到num这个对象的构造函数
var num = new Number(123);
num.constructor;   // Number

//对象转字符串
var num = new Number(123);
num.toString();  // "123"

//获取对象的原始值
var num = new Number(123);
num.valueOf();   // 123
aa = num.valueOf();
console.log(aa);

//对象自己所拥有的属性,查看是否有，有返回true
//同时也可以查看是否是继承得来的，如果父类有该属性，也返回true
var car = {
	color : "red",
	run : function(){alert("run")}
};
car.hasOwnProperty("color");  // true
car.hasOwnProperty("logo");   // false
console.log(car.hasOwnProperty("run"));  //true
*/