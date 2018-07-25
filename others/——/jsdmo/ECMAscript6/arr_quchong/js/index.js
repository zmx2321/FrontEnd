window.onload = function(){
	var aa = [2,3,4,2,4];

	function dedupe(array){
	  return Array.from(new Set(array));
	}

	var res = dedupe(aa);
	console.log(res);	
}