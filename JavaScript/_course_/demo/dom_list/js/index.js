function createSelect() {
	var element = document.createElement('select');

	for(var i=0; i<10; i++){
		var op = new Option("新增的选项" + i, i);
		element.options[i] = op;
	}

	element.size = 5;
	element.id = "city";

	document.getElementById('test').appendChild(element);
}

function delOne() {
	var city = document.getElementById('city');

	if(city.options.length>0){
		// city.remove(city.options.length-1);
		city.options[city.options.length-1] = null;
	}
}

function clearAll() {
	var city = document.getElementById('city');

	if(city.options.length>0){
		city.options.length = 0;
	}
}