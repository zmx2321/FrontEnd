/*

2（10分）
函数parseQuery用于解析url查询参数。
语法如下：
	var obj = parseQuery(query)
	query是被解析的查询参数，函数返回解析后的对象。
使用范例如下：
	var jerry = parseQuery("name=jerry&age=1");
	jerry; 	返回值：{name: " jerry ", age: "1"}
	var tom = parseQuery("name= tom &age=12&gender&");
	tom; 	返回值：{name: "tom", age: "12", gender: ""}
请写出函数parseQuery的实现代码。

 */

var parseQuery = function(query){
    var reg = /([^=&\s]+)[=\s]*([^=&\s]*)/g;
    var obj = {};
    while(reg.exec(query)){
        obj[RegExp.$1] = RegExp.$2;
    }
    return obj;
}
var jerry = parseQuery("name=jerry&age=1");
console.log(jerry);
 
var tom = parseQuery("name= tom &age=12&gender&");
console.info(tom);


// var url="http://www.taobao.com/index.php?key0=0&key1=1&key2=2";

//方法1

/*function parseQuery(query){
	var arr = query.replace(/\s+/g,'').split('&');
	var obj = {};
	for(var i = 0; i < arr.length; i++){
		if(arr[i]){
			var newArr = arr[i].split('=');
			if(!newArr[1]){
				newArr[1] = '';
			}
			obj[newArr[0]] = newArr[1];
		}
	}
	return obj;
}

var reg = parseQuery(url);
console.log(reg);*/


//方法2

/*function parseQuery(query){
	var reg = /([^=&\s]+)[=\s]*([^=&\s]*)/g;
	var obj = {};
	while(reg.exec(query)){
        obj[RegExp.$1] = RegExp.$2;
	}
	return obj;
}

var reg = parseQuery(url);
console.log(reg);*/