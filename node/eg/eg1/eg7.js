//文件夹内文件信息
//加载核心插件（文件操作系统）
const fs = require("fs");

//返回文件夹内详细信息[数组]
//只输出当前目录
fs.readdir("./", function (err, files) {
    if (err) throw err;

    //console.log(files, typeof files);

    for(let item in files){
        //console.log(files[item]);

        //同步获取文件状态
        //同步运行完之后才有返回值，异步运行过程中有返回值
        let tmp = fs.statSync(files[item]);
        //console.log(files[item] + ":" + tmp.isFile());  //判断是不是文件

        if (tmp.isFile()) {
            console.log(files[item] + ":file");
        } else {
            console.log(files[item] + ":dir")
        }
    }
});