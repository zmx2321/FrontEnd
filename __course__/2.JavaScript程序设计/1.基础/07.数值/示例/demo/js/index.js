/*
以下是视频中演示的代码，你可以在chrome浏览器的Console面板中逐个练习：
//绝对值
Math.abs(5)   // 5
Math.abs(-5)  // 5

//四舍五入
Math.round(1.1)   // 1
Math.round(1.9)   // 2

//向上取整
Math.ceil(1.1)   // 2
Math.ceil(1.9)   // 2

//向下取整
Math.floor(1.1)   // 1
Math.floor(1.9)   // 1

//获取最大值
Math.max(1,2)      // 2
Math.max(-1,-2,-3) // -1

//获取最小值
Math.min(1,2)      // 1
Math.min(-1,-2,-3) // -3

//随机数[0,1)
Math.random()  // 大于等于0且小于1的随机数

//取整
parseInt('1.1')    // 1
parseInt('1.9')    // 1
parseInt('1b2.4')  // 1
parseInt('www')    // NaN

//转换成浮点型(钱)
parseFloat('100.1')  // 100.1
parseFloat('12.4b5') // 12.4
parseFloat('www')    // NaN

//判断是否是数值类型
Number('100.1')    // 100.1
Number('12.4b5')   // NaN
Number('www')      // NaN

//保留几位小数
(100.123).toFixed(2)   //  "100.12"
(100.123).toFixed(0)   //  "100"
*/

var aa = Math.abs(5)   // 5
console.log(aa);