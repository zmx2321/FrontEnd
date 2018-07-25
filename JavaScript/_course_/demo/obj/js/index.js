//创建一个date对象
var d1 = new Date();
console.log(d1.toString());  //转字符串

//设置一个日期字符串
var d2 = new Date("2009-09-09 12:12:10");
console.log(d2.toString());

//年月日
var d3 = new Date("2009,08,08");
console.log(d3.toString());

//获取系统时间
var d = new Date();
// var year = d.getFullYear();  //年
// var month = d.getMonth() + 1;  //月
// var date = d.getDate();  //日
// var day = d.getDay();  //星期

//自定义日期
var year = d.setFullYear(2011);
var month = d.setMonth(3);
var day = d.setDate(28);
//星期会自动生成

var year = d.getFullYear();  //年
var month = d.getMonth() + 1;  //月
var date = d.getDate();  //日
var day = d.getDay();  //星期

switch(day){
	case 0:
		day = "星期日";
		break;
	case 1:
		day = "星期一";
		break;
	case 2:
		day = "星期二";
		break;
	case 3:
		day = "星期三";
		break;
	case 4:
		day = "星期四";
		break;
	case 5:
		day = "星期五";
		break;
	case 6:
		day = "星期六";
		break;
	default:
		day = "错误日期";
}

console.log("今天是"+year+"年"+month+"月"+date+"日 "+day);



/**
 *  对象
 */
//使用new关键字调用构造器创建对象
function student1(name, age) {
	this.name = name;  //属性变量
	this.age = age;

	//属于类本身，类变量
	//不属于属性(只能通过类名访问，类似java中static)
	student1.gender = "male";

	this.info = function(){
		console.log("名字：" + this.name + "，年龄：" + this.age + "性别：" + student1.gender);
	}
}

var s1 = new student1("张三", 30);
s1.info();


//直接使用object创建对象
var student2 = new Object();
student2.name = "张三";
student2.age = "28";
student2.gender = "male";
/*student2.info = function(){
	console.log("名字：" + this.name + "，年龄：" + this.age + "性别：" + this.gender);
}*/
function abc(){
	console.log("名字：" + this.name + "，年龄：" + this.age + "性别：" + this.gender);
}
//方法名后面加括号表示调用这个函数，这里不需要调用
student2.info = abc;
student2.info();


//json创建对象
//声明一个对象的引用
var person = {
	"name": "张三",
	"age": "28",

	"son": [
		{
			"name": "Jack",
			"age": "2",
		},{
			"name": "Rose",
			"age": "8",
		}
	],

	"info": function(){
		console.log("父亲名字：" + this.name + "，年龄：" + this.age);

		for(var child in this.son){
			console.log("儿子名字：" + this.son[child].name + "，年龄：" + this.son[child].age);
		}
	}
}
person.info();