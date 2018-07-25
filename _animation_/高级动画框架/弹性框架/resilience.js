/*
@产品名：兼容ie6 弹性运动
@作者：姚观寿
@QQ：281113270,86690712
@日期：2016年2月15：02时:22分
@兼容ie6 弹性运动 
@obj 第一个参数是要设置的dom节点对象
@json第二个参数是要传入的json值，top，width，height，left 
@number第三个参数是弹性的值，0.1-1，值越大弹性越大，值越小弹性越小
@fn是队列动画
@最好设置弹性运动高和宽收缩的时候，把弹性值降低点，或者是缩回去的时候不要缩进去太小
@如果您在使用的过程中有bug请联系作者
  "*/
 function getByStyle(obj,attr,fn)
   {
	     return parseInt(obj.currentStyle&&obj.currentStyle[attr]||getComputedStyle(obj,null)[attr]);
 	   }
  function resilience(obj,json,number,fn){
  		      clearInterval(obj.timer);
			  number=number?number:0.7;
 			   for(attr in json)json[attr]=parseInt(json[attr]);
  			  obj.timer=setInterval(function(){
				  obj.stopTimer=false;
 				  for(attr in json)
				      {
 					  obj[attr+'iSpeed']!=undefined||(obj[attr+'iSpeed']=0);
   				      obj[attr+'iSpeed']+=(json[attr]-getByStyle(obj,attr))/5;
 					  obj[attr+'iSpeed']*=number; 
					  if(obj[attr+'iSpeed']<1&&getByStyle(obj,attr)==json[attr])
					   {
   						      obj.style[attr]=json[attr]+'px'; 
 					   }
					  else{
  					 //obj[attr]是总的速度属性
 					  obj[attr]!=undefined||(obj[attr]=0);
					  obj[attr]+=obj[attr+'iSpeed'];
  							  if((attr=='width'||attr=='height')&&(obj[attr]<3||getByStyle(obj,attr)<3))
							     {
  									 return null ;
  									 } 
 					  obj.style[attr]=parseInt(obj[attr])+'px'; 
 					   obj.stopTimer=true;
    				        }
					  }
					  obj.stopTimer||(clearInterval(obj.timer),fn&&fn());
  				 },30); 
		  }