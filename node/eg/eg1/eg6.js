//文件内容的追加(原文内容+增加内容)，如果文件不存在会被创建
const fs = require("fs");

let str = "\n 这是一部分追加的内容" + new Date();

//追加内容
/*fs.appendFile("./doc.txt", str, "utf8", function (err) {
    if (err) throw err;

    console.log("追加成功！");
});*/

//先创建一个目录(同步[有先后])，再进行追加
//路径，模式（同步直接创建了，没有返回值）
//fs.mkdirSync("./skdoc");  //如果已有文件夹，则报错，所以需要判断

//异步追加
/*fs.appendFile("./skdoc/doc.txt", str, "utf8", function (err) {
    if (err) throw err;

    console.log("追加成功！");
});*/

//文件夹路径
let skfile = "./skdoc2";

//获取文件信息，判断文件夹是否存在
/*let skstate = fs.statSync(skfile);
console.log(skstate.isFile());*/

fs.stat(skfile, function (err) {
    //如果没有该目录(即该文件夹)
    if (err) {
        //同步创建一个文件夹
        fs.mkdirSync(skfile);
        console.log(skfile.slice(2) + "文件夹创建成功");
    } else {
        //文件夹已经被创建，直接追加
        console.log(skfile.slice(2) + "文件夹已经存在");
    }

    fs.appendFile(skfile + "/doc.txt", str, "utf8", function (err) {
        if (err) throw err;

        console.log("追加成功！");
    });
});
