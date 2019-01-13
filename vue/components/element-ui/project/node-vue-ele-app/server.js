/**
 * @description server
 */

// 引入node重要组件
const express = require("express"),  // 引入express
    mongoose = require("mongoose"),  // 引入mongoose（用来链接数据库）
    bodyParser = require('body-parser');  // 引入body-parser(中间件)

// 引入users
const users = require("./routers/api/users");

// 实例化
const app = express();

//db config
//引入(mlab中)创建的数据库
const db = require("./config/keys").mongoURI;

// 使用body-parser中间件
app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json());

//链接数据库
mongoose.connect(db, { useNewUrlParser: true }).then(
    () => console.log("mongodb connected !")
).catch(
    err => console.log(err)
);


/**
 * 每次修改需要重启服务，
 * 如果需要修改之后可以直接在页面呈现，使用nodemon
 * 全局安装（npm install nodemon -g）
 * 启动（nodemon server.js）(node运行 node server.js)
 */
app
    .get("/", (req, res) => {  // 设置根路由(浏览器访问)
        res.send("Hello world!");
    })
    .use('/api/users', users);  // 使用routes,设置接口路由

// 端口号（在本地就是5001）
const port = process.env.PORT || 5001;

// 监听端口
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});