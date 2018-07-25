//创建表格
function createTable(argument) {
	var oDiv = document.getElementById('test');

	var t = document.createElement("table");

	t.border = "1";
	t.id = "mytable";

	//创建
	// document.createElement
	var caption = t.createCaption();
	caption.innerHTML = "我的表格";

	for(var i=0; i<5; i++){
		//在指定地方插入一行
		var tr = t.insertRow(i);
		//内循环控制单元格个数
		for(var j=0; j<4; j++){
			var td = tr.insertCell(j);
			td.innerHTML = "单元格" + i + j;
		}
	}

	oDiv.appendChild(t);
}

//删除最后一行
function deleteLastRow() {
	var t = document.getElementById('mytable');

	if (t.rows.length>0) {
		t.deleteRow(t.rows.length-1);
	}
}

//删除最后一个单元格
function deleteLastCell(argument) {
	var t = document.getElementById('mytable');
	var lastRow = t.rows[t.rows.length-1];  //得到最后一行
	if(lastRow.cells.length>0){
		lastRow.deleteCell(lastRow.cells.length-1);
	}
}