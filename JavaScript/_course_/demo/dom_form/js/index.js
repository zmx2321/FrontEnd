//操作表单
function operatorForm() {
	var myform = document.forms[0];  //得到文档中所有表单

	//获取表单属性
	alert(
		myform.action + "\n" +
		myform.method + "\n" +
		myform.target
	);

	//提交表单(表单对象.submit)
	myform.submit();  //打开新的窗口

	//表单恢复到初始状态
	// myform.reset();
}