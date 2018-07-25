//获取系统时间(对象数据类型)
var time = new Date();
console.log(time);

window.onload = function(){
	//显示时间
	var timer = window.setInterval(function(){
		var oDiv = document.getElementById("newtime"),
			timeStr = formatTime();

		oDiv.innerHTML = `
			<p>${timeStr}</p>
		`;
	},1);

	//显示倒计时
	var lineTimer = window.setInterval(function(){
		var oDiv = document.getElementById("timeLine"),
			linetimeStr = lineTime();

		oDiv.innerHTML = `
			<p>${linetimeStr}</p>
		`;
	},1);
}

// 倒计时 
function lineTime(){
	//倒计时
	var tarTime0 = "2017-02-28 00:00:00",
		nowTime = new Date();

	//将时间格式字符串改成标准时间格式(用-在ie6-8下不兼容,需要改成/)
	var tarTime = new Date(tarTime0);

	//求时间差
	//getTime:获取距离1970年1月1日零点的毫秒差
	var tarSpan = tarTime.getTime(),
		nowSpan = nowTime.getTime();

	var diffTime = tarSpan - nowSpan;	//毫秒差

	//用毫秒差算出小时.分钟、秒
	//小时
	var hour = Math.floor(diffTime / (1000 * 60 * 60)),	
		hourMs = hour * 60 * 60 * 1000, //当前小时包含的毫秒数
		spanMs = diffTime - hourMs;

	//分钟
	var minute = Math.floor(spanMs / (1000 * 60)),	
		minuteMs = minute * 60 *1000,
		spanMs2 = spanMs - minuteMs;

	//秒
	var second = Math.floor(spanMs2 / 1000);

	//毫秒
	mlSecondMs = second * 1000,
	mlSecond = spanMs2 - mlSecondMs;

	return "距离" + tarTime0 + "还剩下" + zero(hour) + "时" + zero(minute) + "分" + zero(second) + "秒" + mlSecond;
}

//改变时间格式
function formatTime(){
	var time = new Date();
	//获取年份、月份、日期、星期、小时、分钟、秒、毫秒
	var year = time.getFullYear(),
		month = time.getMonth() + 1,	//0-11代表1-12
		day = time.getDate(),
		week = time.getDay(),	//0-6代表周日-周六
		hours = time.getHours(),
		minutes = time.getMinutes(),
		seconds = time.getSeconds(),
		mlSeconds = time.getMilliseconds();	//毫秒

		//将星期转变成中文
		var wStr = "日一二三四五六",
			week = wStr.charAt(week);

		//拼接时间
		return year + "年" + zero(month) + "月" + zero(day) + "日 星期" + zero(week) + zero(hours) + "时" + zero(minutes) + "分" + zero(seconds) + "秒" + mlSeconds;
}

//遇到一位数前面加0
function zero(value){
	return value < 10 ? "0" + value : value;
}