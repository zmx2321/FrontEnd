/**
 * 完成一个node服务器通过注册功能，完成用户注册，输出一个用户信息接口
 */

//加载模块
const path = require("path");  //路径模块(需要当前路径)
const express = require("express");  //框架模块
const bodyParser = require("body-parser");  //中间件模块
const mdb = require("mongoose");  //数据库连接以及数据处理模块
const md5 = require("md5");  //加载md5加密模块

//路由传参，使用cookie（npm install cookie --save）
//cookie格式化(npm install cookie-parser --save)
//缓存
const cookie = require("cookie");
const cookieparser = require("cookie-parser");

//实例化方法，实例化express对象
let app = express();

//使用缓存(实例使用缓存，定义缓存前缀)
app.use(cookieparser("sk"));

//路由解码
app.use(bodyParser.urlencoded({ extended: false }));

//实例化中间件
app.use(bodyParser.json());

//数据模型，所有数据库操作要以该模型通信(调用mongoose的Schema方法)
const Schema = mdb.Schema;

/**
 * 数据库操作
 * 1、调用mongoose的connect方法连接数据库
 * 2、定义一个数据模型类(Schema)
 * 3、关联模型(数据表与模型关联)(调用mongoose的model方法)
 * 数据表与模型已经同步了，操作模型相当于操作数据库
 */
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

//关联模型
const usermodel = mdb.model("news", userSchema, "userinfo");

//设置模板所在的文件夹
app.use(express.static(path.join(__dirname, "tpl")));

//post提交表单注册(路由)
app.post("/useradd", function (req, res) {
    //获取到前端提交过来的表单数据 req.body(object)
    //console.log(JSON.stringify(req.body));

    //获取页面请求数据（对象）
    let userinfo = {
        name: req.body.username,
        nickname: req.body.usernickname,
        pwd: md5(md5(req.body.password))
    }

    //根据数据模型往数据库录入数据
    let create = usermodel.create(userinfo, function (err, data) {
        //失败
        if (err){
            res.send("信息不能录入，请注意<a href='/reg'>返回</a>");
        } else {
            console.log("用户添加成功！", data);

            //重定向(跳转页面)
            res.redirect("/user");
        }
    });

    /*res.json({
        msg: "完成提交操作！"
    });*/
});

//路由
app.use("/list", function (req, res) {
    res.sendFile(path.join(__dirname, "tpl", "list.html"));
}).use("/about", function (req, res) {  //关于
    res.sendFile(path.join(__dirname, "tpl", "about.html"));
}).use("/reg", function (req, res) {  //注册
    res.sendFile(path.join(__dirname, "tpl", "reg.html"));
}).use("/user", function (req, res) {  //注册
    res.sendFile(path.join(__dirname, "tpl", "user.html"));
}).use("/userinfo1", function (req, res) {  //注册
    res.sendFile(path.join(__dirname, "tpl", "userinfo.html"));
}).
//用户信息(最后的传参用resid去接收，路由传参)
use("/userinfo/:resid", function (req, res) {  //用户详情接口
    //框架中定义，如果传输的是带有参数的路由，用req.params接收
    console.log(req.params);

    //根据id(resid)查询,并返回数据
    //根据关联模型进行数据库查询并返回数据
    usermodel.find({"_id": req.params.resid}, function (err, userdetail) {
        if (err) throw err;

        //返回数据并转成json格式并发送到页面
        //n删除状态（1成功1条数据,0失败），ok操作状态（1完成,0未完成）
        res.json(userdetail);
        console.log(userdetail);
    });
}).
//从数据库中拿到数据，并返回，打包成json格式发送到页面
use("/json", function (req, res) {  //接口供前端使用
    //根据关联模型进行数据库查询并返回数据
    usermodel.find({}, function (err, list) {
        if (err) throw err;

        //返回数据并转成json格式并发送到页面
        res.json(list);
    });
}).
//修改
use("/change/:resid", function (req, res) {  //接口供前端使用
    console.log(req.params);  //参数(接收到id,等待)

    //根据关联模型进行数据库查询并返回数据
    usermodel.find({"_id": req.params.resid}, function (err, list) {
        if (err) throw err;

        //返回数据并转成json格式并发送到页面
        //res.json(list);
    });

    //放到缓存（1000*60*60*24毫秒到小时，一天）
    //支持http传输
    //保存用户id到客户端
    res.cookie("userid", req.params.resid, {
        maxAge:1000*60*60,
        httpOnly:true
    });

    //发送文件夹
    res.sendFile(path.join(__dirname, "tpl", "change.html"));
}).
//删除(next:不需要等待，直接执行下一步(404)，或者返回具体信息)
use("/remove/:resid", function (req, res, next) {
    console.log(req.params);  //参数(接收到id,等待)

    //remove警告
    usermodel.deleteOne({"_id": req.params.resid}, function (err, data) {
        if (err){
            res.json({
                msg: "删除失败",
                state: false
            });

            throw err;
        } else {
            console.log(data);

            res.json({
                msg: "删除成功",
                state: true
            });
        }
    });

    //next("{msg: '正在操作'}");
    //next(JSON.stringify({msg: '正在操作'}));
}).
//清空
use("/removeall", function (req, res) {
    //remove警告
    usermodel.deleteMany({}, function (err, data) {
        if (err){
            res.json({
                msg: "删除失败",
                state: false
            });

            throw err;
        } else {
            console.log(data);

            res.json({
                msg: "删除成功",
                state: true
            });
        }
    });
}).
//找不到页面
use("*", function (req, res) {
    res.redirect(404, "back");
});

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