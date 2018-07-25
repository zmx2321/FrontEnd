/*
以下是视频中演示的代码，你可以在chrome浏览器的Console面板中逐个练习：

//长度
"micromajor".length  // 10

//获取字符串中某个位置的字符
"micromajor".charAt(0)   // "m"
"micromajor".charAt(10) // ""

//找到字符串中某个字符第一次出现的时候的位置，-1表示不存在
"micro-major".indexOf("-")     // 5
"micro-major-web".indexOf("-") // 5
"micro-major".indexOf("major") // 6
"micromajor".indexOf("-")      // -1

//用正则匹配，-1表示不存在
"micromajor163".search(/[0-9]/) // 10
"micromajor163".search(/[A-Z]/) // -1

//捕获（结果是数组），找不到返回null
"micromajor163".match(/[0-9]/) // ["1"]
"micromajor163".match(/[0-9]/g)// ["1","6","3"]  //匹配所有的数字的集合
"micromajor163".match(/[A-Z]/) // null

//替换
"micromajor163".replace("163","###")  // "micromajor###"
"micromajor163".replace(/[0-9]/,"#")  // "micromajor#63"
"micromajor163".replace(/[0-9]/g,"#") // "micromajor###"
"micromajor163".replace(/[0-9]/g,"")  // "micromajor"

//从某一个索引到另一个索引之间截取前面那个包含，后一个不包含（5,7)表示5-6
"micromajor".substring(5,7)  // "ma"
"micromajor".substring(5)    // "major"  //从5开始到最后

//和substring一样，唯一的不同点是slice可以传负数，表示倒数
"micromajor".slice(5,7)   // "ma"
"micromajor".slice(5)     // "major"
"micromajor".slice(1,-1)  // "icromajo"  //从第一个到倒数第一个，最后一个索引不包含，不包含倒数第一个
"micromajor".slice(-3)    // "jor"

//从某一个索引开始，去多少长度字符串
"micromajor".substr(5,2)  // "ma"
"micromajor".substr(5)    // "major"

//用字符串中含有的字符对字符串进行分割，形成字符串数组
"micro major".split(" ")     // ["micro","major"]
"micro major".split(" ",1)   // ["micro"]
"micro2major".split(/[0-9]/) // ["micro","major"]

//全部小写
"MicroMajor".toLowerCase()  // "micromajor"

//全部大写
"MicroMajor".toUpperCase()  // "MICROMAJOR"

//字符串拼接
"0571" + "-" + "88888888"  // "0571-88888888"

//转字符串
String(163)  // "163"
String(null) // "null"

//转义
"micro\"major"  // "micro"major"
"micro\\major"  // "micro\major"
"micro\tmajor"  // "micro	major"
*/