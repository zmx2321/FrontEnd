//函数执行的时候会形成一个私有的作用域，保护里面的内容不受外界的干扰，我们把这种机制叫做闭包（函数体定义的变量，在外面不能直接获取到）
/*

闭包

入口叫形参， 出口叫返回值

 function sum(num1, num2){
	var total = null;
	total = num1 + num2;
	console.log(total);
}

sum(100, 200);*/

 function sum(num1, num2){
	var total = null;
	total = num1 + num2;
	return total;	//return就是当前函数提供给我们的出口，因为不提供出口的话，闭包的机制导致了在函数体的外面无法获取里面total的值，如果想在外面用total的值，只需要通过return1把total的值返回给外面（返回值机制==> 并不是把变量返回给外界，而是把变量存储的值返回给外界）

}

var total = sum(100, 200);
/*
首先把函数sum执行，然后把sum执行的返回值赋值给外面的变量total

看sum执行的返回结果，只需要看sum中是否存在return，有return，return后面返回的值是什么，那么函数的返回值就是什么
如果sum中无return，那么默认的返回值就是undefined
 */

console.log(total);


/*

function fn(){
	var total = 300;
}

var total = fn();	//把fn这个函数执行的返回结果赋值给total,fn这个函数中没有return，所以默认的返回值是undefined
console.log(total);

 */


/*

function fn(){
	var total = 2;
	return total * 10;
	//return;	//在函数体中，return下面的代码都不执行（终止函数体代码）undefined
}

console.log(fn);	//输出函数本身
console.log(fn());	//输出fn执行的返回结果（20）

 */

