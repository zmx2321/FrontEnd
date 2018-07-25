/**
 * @async 回调
 * @author zmx2321
 */

//阻塞模式(看到一句，执行一句)
//导入模块
var fs = require("fs");  //读写模块

//同步读取数据至data变量
var data = fs.readFileSync("input.txt");

//显示导入文件数据
console.log(data.toString());
console.log("over");
