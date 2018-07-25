//for in : 用来循环一个对象中的属性名和属性值

var obj = {
	name: "aaa",
	age: 18,
};

//对象中有多少键值对，就循环几次
for(var key in obj){
	console.log(key);	//属性名
	console.log(obj[key]);	//属性值，在for in中获取对象属性值只能用[]，不能用.（obj.key）[当属性名为数字时不允许用.]
	//先循环数字的属性名，（小到大），再按照我们写的顺序
}