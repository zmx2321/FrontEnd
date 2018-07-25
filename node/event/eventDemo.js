/**
 * @async 事件驱动模型
 * @author zmx2321
 * 单进程单线程非阻塞的事件驱动模型
 */

//引入events模块
var events = require("events");
//创建eventEmitter对象
var eventEmitter = new events.EventEmitter();

//句柄：一根绳去牵住这个函数（Handler）

//绑定事件及事件的处理程序
eventEmitter.on('eventName', function(){
	console.log("event start");
});

//触发事件
eventEmitter.emit("eventName");

//程序结束
console.log("over");