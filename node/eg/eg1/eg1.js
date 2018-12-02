console.log('this is a node program');
console.log(new Date());

//文件管理(增删改查)

/**
 * require
 * node的用法，包含，用来加载(加载系统核心库)
 * 定义一个变量fs,包含一个fs(文件服务[fileServer])的东西
 * 按住ctrl键,选择括号中的fs，弹出fs.js文件夹(和java一样)
 * fs.js文件管理写好的框架集(不能自己建fs.js文件)
 */
const fs = require("fs");

/**
 * path.js，路径核心库
 */
//拿到当前的路径（path.js）
const path = require("path");

//拿到函数
/*console.log(fs);
console.log(path);*/

//文件读取(同步，异步)
//同步
/**
 * 文件读取(同步，异步)
 * 同步(sync)每个数据的执行都要等到上一个数据执行完成后再执行
 * 异步()
 *
 * 在node的方法中都涉及到同步方法和异步方法
 */
//可以读取任意类型的文件，必须设置编码
//读取文件同步操作
//必须先执行完readFile之后才能输出同步结束(没有过程)
console.log("同步开始");
let res1 = fs.readFileSync("./userinfo.json", "utf8");
console.log(res1);
console.log("同步结束");

//读取文件异步操作
//请求不用等前一个数据输出完成，直接进行执行，有过程（首先请求文件，第二设置编码，第三判断是否错误输出值）
//err(如果有错误)没有找到文件
//res(结果)
//专门有一个进程给他执行
console.log("异步开始");
let res2 = fs.readFile("./userinfo.json", "utf8", function (err, res) {
    //如果有错误，抛出（相当于return）
    if(err) throw err;

    console.log(res);
});
console.log("异步结束");

