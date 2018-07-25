//捕获事件必须使用标准dom的监听事件的方法
function show(sText) {
	var oDiv = document.getElementById('display');
	oDiv.innerHTML += sText;
}

//当页面加载完毕
window.onload = function(){
	var mbody = document.getElementById('mbody');
	var mdiv = document.getElementById('mdiv');
	var mp = document.getElementById('mp');

	//注册事件（flase表示冒泡事件，true表示捕获事件）
	mbody.addEventListener("click", function(){
		show('body<br />');
	}, true);

	mdiv.addEventListener("click", function(){
		show('div<br />');
	}, true);

	mp.addEventListener("click", function(){
		show('p<br />');
	}, true);
}