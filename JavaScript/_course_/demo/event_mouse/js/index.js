function handle(oEvent) {
	if(window.event){
		oEvent = window.event;
	}  //处理兼容性，获得事件对象

	var oDiv = document.getElementById('display');
	oDiv.innerHTML += oEvent.type + "<br />";
}

window.onload = function(){
	var oImg = document.getElementsByTagName('img')[0];

	oImg.onmousedown = handle;  //将鼠标事件除了mousemove外都监听
	oImg.onmouseup = handle;
	oImg.onmouseover = handle;
	oImg.onmouseout = handle;
	oImg.onclick = handle;
	oImg.ondbclick = handle;
}