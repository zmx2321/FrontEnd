//服务器支持http服务，用户向服务器请求(url)，服务器向用户返回一个地址
//node服务器的创建

//引入http模块
const http = require("http");

//引入文件操作模块（服务器需要将文件内容(代码)发送给用户）
//const fs = require("fs");

//创建一个服务(request:用户请求，response:返回请求)
//监听一个端口（http服务端口默认80）
//node尽量不占80端口，可能还存在其他端口
//nginx => 代理所有的前后端服务
//端口1-65535
http.createServer(function (request, response) {
    //刷新一次页面，就是一次用户请求
    console.log(request);

    //用户有一个请求，服务器写入一句话发给用户
    //需要设置编码(可以解析html)
    response.write("<div class='cc'>welcome</div>");

    //服务器发送请求结束，终止
    response.end();
}).listen(6666, function (err) {
    if (err) throw err;

    console.log("本机服务:http://192.168.0.103:3333");
});
