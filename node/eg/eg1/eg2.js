//文件打开和关闭(如果不关闭，内存会耗尽)
const fs = require("fs");

//异步打开文件（打开方式[以只读(r)或写入(w)读写(w+)]）
fs.open("./userinfo.json", "r", function (openErr, openRes) {
    if(openErr) throw  openErr;


    //res => 3状态码，表示打开成功
    console.log("打开成功 " + openRes);

    //因为是异步的，所以关闭要放在执行范围内
    //关闭当前内存驻留部分
    fs.close(openRes, function (closeErr) {
        if(closeErr) throw closeErr;

        console.log("已经关闭");
    });
});

