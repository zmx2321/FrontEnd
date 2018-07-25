//异常
var exception = {
	//抛出异常
	"pcyc": function() {
		var i=6;
		if(i==5){
			throw new Error("报错啦！");
		}
	},
	//捕获异常
	"bhyc": function(){
		var i=5;
		try{
			if(i==5){
				throw new Error("报错啦！");
			}
		}catch(e){
			console.log("错误信息：" + e.message);
		}finally{
			console.log("try catch");
		}
	}
}

console.log("抛出异常");
exception.pcyc();  //抛出异常

console.log("捕获异常");
exception.bhyc();  //捕获异常