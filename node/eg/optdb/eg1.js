//数据库配置  npm install express body-parser mongoose --save

//初始化  npm init

//引入mongo模块
//数据库连接以及数据处理模块
const mongo = require("mongoose");

//引入http
const http = require("http");

//调用md5(加密模块)（npm install md5 --save）
let md5 = require("md5");

//数据模型模块
const Schema = mongo.Schema;

//协议
const url = "mongodb://localhost:27017/news";

//数据库连接
mongo.connect(url, {useNewUrlParser: true}, function (err, skdb) {
    if(err) throw err;

    console.log("数据库已经连接成功!");
    //console.log(skdb);

    //查找数据(连接数据库，连接表，查找[条件不限]，转化为数组)
    /*skdb.db("mydb").collection("stu").find({}).toArray(function (merr, res) {
        if (merr) throw merr;

        console.log(res);
    });

    db.close();*/
});

//数据模型和数据库同步
//定义数据模型，定义的是一个类==数据库中表的模型一致
//数据模型类
//模型到后期不能动，后期增加，前面不能增加字段
var userSchema = new Schema(
    {
        "name": "string",
        "nickname": "string",
        "pwd": "string"
    }
);

//关联模型(数据表与模型关联)
//model(库，模型，表)
let usermodel = mongo.model("news", userSchema, "userinfo");

//必须要有数据，库才能显示出来
//增加数据(使用模型)
usermodel.create(
    {
        name: "c",
        nickname: "cmcc",
        pwd: md5("123456789")  //md5加密，不能解密,可以多次加密md5(md5())
    }, function (err) {
        if (err) throw err;

        console.log("数据添加成功！");
    }
);

/**
 *  find({"name": "aaa"}) => 查找name为aaa的数据  精确查找
 *
 *
 */
//数据输出，查找[条件不限]
usermodel.find({}, function (err, res) {
    if (err) throw err;

    //数组的形式
    console.log(res);
});

//删除数据
//remove(),不写全部删除
usermodel.remove({"name": "c"}, function (err, res) {
    if (err) throw err;

    console.log("数据删除成功！", res);
});
