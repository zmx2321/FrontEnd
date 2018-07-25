/**
 * try...catch...finally异常捕获
 * @author zmx2321
 */

// var notDefined;

try{
	document.write(notDefined);
}catch(error){
	console.log(error);
}finally{
	console.log("finally");
}