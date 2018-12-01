//require表示导入
var http = require("http");

//创建一个服务器
http.createServer(function(request, response){
  //头
  response.writeHead(200,{'Content-Type':'text/plain'});
  response.end("Hello");

  /*while(true){
  	//监听操作
  	//转移到个处理模块去完成
  }*/
}).listen(8888);

console.log('Server runnging at http://127.0.0.1:8888');

//一个node.js文件就是一个模块