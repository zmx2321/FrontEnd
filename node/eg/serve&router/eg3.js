/**
 * 利用http创建服务器，如客户端请求为127.0.0.1:3000或127.0.0.1:3000/xxx,html时，
 * 判断www文件夹中，文件index.html或xxx.html页面是否存在，如存在则返回给用户相应的
 * 文件内容，如文件不存在，则将www文件夹中的err.html返回给客户端
 */
//导入http模块
const http = require("http");

//导入fs模块
let fs = require("fs");

//如果换成"./tpl/index2.html"，跳转到err页面
let mypages = ["./tpl/index.html", "./tpl/err.html"];

function readhtmls(url){
    return fs.readFileSync(url, "utf8");
}

//创建一个服务
http.createServer(function (request, response) {
    //判断当前文件是否存在
    let isf = fs.existsSync(mypages[0]);
    //console.log(isf);

    if (isf) {
        //如果存在，返回当前的文件
        response.write(readhtmls(mypages[0]));
    } else {
        response.write(readhtmls(mypages[1]));
    }

    //必须要关闭响应
    response.end();
}).listen(2222, function (err) {
    if (err) throw err;

    console.log("本机服务：http://192.168.0.103:2222");
});