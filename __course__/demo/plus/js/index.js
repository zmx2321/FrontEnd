/**
 * 加法操作
 * @author zmx2321
 */

//获取节点
var nNum1 = document.getElementById("num1"),
	nNum2 = document.getElementById("num2"),
	nResult = document.getElementById('result'),
    nBtn = document.getElementById('btn');

//给按钮绑定点击事件
nBtn.addEventListener("click", onClickAdd, false);  //true - 事件句柄在捕获阶段执行(从父元素到子元素),  false- false- 默认。事件句柄在冒泡阶段执行(从子元素到父元素)

//实现加法操作，并返回结果
function add (a, b) {
  return a + b;
}

//实现点击方法
function onClickAdd(){
	var a = parseInt(nNum1.value), //获取第一个数字
      	b = parseInt(nNum2.value), //后去第二个数字
      	result;
  result = add(a,b);  //执行加法操作
  nResult.innerHTML = result;  //显示
}