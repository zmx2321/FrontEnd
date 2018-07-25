/*

4（10分）
斐波那契数列（Fibonacci Sequence）由 0 和 1 开始，之后的斐波那契数就由之前的两数相加。在数学上，斐波那契数列是以递归的方法来定义的：


请实现一个函数，参数为n，返回结果为以n为下标的斐波那契数。函数语法为
var num = fibonacci(n);
使用举例如下
var num = fibonacci(3); // num值等于2
var num = fibonacci(5); // num值等于5

 */


function fibonacci(n){
    if(n==0){
        return 0;
    } else if (n==1) {
    	return 1;
    } else {
    	return (arguments.callee(n-1)+arguments.callee(n-2));
    }
}

var num = fibonacci(3); 
console.log(num);//2
var num = fibonacci(5); 
console.log(num);//5

