/**
 * for...in...遍历对象属性名
 * @author zmx2321
 */

var cat = {
	name: 'kitty',
	age: 2,
	mew: function(){
		console.log('喵喵喵');
	}
}

for(var p in cat){
	document.write(p + " ");
}