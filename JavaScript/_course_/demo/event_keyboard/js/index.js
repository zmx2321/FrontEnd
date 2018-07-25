function handle(oEvent) {
	if(window.event){
		oEvent = window.event;
	}  //处理兼容性，获得事件对象

	var oDiv = document.getElementById('display');
	oDiv.innerHTML += oEvent.type + "<br />";
}

window.onload = function(){
	var oTextArea = document.getElementsByTagName('textarea')[0];

	oTextArea.onkeydown = handle;
	oTextArea.onkeyup = handle;
	oTextArea.onkeypress = handle;
}