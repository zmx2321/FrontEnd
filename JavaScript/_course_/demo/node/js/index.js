var curr = document.getElementById("n4");  //当前

//接收元素
function showContent(target) {
	alert(target.innerHTML);
}

//个数
function showCount(){
	alert(document.getElementsByTagName('li').length);
}