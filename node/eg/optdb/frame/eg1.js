/**
 *  express nodejs框架
 *  安装过程：http://www.expressjs.com.cn/starter/installing.html
 *  环境安装：npm install express body-parser mongoose --save
 *           npm install md5 --save(当前文件夹)
 *           npm init(package.json)
 *  启动数据库(设置路径mongod --dbpath d:\data\db => 启动 mongod)
 *  使用mongoose连接mongodb服务
 */

//加载模块
const express = require("express");  //加载框架
const  fs = require("fs");  //加载文件操作模块
const http = require("http");  //加载http服务模块
const md5 = require("md5");  //加载md5加密模块
const mdb = require("mongoose");  //数据库连接以及数据处理模块

//实例化方法，实例化express对象
let app = express();

//数据模型，所有数据库操作要以该模型通信
let Schema = mdb.Schema;

//数据库连接
//直接写function,报警告说缺少{useNewUrlParser: true}
//用户url格式化
let connect = mdb.connect("mongodb://localhost:27017/news",
    {useNewUrlParser: true}, function (err, res) {
        if (err) throw err;

        console.log("MongoDB数据库连接成功！");
    });
//console.log(connect);

//模型与数据库的数据设置
//定义一个数据模型类(Schema)
const userSchema = new Schema({
    "name": String,
    "nickname": String,
    "pwd": String
});

//关联模型(数据表与模型关联) => 同步的一个过程
//model(库，模型，表) => 调用mongoose的model方法
let usermodel = mdb.model("news", userSchema, "userinfo");

//定义一个返回用户的数据
let skdata;

//由于数据表与模型已经同步了，操作模型相当于操作数据库
//接口数据获取
//查询所有数据
usermodel.find({}, function (err, list) {
    if (err) throw err;

    /**
     * list输出查询结果[数组]
     * list.toString() => 转成字符串
     *
     *  JSON.parse()【从一个字符串中解析出json对象】
     *  JSON.stringify()【从一个对象中解析出字符串】
     *
     *  JSON.stringify(list) => 数组转json
     */

    //list(接口数据)转换为json格式
    skdata = JSON.stringify(list);
});

//创建一个http服务(接收请求，发送请求)
http.createServer(function (req, res) {
    /**
     * 输出到页面需要设置编码
     * 使用http中的writeHead方法
     * 文本型，支持html传输，字符编码为utf-8
     *
     * 200表示从服务器请求
     */
    res.writeHead(200, {
        "Content-type": "text/html;charset=utf8"
    });

    res.write("你好 node！<br /><br />");

    /**
     * 服务器创建比数据库连接快，但希望优先连接数据库，
     * 所以，数据库的操作要放在服务中
     * 如果有用户请求，就把请求结果输出出来
     */
    res.write(skdata);

    //结束发送请求
    res.end();
}).listen(2333, function (err) {
    if (err) throw err;

    console.log("服务创建成功！");
    console.log("本机服务：http://192.168.0.103:2333");
});


