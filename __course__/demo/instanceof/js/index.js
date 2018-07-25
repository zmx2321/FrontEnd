/**
 * instanceof
 * js中的继承
 * @author zmx2321
 */

console.log(
	//能够判别内置对象类型
	[] instanceof Array,  //true
	/\d/ instanceof RegExp,  //true
	//不能判别原始类型
	1 instanceof Number,  //false
	"jerry" instanceof String  //false
);


//能够判别自定义对象类型及父子类型
function Point(x, y) {
	this.x = x;
	this.y = y;
}

function Circle(x, y, r){
	Point.call(this, x, y);  //继承Point
	this.radius = r;
}

//原型链，多态
Circle.prototype = new Point();  //实例化一个点
Circle.prototype.constructor = Circle;

var c = new Circle(1, 2, 3);
console.log(
	c instanceof Circle,  //true
	c instanceof Point  //true
);