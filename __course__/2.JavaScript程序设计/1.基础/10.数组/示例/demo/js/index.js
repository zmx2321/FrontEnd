/*
以下是视频中演示的代码，你可以在chrome浏览器的Console面板中逐个练习：

//创建数组
var array = [1,6,3];

js数组里可以有不同的元素
var array = [
	163,
	"netease",
	{color:"red"},
	[],
	true
];

//数组的长度，重置数组
var students = [
	{id:1,score:80},
	{id:2,score:50},
	{id:3,score:70}
];
students.length;  // 3
students = [];
students.length;  // 0

//获取数组中的某个值，修改数组中的某个值
var students = [
	{id:1,score:80},
	{id:2,score:50},
	{id:3,score:70}
];
students[0];        // {id:1,score:80}
students[0].score;  // 80
students[1].score = 60;

//查询数组中某个值第一次出现的索引，若不存在则返回-1，
//如果有第二个参数，则是起始位置
var telephones = [110,120,114];
telephones.indexOf(120);  // 1
telephones.indexOf(119);  // -1

//遍历，回调
//传入一个回调函数
//如果有第二个参数，则用第二个参数代替默认的this
//把每一个分数都加五分
var students = [
	{id:1,score:80},
	{id:2,score:50},
	{id:3,score:70}
];
var editScore = function(item,index,array){
	item.score += 5;
};
students.forEach(editScore);

//数组倒序
var students = [
	{id:1,score:80},
	{id:2,score:50},
	{id:3,score:70}
];
students.reverse();
students[0].score;  // 70

//按成绩排序
//如果返回小于0，a放在b的前面，即降序（大到小）
//如果返回大于0，a放在b的后面，即升序（小到大）
//如果返回等于0，a和b保持原有的顺序
var students = [
	{id:1,score:80},
	{id:2,score:50},
	{id:3,score:70}
];
var byScore = function(a,b){
	return b.score-a.score;
};
students.sort(byScore);

//不传，按照Unicode排序
var studentNames = ["wq","xl","gp"];
studentNames.sort();
studentNames;  // ["gp","wq","xl"]

//给数组往后添加元素
var students = [
	{id:1,score:80},
	{id:2,score:50},
	{id:3,score:70}
];
students.push({id:4,score:90});

//给数组往后添加多个元素
var students = [
	{id:1,score:80},
	{id:2,score:50},
	{id:3,score:70}
];
students.push({id:4,score:90},{id:5,score:60});

//给数组往前添加
var students = [
	{id:1,score:80},
	{id:2,score:50},
	{id:3,score:70}
];
students.unshift({id:4,score:90});

//获取数组中的第一个元素，并删除数组中的第一个元素，剪切
var students = [
	{id:1,score:80},
	{id:2,score:50},
	{id:3,score:70}
];
students.shift();  // {id:1,score:80}

//获取数组中的最后一个元素，并删除数组中的最后一个元素，剪切
var students = [
	{id:1,score:80},
	{id:2,score:50},
	{id:3,score:70}
];
students.pop();  // {id:3,score:70}

//在任意位置替换
//从哪个位置，删多少，在这个位置加什么元素
var students = [
	{id:1,score:80},
	{id:2,score:50},
	{id:3,score:70}
];
students.splice(1,1,{id:4,score:90});

//删除任意位置
//从哪个位置，删多少
var students = [
	{id:1,score:80},
	{id:2,score:50},
	{id:3,score:70}
];
students.splice(1,1);

//插入，往前插
//从某个位置，不删除(0)，在这个位置前加什么元素
var students = [
	{id:1,score:80},
	{id:2,score:50},
	{id:3,score:70}
];
students.splice(1,0,{id:4,score:90});

//拷贝数组中的元素，从哪里开始到哪里为止，删除[0,2),开始位置包含，截止位置不包含
var students = [
	{id:1,score:80},
	{id:2,score:50},
	{id:3,score:70}
];
var newStudents = students.slice(0,2);  //1,2

//当第二个参数不传，就是拷贝到最后，0表示最开始，就是全拷贝
var students = [
	{id:1,score:80},
	{id:2,score:50},
	{id:3,score:70}
];
var newStudents = students.slice(0);

//连接数组，concat适用于任何变量
var students1 = [
	{id:1,score:80},
	{id:2,score:50},
	{id:3,score:70}
];
var students2 = [
	{id:4,score:90},
	{id:5,score:60}
];
var students3 = [
	{id:6,score:40},
	{id:7,score:30}
];
var newStudents = students1.concat(students2,students3);

//用分号为标识符，进行分隔，得到字符串
var emails = ["wq@163.com","gp@163.com","xl@163.com"];
emails.join(";");  // "wq@163.com;gp@163.com;xl@163.com"
console.log(typeof emails.join(";"));  //String
"wq@163.com;gp@163.com;xl@163.com".split(";");

//遍历，修改数组中每一个值
//原来的保存
var scores = [60,70,80,90];
var newScores = [];
var addScore = function(item,index,array){
	newScores.push(item+5);
};
scores.forEach(addScore);
newScores; // [65,75,85,95]

//遍历，将回调的值加到新数组，并返回一个新数组给你
var scores = [60,70,80,90];
var addScore = function(item,index,array){
	return item+5;
};
scores.map(addScore);  // [65,75,85,95]

//递归，累加80+50+70
//previousResult ==> 上一次方法得到的结果
//item ==> 数组当前遍历到的元素
//index ==> 当前元素的索引
//array ==> 数组本身
//reduce第二个参数表示初始值
var students = [
	{id:1,score:80},
	{id:2,score:50},
	{id:3,score:70}
];
var sum = function(previousResult,item,index,array){
	return previousResult + item.score;
};
students.reduce(sum,0);  // 200
*/