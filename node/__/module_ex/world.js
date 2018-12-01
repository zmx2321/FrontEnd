//定义一个脚本类
function Hello(){
	var name;

	this.setName = function(thisName){
		name = thisName;
	};

	this.say = function(){
		console.log("say" + name);
	}
}

//提供外部能过使用的类(暴露一个类)
module.exports = Hello;