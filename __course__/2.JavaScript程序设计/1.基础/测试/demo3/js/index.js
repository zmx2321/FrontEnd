/*

3（12分）
函数formatDate用于将日期对象转换成指定格式的字符串，语法如下：
    var str = formatDate(date, pattern);
    其中pattern的全格式为"yyyy-MM-dd HH:mm:ss"
使用范例如下：
    var date = new Date(2001, 8, 11, 8, 26, 8);
    formatDate(date, "yyyy");       返回值： "2001"
    formatDate(date, "yyyy-MM-dd");     返回值： "2001-09-11"
    formatDate(date, "yyyy-MM-dd HH");      返回值： "2001-09-11 08"
    formatDate(date, "yyyy-MM-dd HH:mm:ss");    返回值： "2001-09-11 08:26:08"
请写出函数formatDate的实现代码。

 */


function formatDate(date, pattern) {
    var fuck = pattern;
    fuck = fuck.replace(/yyyy/, date.getFullYear());
    fuck = fuck.replace(/MM/, date.getMonth());
    fuck = fuck.replace(/dd/, date.getDate());
    fuck = fuck.replace(/HH/, date.getHours());
    fuck = fuck.replace(/mm/, date.getMinutes());
    fuck = fuck.replace(/ss/, date.getSeconds());
    return fuck;
}

var date = new Date(2001,8,11,8,26,8);
console.log(formatDate(date,"2001"));