/**
 * 利用js模块，完成打包操作，即读取文件夹，获取www文件夹里面的文件名列表
 * 如果是文件，则将其内容添加到main.js文件中，如果再循环开始，main.js
 * 已经存在，就先删除
 */

//导入文件操作核心插件
const fs = require("fs");

let myfiles = "./www/";  //文件夹地址
let myfile = "./main.js";  //文件地址

/*fs.unlinkSync(myfile);*/

//读取文件夹[以数组的形式读文件夹中的文件]
fs.readdir(myfiles, function (err, res) {
    if (err) throw err;

    //console.log(res);
    //判断文件夹中main.js是否存在(不存在，需要建立，必须先判断，所以是同步)
    //判断当前文件是否存在(布尔值)
    let mjs = fs.existsSync(myfile);

    //如果main.js存在（删除）
    if (mjs) {
        console.log(myfile.slice(2) + "存在，进行删除");
        //删除
        fs.unlink(myfile, function (err) {
            if (err) throw err;

            console.log(myfile.slice(2) + "删除成功！");
        });
    }

    //遍历文件
    for(let item in res){
        //item是下标
        //console.log(res[item]);

        //判断文件夹中是否存在文件夹(同步)
        //文件状态
        //查看myfiles下面的文件状态(是文件还是文件夹)
        //res[item]表示文件或者文件夹名称
        let isf = fs.statSync(myfiles + res[item]).isFile();

        //console.log(myfiles + res[item] + ":" + isf);

        //如果是文件
        if (isf) {
            //读取(必须先读取才能写入，所以必须是同步)
            //let content = fs.readFileSync(myfiles + res[item], "utf8");
            let content = fs.readFileSync(myfiles + res[item]).toString();

            //是内存中的缓冲文件(代表数据所在的地址)
            //添加utf8可以解决
            //或者加toString()转为字符串
            //console.log(content);

            //追加(如果没有路径会被创建)
            //不论如何都会被删，这里也可以用同步
            //文件路径，追加内容，编码
            fs.appendFileSync(myfile, "-"+content+"\n", "utf8");

            console.log(res[item] + "文件追加成功！");
        }
    }

});

