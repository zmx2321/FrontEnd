//修改表格
function updateCell() {
	var row = document.getElementById('row').value;
	var cell = document.getElementById('cel').value;
	var t = document.getElementById('mytable')

	//row行、cell列
	// t.rows[row-1].cells[cell-1].innerHTML = document.getElementById('course').value;
	t.rows.item(row-1).cells.item(cell-1).innerHTML = document.getElementById('course').value;
}