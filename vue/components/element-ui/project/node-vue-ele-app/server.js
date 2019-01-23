/**
 * @description server
 */

// 引入node重要组件
const express = require("express"),  // 引入express
    cors = require('cors'),  // 跨域机制
    mongoose = require("mongoose"),  // 引入mongoose（用来链接数据库）
    bodyParser = require('body-parser');  // 引入body-parser(中间件)

// 引入passport(解析token)(认证各种账号信息)
const passport = require("passport");

// 引入users
const users = require("./routers/api/users");
// 引入profiles.js
const profiles = require('./routers/api/profiles');

// 实例化
const app = express();

// app.use(cors());

// 处理CORS
/*app.all('*', function(req, res, next) {
    console.log(req.method);
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, X-Requested-By, If-Modified-Since, X-File-Name, X-File-Type, Cache-Control, Origin');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Expose-Headers", "Authorization");

    res.header('Access-Control-Max-Age',1728000);//预请求缓存20天
    next();
});*/


//设置跨域访问
app.use('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //这个表示任意域名都可以访问，这样写不能携带cookie了。
    // res.header('Access-Control-Allow-Origin', 'http://10.10.8.100:5001'); //这样写，只有www.baidu.com 可以访问。
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');//设置方法
    if (req.method == 'OPTIONS') {
        res.send(200); // 意思是，在正常的请求之前，会发送一个验证，是否可以请求。
    }
    else {
        next();
    }
});


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

// passport初始化
app.use(passport.initialize());

// 配置passport(引入config下的passport在其中配置，并传递过去一个passport)
require('./config/passport')(passport);

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
    // 使用routes,设置接口路由
    .use('/api/users', users)
    .use('/api/profiles', profiles);

// 端口号（在本地就是5001）
const port = process.env.PORT || 5001;

// 监听端口
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
