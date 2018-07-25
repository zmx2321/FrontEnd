/*

思考题：函数声明和函数表达式定义同一个函数时，执行的是哪个？
// 以下代码执行时，三次打印分别输出什么？为什么？
 
function add1(i){
  console.log("函数声明："+(i+1));
}
add1(1);
 
var add1 = function(i){
  console.log("函数表达式："+(i+10));
}
add1(1);
 
function add1(i) {
    console.log("函数声明："+(i+100));
}
add1(1);

*/

/*

101   11  11
解析：
函数声明定义函数，最后一次有效，所以第一个是101；然后这个声明还被前置。往下第二个add是表达式，所以是11。再往下，由于函数声明第二次这个被前置了，直接又到add，所以第三个add还是表达式的，是11；代码执行顺序如下：

 */



var add1;
function add1(i){
  console.log("函数声明："+(i+1));
}
 
function add1(i) {
    console.log("函数声明："+(i+100));
}
 
add1(1);    //101
  
add1 = function(i){
  console.log("函数表达式："+(i+10));
}
add1(1);   //11
  
add1(1);   //11