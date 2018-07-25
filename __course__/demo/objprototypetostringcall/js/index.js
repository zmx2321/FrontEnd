/**
 * 判断类型，Object.prototype.toString.call
 * @author zmx2321
 */

function type(obj){
	return Object.prototype.toString.call(obj).slice(8, -1);
}

console.log(
	type(1),  //Number
	type("abc"),  //String
	type(true),  //Boolean
	type(undefined),  //Undefined
	type(null),  //Null
	type({}),  //Object
	type([]),  //Array
	type(new Date),  //Date
	type(/\d/),  //RegExp
	type(function(){})  //Function
);

function Point(x, y){
	this.x = x;
	this.y = y;
}

console.log(type(new Point(1, 2)));