/*

//设置一个定时器，到达指定时间（interval），执行我们的操作（function），然后定时器并不停止，以后每隔这么长时间，都重新执行函数
window.setInterval([function],[interval]);

//设置一个定时器，到达指定时间（interval），执行我们的操作（function），然后定时器停止
window.setTimeout([function],[interval]);

 */

/*

定时器的返回值是一个数组，代表当前是第几个定时器（定时器队列）
  var timer1 = window.setTimeout(function(){

  },1000);  //console.log(timer1); --> 1

  var timer2 = window.setTimeout(function(){

  },1000);  //console.log(timer2); --> 2

 */
//时间戳转换
function formatDate(now) {
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var week = now.getDay();
    var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    var hour = now.getHours();
    var minute = now.getMinutes();
    var seconds = now.getSeconds();
    return month + "月" + date + "日" + " ( " + weekDay[week] + " ) " +  hour + ":" + minute + ":" + seconds;
}

var count = 0;
    
var timer = window.setInterval(function(){
	count++;
	
	var today = new Date();
    today = formatDate(today);

	console.log(today.toString ());
	console.log(count);
},1000);

// var timer = window.setTimeout(function(){
//   count++;
//   console.log(count);
// },1000);