var str = "ccaacsa-love-football";

var reg0 = /love/;
var reg0 = new RegExp('love');  //用对象的方法创建

//从字符串中去查找符合这个规则的字符串，找到的话，把它返回
console.log(reg0.exec(str)[0]);

//查看是否符合该规则(是否包含love这个字符串)，
//如果没有返回null
console.log(reg0.test(str));

//任意字符
console.log(/./.test(str));  //true

//是否有一个数字
console.log(/\d/.test('1d3'));  //true
//是否有一个非数字
console.log(/\D/.test('d23'));  //true

//判断是否有一个空白字符
console.log(/\s/.test('d2 3'));  //true

//判断是否有一个单词字符(数字，下划线，英文字母)
console.log(/\w/.test('d23'));  //true

//判断是否以(c)开头\b
console.log(/\bc/.test(str));  //true
console.log(/^c/.test(str));  //true

//判断是否以(l)结尾\b
console.log(/l\b/.test(str));  //true
console.log(/l$/.test(str));  //true



//判断字符串中是否有w或者o
console.log(/[wo]/.test(str));  //true

//判断字符串中是否没有w或者o
//(中括号中的^表示取反)
console.log(/[^wo]/.test(str));  //true

//判断字符串中是否有一个数字
console.log(/[0-9]/.test('a1'));  //true

//判断字符串中是否有一个数字
console.log(/[0-9]/.test('a1'));  //true

//判断字符串中是否有一个小写字母
console.log(/[a-z]/.test('a1'));  //true

//判断字符串中是否有一个大写字母
console.log(/[A-Z]/.test('a1'));  //true

//判断字符串中是否有一个字母(不区分大小写)
console.log(/[A-z]/.test('1a'));  //true

//判断字符串中是否有三个单词中的一个
console.log((/red|blue|love/).test(str));  //true


//判断字符串中是否至少有一个c
console.log(/c+/.test(str));  //true

//判断字符串中c是否有0到多个(没有也返回true)
console.log(/w*/.test(str));  //true

//判断字符串中某个字符(c)是否有0-1个
console.log(/c?/.test(str));  //true

//判断字符串中是否包含2个连续的a
console.log(/a{2}/.test(str));  //false

//判断字符串中是否至少包含2个连续的a
console.log(/a{2,}/.test(str));  //true

//判断字符串中是否至少包含4个到6个连续的a
console.log(/a{4,6}/.test(str));  //false

//判断字符串中是否包含b,忽略大小写
console.log(/b/i.test('BBS'));  //true

//查找大写的B
var st1 = 'BAABADDS';
var reg1 = /B/g;
console.log(reg1.test(st1));  //true
console.log(reg1.test(st1));  //true
console.log(reg1.test(st1));  //false

//是否有以b结尾(m表示另起一个头)
var st2 = 'test\nbbs';
var reg2 = /^b/m;
console.log(reg2.test(st2));  //true


//邮箱
//+表示一次或多次
var reg = /^[0-9a-zA-z_-]+@[0-9a-zA-z_-]+\.(com|cn|org)$/;
console.log(reg.test('123@abc.com'));  //true