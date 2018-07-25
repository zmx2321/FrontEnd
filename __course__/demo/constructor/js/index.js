/**
 * constructor
 * 类型识别
 * @author zmx2321
 */

console.log(
	//判断原始类型
	"jerry".constructor === String,  //true
	(1).constructor === Number,  //true
	true.constructor === Boolean,  //true
	({}).constructor === Object,  //true

	//判断内置对象类型
	new Date().constructor === Date,  //true
	[].constructor === Array  //true
);

//判断自定义对象
function Person(name){
	this.name = name;
}

console.log(
	new Person("jerry").constructor === Person  //true
);

//获取对象构造函数名称
function getConstructorName(obj){
	//第一个参数表示，如果是null或undefined直接返回他们本身(构造函数没有这两个)
	//第二个参数表示，为了保证第三个参数能够正常执行
	//第三个参数表示，构造函数名称
	return obj && obj.constructor && obj.constructor.toString().match(/function\s*([^(]*)/)[1];
}

console.log(
	getConstructorName([]) === "Array"  //true
);