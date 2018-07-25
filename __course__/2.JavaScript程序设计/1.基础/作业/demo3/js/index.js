/*

3（5分）
函数multiply用于计算多个数字的乘积。
语法如下：
	var product = multiply (number0, number1[, number2, ….])；
使用范例如下：
	multiply(2, 3);	 返回值： 6
	multiply(-1, 3, 4);	返回值： -12
	multiply(1, 2, 3, 4, 5);    返回值： 120
请写出函数multiply的实现代码。

 */

function multiply(){
    var args=arguments;
    var result=0;
    for(var i=0;i<args.length;i++){
        if(result)result*=args[i];
        else result=args[i];
    }
    return result;
}

var product = multiply(1, 2, 3, 4, 5);
console.log(product);


/*function multiply(){

var length=arguments.length,
ji=1,
para;
for(i=0;i<length;i++){
para=arguments[i];
ji=ji*para;

}

return ji;
}

var reg = multiply(-1, 3, 4);

console.log(reg);*/