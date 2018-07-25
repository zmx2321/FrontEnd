//任意数求和，
//arguments,用来接收函数传递进来的参数值的一个集合, 是对象数据类型，不是数组，是类数组
//callee表示当前函数本身
function sum(){
	// console.dir(arguments);
	var total = null;
	for(var i=0; i<arguments.length; i++){
		// total += arguments[i];
		var cur = Number(arguments[i]);	//将传递进来的值转换为Number

		//对于非有效数字不进行累加，防止出现NaN
		/*if(isNaN(cur)){
			continue;	//继续执行下一次循环
		}

		total += cur;*/

		if(!isNaN(cur)){
			total += cur;
		}
	}
	return total;
}

total = sum(1, 2, 3, 100);
console.log(total);

console.log(sum(1, 2, 3, 122));

total = sum("30", 30);
console.log(total);

total = sum("30", 30, "aaa");
console.log(total);