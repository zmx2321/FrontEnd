//提示框
function testConfirm() {
	var answer = window.confirm("是否退出");

	if(answer){  //如果answer为true
		window.alert("88");
		// window.close();  //关闭浏览器
	}else{
		window.alert(":-)");
	}
}

//提示框加文本
function testPrompt(){
	var res = window.prompt("请输入密码", "123");
	window.alert(res);
}



/*谷歌浏览器不支持*/
//移动浏览器(某次偏移量)
function testMoveBy(){
	window.moveBy(50, 50);  //右，下
}

//直接让浏览器移到某个位置
function testMoveTo(){
	window.moveTo(250, 250);  //右，下
}

//每次增加多少宽高
function testResizeBy(){
	window.resizeBy(50, 50);  //宽(+50)，高
}

//将浏览器调整至宽度多少，高度多少
function testResizeTo(){
	window.resizeTo(350, 350);  //宽(+50)，高
}
/*谷歌浏览器不支持*/


//每次移动多少
function testScrollBy(){
	window.scrollBy(50, 50);  //右，下
}

//移动到多少像素
function testScrollTo(){
	window.scrollTo(50, 50);
}

//第二个参数表示如果已经点击弹出新窗口之后不会再弹出，在当前url重新加载
//第二个参数表示弹出新窗口特征值(新弹出窗口距离左边50...,有些属性不支持)
function testOpen(){
	window.open("http://www.baidu.com", "baidu", "left=50,top=50,width=500,height=500,location=no,toolbar=no,status=no,rasizable=no");
}


//定时器
var count = 0;
function showTime(){
	var d = new Date();
	var hour = d.getHours();
	var minute = d.getMinutes();
	var second = d.getSeconds();

	hour<10?(hour="0"+hour):hour;
	minute<10?(minute="0"+minute):minute;
	second<10?(second="0"+second):second;

	count++;
	if(count==5){
		window.clearInterval(t);
		//只执行一次
		window.setTimeout("alert('计时器坏了')", 2000);
	}

	document.getElementById("display").innerHTML = hour + ":" + minute + ":" + second;
}

var t = window.setInterval("showTime()", 1000);
