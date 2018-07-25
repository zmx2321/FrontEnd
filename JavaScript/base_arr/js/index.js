var arr = [7, 5, 9];
console.dir(arr);

console.log(arr);

//for in 遍历对象中每一个属性名和属性值

console.log("for");
for(var i=0; i<arr.length; i++){
	console.log(arr[i]);
}

console.log("for in");
for(var key in arr){
	console.log(arr[key]);
}

/*

数组中的常用方法 		==>		1、方法作用
								2、需要传哪些参数
								3、是否有返回值，返回值是什么
								4、通过此方法是否对原来的数组产生了改变

 */
			

//数组的增加、修改、删除

//向数组末尾新增一项（push）
arr.push(111);
console.dir(arr);

//返回值(长度)
var res = arr.push(999, "qqq");
console.log(res, arr);

//删除数组中的最后一项（pop）
var res = arr.pop();
console.log(res, arr);
arr.length--;
console.log(arr);

//删除数组中的第一项(shift)
var res = arr.shift();
console.log(res, arr);

//向数组开头增加一项（unshift）
var res = arr.unshift(1000);
console.log(res, arr);


console.log("\n\n\n");

//实现增加、删除、修改(splice)
var arr0 = [55, 88, 99, 33, 66, 44, 22];
console.log(arr0);

//删除
//ary.splice(n, m) 从索引n开始，删除m个元素，把删除的内容以一个新数组的方式返回
//ary.splice(n) 从索引n开始，删除到数组末尾
//ary.splice(0)，清空数组（克隆之前的数组）
//ary.splice()未删除，返回原数组
var res = arr0.splice(1, 3);
console.log(res, arr0);

//修改
//splice(n, m, x),从索引n开始，删除m个，用x修改
var res = arr0.splice(1, 3, 1000);
console.log(res, arr0);

//增加
//splice(n, 0, x),从索引n开始，不删除，把x放在n前面
var res = arr0.splice(1, 0, 1000);
console.log(res, arr0);
//增加到末尾
var res = arr0.splice(arr0.length, 0 , 2000);
console.log(res, arr0);

//数组的截取和拼接
//slice截取
//slice(n, m), 从索引n开始，找到索引m处，不包含m
//slice(n),从索引n开始，找到数组的末尾
//
//concat 把两个数组拼接到一起
//

//数组转换成字符串
//toString
//join("x"),用x分隔字符串
console.log(arr0.join("+"));

// eval把js中字符串转换成js表达式(求和)
console.log(eval(arr0.join("+")));

//倒序排列（reverse）
var res = arr0.reverse();
console.log(res);

//sort(从大到小排序)（按Unicode码）
var res = arr0.sort();
console.log(res);

var res = arr0.sort(function(a, b){
	// return a - b;	//从小到大排序
	// return b - a;	//从大到小排序
});

//indexOf，验证是否存在（不存在返回-1）


//遍历数组forEach、map
arr0.forEach(function(item, index){
	console.log(item, index);
});

//返回的新数组每项都*10（替换原来的数组）
var res = arr0.map(function(item, index){
	return item * 10;
});
console.log(res);
