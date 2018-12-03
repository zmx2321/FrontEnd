//获取文件信息
const fs = require("fs");

//异步获取文件信息
fs.stat("./userinfo.json", function (err, res) {
    if (err) throw err;

    console.log(res);
});

//异步获取文件夹信息
fs.stat("./tip", function (err, res) {
    if (err) throw err;

    console.log(res);
});

//判断是一个文件还是一个文件夹
//./tpl/404.html  true
//./tpl/  false
fs.stat("./tpl/404.html", function (err, res) {
    if (err) throw err;

    //是否是文件(false:不是文件，true:是文件)
    console.log(res.isFile());
});