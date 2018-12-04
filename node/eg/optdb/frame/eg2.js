/**
 * 通过express搭建服务器，配置静态目录，当http请求为127.0.0.1:3000时，
 * 显示index.html页面，当请求为127.0.0.1:3000/xxx时显示错误页
 */

//加载模块
const express = require("express");  //加载框架模块
const  fs = require("fs");  //加载文件操作模块
const md5 = require("md5");  //加载md5加密模块

/**
 * 路径模块(针对路径的各种操作，对于当前文件查找路径的方法)
 *
 * 在服务器上以盘符为操作地址
 *
 * path.join() => 目录连接
 * __dirname => 当前文件夹链接(物理路径)
 */
const path = require("path");
//console.log(path);
//console.log(__dirname);

/**
 *  express中自带了http服务
 *  express的中间件模块(npm body-parser --save)
 *
 *  body-parser => 主要是针对url，json的一些方法，
 *  让我们更方便的操作页面中的效果，
 *  用于处理json，url，编码，text方法(文档)
 *
 *  给了我们很多res的方法
 *
 *  大部分用在url中
 */
const bodyParser = require("body-parser");

//实例化方法，实例化express对象
let app = express();

//实例使用中间件（方法）
//有警告（bodyParser()构造器已经弃用）
//app.use(bodyParser());

//现在需要分别调用这些方法。
//app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//如果你还在收到警告urlencoded你需要用
app.use(bodyParser.urlencoded({ extended: true }));

/**
 *  use路由(规定可以被用户请求到的文件夹)
 *  express.static静态页面（文件夹）包含用户的所有请求信息
 *
 *  __dirname => 当前文件夹链接(物理路径)
 *  path.join() => 目录连接，逗号连接是子目录的关系
 */
//E:\WWW\eg\frame\aaa\bbb
//console.log(path.join(__dirname, "aaa", "bbb"));

//它认为用户所有返回路径的文件都在这里，默认去找index.html
//默认找("./tpl/index.html")
//设置模板文件所在文件夹
app.use(express.static(path.join(__dirname, "tpl")));

//关于我们
app.use("/about", function (req, res) {
    res.sendFile(path.join(__dirname, "tpl", "about.html"));
});

//返回给用户相应的信息
//路由地址传的是/list，执行
app.use("/list", function (req, res) {
    res.sendFile(path.join(__dirname, "tpl", "list.html"));
});

//提交表单，路由（前端过来的请求action）
app.post("/form", function (req, res) {
    //console.log(req);

    //获取到前端提交过来的表单数据 req.body
    console.log(req.body);

    //拿到了值，存到数据库
    res.send("数据已经成功录入到数据库中，完成注册<a href='/'>返回首页</a>");
});

app.use("/json", function (req, res) {
    //拿到页面传过来的对象
    let obj = { username: 'aa', password: '123456', usernickname: 'sss' };
    //转成json(中间件的用法，给了我们很多res的方法)
    res.json(obj);
})

//如果没有找到文件
//或者app.use(function(){});
app.use("*", function (req, res) {
    //发送文字
    //res.send("404错误(服务端直接发送文字[字符串])");

    //系统中的重定向页面
    //Not Found. Redirecting to http://192.168.0.103:2333/
    //res.redirect(404, "back");

    //或者重定向路由（自定义模板）,发送一个文件
    //所有文件都要在tpl文件下
    res.sendFile(path.join(__dirname, "tpl", "error.html"));
});

//建立http服务，监听端口
//"127.0.0.1"可以不写，隐藏
let server = app.listen(2333, "127.0.0.1", function (err) {
    if (err) throw err;

    //获取当前服务的地址
    let host = server.address();
    console.log(host);

    console.log("服务创建成功！");

    // %s表示变量（console.log用法）
    console.log("本机服务：http://%s:%s", host.address, host.port);
});

//也可以使用链式方法（只有一个结束符[分号]）
/*app.use(express.static(path.join(__dirname, "tpl"))).
    use(function (req, res) {
        //res.send("404错误");

        res.sendFile(path.join(__dirname, "tpl", "error.html"));
    }).
    listen(2333, function (err) {
        if (err) throw err;

        console.log("服务创建成功！");
        console.log("本机服务：http://192.168.0.103:2333");
    });*/
