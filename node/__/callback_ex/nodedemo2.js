/**
 * @async 回调
 * @author zmx2321
 */

//非阻塞模式
//导入模块
var fs = require("fs");  //读写模块

fs.readFile("input.txt", function(err, data){
	if(err) return console.error(err);
	console.log(data.toString());
});

console.log("over");
