/**
 * function
 * @author zmx2321
 */

//函数声明
function add1(i, j){
	return i + j;
}
console.log(add1(1, 2));

//函数表达式
var add2 = function(i, j){
	return i + j;
};
console.log(add2(1, 2));

//函数实例化
var add3 = new Function(
	"i", "j", 
	"return (i+j)"
);
console.log(add3(1, 2));