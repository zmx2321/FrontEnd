//节点操作
function creat() {
	var city = document.getElementById('city');

	// 创建元素
	var element = document.createElement('li');

	element.innerHTML = "南京";

	//添加节点
	//city.appendChild(element);
	
	//在某个地方之前插入节点
	//city.insertBefore(element, city.firstChild.nextSibling);
	
	//替换节点
	city.replaceChild(element, city.firstChild.nextSibling);
}

//复制节点
function copy() {
	var city = document.getElementById('city');

	//深复制(true)
	//浅复制只复制元素本身，内部元素不会复制
	var element = city.firstChild.nextSibling.cloneNode(true);

	city.appendChild(element);
}

//删除节点
function del() {
	var city = document.getElementById('city');
	var element = city.firstChild.nextSibling;

	city.removeChild(element);
}