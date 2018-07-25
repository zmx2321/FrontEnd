/*
@高仿Jq队列动画，链式动画。
@animate(obj,json,fn)，使用方法和jq一样这里就不说明了
@作者：姚观寿
@作者QQ：281113270，86690712
@时间：2016-2-12
@如果您在使用过程中发现BUG请联系作者，谢谢！
 */
 function getByStyle(obj,attr){
					  var attr_number=window.getComputedStyle?getComputedStyle(obj,null)[attr]:obj.currentStyle[attr];
					  return  attr=='opacity'?parseInt(parseFloat(attr_number*100)):parseInt(attr_number);						
  				}
 function animate(obj,json,fn){
				   !obj.timer||clearInterval(obj.timer);
					var ie=document.all?true:false;
					 for(var attr in json){ 
											   attr=='opacity'?(json[attr]=parseInt(json[attr]*100),!(ie&& json[attr]>=100)||(json[attr]=99)): json[attr]=parseInt(json[attr]);
										 }
				   obj.timer=setInterval(function(){
								 obj.stopTimer=true;
								   for(var attr in json){
													   var styleAttr=getByStyle(obj,attr);
													   !(attr=='opacity'&&ie)||(styleAttr=Number(obj.style.filter.substr(14, 2))!=0?Number(obj.style.filter.substr(14, 2)):styleAttr);
													   var  iSpeed=(json[attr]-styleAttr)/8;
													   iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
													   (styleAttr==json[attr])||(attr=='opacity'?ie?obj.style.filter='alpha(opacity:'+(styleAttr+iSpeed)+')':obj.style[attr]=(styleAttr+iSpeed)/100:obj.style[attr]=iSpeed+styleAttr+'px',obj.stopTimer=false);
									 }
									 !obj.stopTimer||(clearInterval(obj.timer),fn&&fn());
					   },30);  
		   }
 