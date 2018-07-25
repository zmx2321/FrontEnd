var arr = [1, 2, "aa", true];

for(var i=0; i<arr.length; i++){
	console.log(arr[i]);
}

var arr = [];
var arr = new Array();

arr[0] = 5;
arr[3] = 3;
console.log(arr[2]);
console.log(arr);

//三目
5>2?console.log("5大于2"):console.log("5小于2");

//逗号运算符(返回多个表达式中最右边那个表达式的值)
var a,b,c;
a=(b=5,c=2,d=3);
console.log(a);

//void(强行指定表达式不会表达值)
var a,b,c;
a=void(b=5,c=2,d=3);
console.log(a);

//typeof
console.log(typeof 'aaa');

//instanceof
var a = [1, 2];
console.log(a instanceof Array);
console.log(a instanceof Object);

for(var index in arr){
	console.log(arr[index]);
}

for(var properties in navigator){
	console.log("属性：" + properties + "属性值：" + navigator[properties]);
}