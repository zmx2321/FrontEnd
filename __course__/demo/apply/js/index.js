/**
 * apply
 * Function.prototype.apply
 * apply是构造函数原型对象上的方法
 * 构造函数的原型对象会被他创建的原型链属性所引用
 * 而任何函数都是function构造函数的实例
 * 因此，任何函数都能调用到apply方法
 *
 * 实现了函数借用的功能，将函数借用给一个对象
 * 或者是实现函数所定义逻辑的一个功能
 * @author zmx2321
 */

//构造函数
function Point(x, y){
	this.x = x;
	this.y = y;
}

//位移方法
Point.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
}

//定义圆点，并移动
//对象的创建和对象方法的调用
var p = new Point(0, 0);
p.move(2, 2);
console.dir(Point);

//
var circle = {x:1, y:1, r:1}
console.dir(circle);  //查看对象结构

//如何让circle进行位移
//用apply
//apply可以将p.move的方法借用给circle对象去使用
//p.move通过apply借用给circle这个对象，使其分别在x和y轴上变更2和1的距离
//从而实现circle对象的移动
p.move.apply(circle, [2, 1]);  //x:3, y:2, r:1
console.dir(circle);  //查看对象结构