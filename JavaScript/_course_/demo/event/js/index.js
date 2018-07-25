function test1() {
	alert("绑定html元素属性");
}

function test2() {
	alert("绑定dom对象属性");
}
document.getElementById("test2").onclick = test2;



//test3
function show() {
	alert("hello");
}
//当文档加载完之后
window.onload = function() {
	// ie支持attachEvent("onclick", show)
	document.getElementById("test3").addEventListener("click", show, false);
	document.getElementById("test4").onclick = function(){
		// ie -> document.getElementById("test3").detachEvent("onclick", show);
		document.getElementById("test3").removeEventListener("click", show, false);
		alert("已解除测试3按钮的事件绑定");
	}
}
