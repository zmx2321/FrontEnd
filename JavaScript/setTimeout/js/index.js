//1
/*function funA(){ 
    alert(1); 
    setTimeout('funA()', 1000); 
} 
funA(); */


//2
/*

setTimeout("alert(1)", 1000);	//延时执行

setInterval("alert(1)", 1000);	//重复执行

*/

//3
/*for(var i=1; i<=3; i++){
	setTimeout(function(){
		console.log(i);
	},0);
}*/

//4
/*for (var i = 0; i < 3; i++) {
	setTimeout(function() {
		console.log(i);
	}, 0);
	console.log(i);
}*/

/*setTimeout(function() {
        console.log(1);
}, 0);
console.log(2);*/

//先打印2，后打印1
//
//
//


/*
	因为是setTimeout是异步的。
	正确的理解setTimeout的方式(注册事件)：
	有两个参数，第一个参数是函数，第二参数是时间值。
	调用setTimeout时，把函数参数，放到事件队列中。等主程序运行完，再调用。
 */


//5
/*setTimeout(function() {
        console.log(i);
}, 0);
var i = 1;*/


//6
//弹出0，1，2
/*for (var i = 0; i < 3; i++) {
	setTimeout((function(i) {
		return function() {
			console.log(i);
		};
	})(i), 0);
	console.log(i);
}*/

/*for (var i = 0; i < 3; i++) {
	setTimeout((function(i) {
		(function() {
			console.log(i);
		})(i);
	})(i), 0);
	console.log(i);
}*/


//7
/*for(var i=1; i<=3; i++){
	console.log("aa");
	setTimeout((function(i) {
		(function() {
			console.log(i);
		})(i);
	})(i), 0);
}*/


for(var i=1; i<=3; i++){
	//console.log("aa");
	/*setTimeout(function() {
        console.log(i);
	}, 0);*/
}