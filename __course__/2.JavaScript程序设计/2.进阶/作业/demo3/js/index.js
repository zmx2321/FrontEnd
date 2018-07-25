/*

3（10分）
高版本的firefox,chrome及ie10以上的浏览器实现了Function.prototype.bind方法，bind方法调用语法为：
functionObj.bind(thisArg[, arg1[, arg2[, ...]]])
使用范例参考如下:
function move(x, y) {
    this.x += x;
    this.y += y;
}
var point = {x:1, y:2};
var pointmove = move.bind(point, 2, 2);
pointmove(); // {x:3, y:4}
但是低版本浏览器中并未提供该方法，请给出兼容低版本浏览器的bind方法的代码实现。

 */

Function.prototype.bind=function(obj){
	var aa=this,  args=arguments;
	return function(){
	    aa.apply(obj,Array.prototype.slice.call(args,1))
	}
}

function move(x, y) {
    this.x += x;
    this.y += y;
}

var point = {x:1, y:2};
var pointmove = move.bind(point, 2, 2);
pointmove(); 
console.log(point);
// {x:3, y:4}