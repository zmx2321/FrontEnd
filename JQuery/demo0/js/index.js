var choose = function(){	
	// $('#demo').click(function(){
	// 	if($('#demo').prop("checked")){
	// 		return "true";
	// 	} else {
	// 		return "false";
	// 	}
	// });	
	// // return "true";

	$('#demo').click(function(){
		bool = false;
		if($('#demo').prop("checked")){
			bool = true;
			console.log(bool);
		} else {
			bool = false;
			console.log(bool);
		}
	});	

}

$(function(){
	// var res = choose();

	// console.log(res);

	choose();
	
	// console.log(bool);
});


window.onload = function(){
	// function Init(){
	//   alert(testA());
	// }

	// function testA(){
	//   return testB(); 
	// }

	// function testB(){
	//   return "hello";
	// } 
	// Init();

	// function a(){ 
	//   return "aaa"; 
	// }
	// var res = a();//10
	// console.log(res);
}