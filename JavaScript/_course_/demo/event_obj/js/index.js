//得到事件对象(兼容IE)
function handle(oEvent) {
	if(window.event){
		oEvent = window.event;  //只有ie中有window。enven
	}

	var oTarget;  //事件源
	if (oEvent.srcElement) {  //存在则为IE
		oTarget = oEvent.srcElement;
	}else{
		oTarget = oEvent.target;  //标准dom
	}

	//弹出事件源的标签名
	alert(oTarget.tagName);
}

window.onload = function(){
	//给图片注册点击事件
	var oImg = document.getElementsByTagName('img')[0];
	oImg.onclick = handle;
}
