//加载模块
const path = require("path");  //路径模块(需要当前路径)
const express = require("express");  //框架模块
const bodyParser = require("body-parser");  //中间件模块
const mdb = require("mongoose");  //数据库连接以及数据处理模块
const md5 = require("md5");  //加载md5加密模块

//实例化方法，实例化express对象
let app = express();

//路由解码
app.use(bodyParser.urlencoded({ extended: false }));

//实例化中间件
app.use(bodyParser.json());

//数据模型，所有数据库操作要以该模型通信(调用mongoose的Schema方法)
const Schema = mdb.Schema;

//设置模板所在的文件夹
app.use(express.static(path.join(__dirname, "www")));

//连接数据库
mdb.connect("mongodb://localhost:27017/news",
    {useNewUrlParser: true}, function (err) {
        if (err) throw err;

        console.log("MongoDB数据库连接成功！");
    });

//定义一个数据模型类(Schema)
const userSchema = new Schema({
    "name": String,
    "nickname": String,
    "pwd": String
});

//关联模型(命名，模型，自定义表名，默认是命名+s)
const usermodel = mdb.model("userinfo", userSchema);

//数据
const userinfo = {
    "name": "zmx",
    "nickname": "sk",
    "pwd": md5(md5("123456"))
};

//增加用户
/*let create = usermodel.create(userinfo, function (err, res) {
    if (err) throw err;

    console.log("增加成功");
});*/

//创建http服务
let server = app.listen(23334, "127.0.0.1", function (err) {
    if (err) throw err;

    console.log("服务创建成功！");

    //获取当前服务的地址
    let host = server.address();
    console.log(host);

    // %s表示变量（console.log用法）
    console.log("本机服务：http://%s:%s", host.address, host.port);
});