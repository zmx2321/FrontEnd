/*function Search(str)*/
/*Search = (str) =>*/
let Search = (str) => {
    let json = {};  //创建一个空对象，用来临时保存遍历的str字符串
    let max = 0;  //用来保存出现次数最多的字符出现的次数
    let char;  //用来保存出现次数最多的字符

    //遍历字符串
    for(let i=0; i<str.length; i++) {
        if(!json[str[i]]) {  //遍历字符串的每一个字符，依次赋值到定义的空对象json中，并判断他否存在，如果不存在，
            //!json[str[i]]他返回的是true或者false,对象中如果有重复的属性存在，会返回false
            //console.log(!json[str[i]]);
            json[str[i]] = str[i];  //如果不存在，则重新赋值到下面的字符串str中(不重复的)
            //console.log(str[i]);
        } else {  //如果字符串已经存在于json对象中，则重新赋值到下面的字符串str中(重复的)
            json[str[i]] += str[i];
            console.log(str[i]);
        }
    }

    //遍历字符串
    for(let i=0; i<str.length; i++) {
        if(json[str[i]].length > max){  //遍历str字符串，将其值存入空对象json中，获取json对象当前索引(str[i])的字符串的长度值，并与max进行比较，
            //如果他的长度大于max的长度，则进行下面的操作
            max = json[str[i]].length;  //将json对象中当前索引的字符串的长度值赋值给max
            //console.log(json);
            //console.log(str[i]);
            char = str[i];  //将json对象中当前索引的字符串的值存入到变量char中 
            //继续进行循环，直到max为最大值，即json对象数组长度的最大值的位于当前索引(str[i])中的i，出现次数最多的字符为当前索引的值(str[i])
            //console.log(str[i]);
        }
    }
    console.log("出现次数最多的字符是" + char + ",出现了" + max + "次")
}

let str = "sdrtkjsfkkkkkkasjdddjffffffffggg";

Search(str);