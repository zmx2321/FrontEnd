//引入http模块
const http = require("http");

//引入文件操作模块
const fs = require("fs");

//引入一个url模块
const skurl = require("url");

//定义一个首页
let homepage = "./tpl/index.html";

//写一个函数，用于同步读取用户指定的文件
function readhtmls(url){
    console.log("请求的文件是：", url);

    //根据用户的请求去读取文件，因为是同步读取，所以要返回出来值
    if (url === "/"){
        return fs.readFileSync(homepage, "utf8");
    }else {
        return fs.readFileSync("./tpl" + url + ".html", "utf8");
    }
}

//创建http服务
http.createServer(function (request, response) {
    // /
    // /list.html
    // /favicon.ico
    // 获取三个路径
    //console.log(request.url);
    let userurl = skurl.parse(request.url).pathname;
    //userurl == "/" ? userurl="/index.html" : userurl=userurl+".html"

    console.log(userurl);

    //根据用户请求发送这个页面
    //同步操作，我们要先进行请求操作
    //读取首页内容(fs.readFileSync(homepage, "utf8");)

    //通过函数去找文件
    let content = readhtmls(userurl);
    response.write(content);

    //console.log(content);

    //直接从浏览器加上list.html页面，不跳转
    //获取list的url
    //console.log(url.parse(request.url).pathname);

    //关闭服务器响应
    response.end();
}).listen(2222, function (err) {
    if (err) throw err;

    console.log("本机服务：http://192.168.0.103:2222");
});