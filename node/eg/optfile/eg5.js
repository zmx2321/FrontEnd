//导入fs.js
const fs = require("fs");

let str = "写入的数据，写入时间" + new Date();

//文件地址（如果包含文件夹，会抛出异常，路径不能包含目录）
//不能创建文件夹，但在文件夹里面的目录可以读写
let skfile = "./doc.txt";

//写入(没有找到文件，会被创建，有的话，内容被替换)
//路径，写入内容，字符，写入过程
fs.writeFile(skfile, str, "utf8", function (err) {
   if (err) throw err;

   console.log("写入成功！");
});