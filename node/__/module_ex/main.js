//模块暴露的类
var Hello = require('./world');

hello = new Hello();  //创建对象

hello.setName("tom");
hello.say();