/*

1（6分）
实现type函数用于识别标准类型和内置对象类型，语法如下：
var t = type(obj);
使用举例如下：
var t = type(1) // t==="number"
var t = type(new Number(1)) // t==="number"
var t = type("abc") // t==="string"
var t = type(new String("abc")) // t==="string"
var t = type(true) // t==="boolean"
var t = type(undefined) // t==="undefined"
var t = type(null) // t==="null"
var t = type({}) // t==="object"
var t = type([]) // t==="array"
var t = type(new Date) // t==="date"
var t = type(/\d/) // t==="regexp"
var t = type(function(){}) // t==="function"

 */

/*方法一：识别标准类型和内置类型的*/
/*function type(obj){
	return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
}

var t = type(1);
console.log(t);*/


/*方法二：识别所有类型*/
function type(obj){
	if(obj){
		return obj.constructor.toString().match(/function\s*([^(]*)/)[1];
	}else{
		return Object.prototype.toString.call(obj).slice(8,-1);
	}
}

var t = type(1);
console.log(t);