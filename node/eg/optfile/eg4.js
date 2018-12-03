//删除文件(没有返回值)
const fs = require("fs");

//删除
fs.unlink("./userinfo2.json", function (err) {
    if (err) throw err;

    console.log("删除成功！");
});