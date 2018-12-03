//数据库配置npm install express body-parser mongoose --save

//引入mongo模块
const mogo = require("mongoose");

//引入http
const http = require(http);

//协议
const url = "mongodb://localhost:27017/mydb";

//数据库连接
mongo.connect(url, function (err, db) {
    if(err) throw err;

    console.log("数据库已经连接");
});