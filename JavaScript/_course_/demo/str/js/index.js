var str = "cc-love-football"

//字符串长度
console.log(str.length);

//下标为5的字符
console.log(str.charAt(5));

//转换大小写
console.log(str.toUpperCase());
console.log(str.toLowerCase());

//找到第一次出现o的下标
console.log(str.indexOf('o'));

//找到最后一次出现o的下标
console.log(str.lastIndexOf('o'));

//从第6个下标以后查找第一次出现o的下标
console.log(str.indexOf('o', 6));

//截取字符串(从下标为2的位置截取到最后)
console.log(str.substring(2));
//截取下标2-4(从下标2开始截取，截取(4-2)个)
console.log(str.substring(2, 4));

//截取字符串(从下标为2的位置截取到最后),
//和substring一样
console.log(str.slice(2));
console.log(str.slice(2, 4));
//可以有负数(负数表示从后往前数)
//从下标为3的地方开始截取，截到末尾
console.log(str.slice(3, -1));
//从下标为3的地方开始截取，截到倒数第8个
console.log(str.slice(3, -8));
//从倒数第三个截取到第倒数第一个
console.log(str.slice(-3, -1));

//替换(把所有o替换成a)
console.log(str.replace('o', 'a'));

//分割字符串(根据字符串中的-分割字符串)
console.log(str.split('-'));
for(var i=0; i<str.split('-').length; i++){
	console.log(str.split('-')[i]);
}

//匹配字符串match,search
//输出匹配的字符串
//没有返回null
console.log(str.match("love")[0]);

//返回索引
//没有返回-1
console.log(str.search("love"));