/*
@产品名：拖拽加速度缓冲效果，可以用来高仿app加速滑动效果，现在还没支持触摸屏事件，如果您有需要可以联系我们
@draggingGravity(obj,json)第一个参数是obj，
@draggingGravity(obj,json)第二个参数是json数据，
有三个参数可选，第一个是startSpeed:5默认是是5，这个参数是设置用户开始移开时候的速度快慢，
第二个参数是friction:0.9 默认值是0.9，是设置停止的摩擦力大小
第三个参数是direction:'top'，改参数可以设置top，或者left，如果未设置，默认是left，top。
 
@作者：姚观寿
@时间：2016-2-16 00:00:00
@联系qq:281113270,86690712;
@如果您在使用过程中发现有bug，请联系我们！谢谢。
 */
function draggingGravity(obj,json){
      var json= json||{},
 	  startAdd=json.startSpeed?json.startSpeed:5,
	  endRub=json.friction?json.friction:0.9,
	  disX=disY=iSpeedX=iSpeedY=lastX=lastY=l=t=0;
    obj.onmousedown=function(e){
		clearInterval(obj.timer);
		   var ev=ev||window.event;
 		   var disX=ev.clientX-obj.offsetLeft;
		   var disY=ev.clientY-obj.offsetTop;
		     document.onmousemove=function(e){
 			      var ev=ev||window.event;
						l=ev.clientX-disX; 
						t=ev.clientY-disY; 
						iSpeedX=l-lastX;
						iSpeedY=t-lastY;
 						lastX=l;
						lastY=t;
						e&&e.preventDefault();
						return false;
  			   }  
			  e&&e.preventDefault();
			  return false;
	}
  	 document.onmouseup=function(e){
				 document.onmousemove=null;
 				 collide(obj,startAdd,endRub,json.direction);
				  e&&e.preventDefault();
				  return false;
  				 }	 
		  
} 

function collide(obj,startAdd,endRub,direction)
{
 	 clearInterval(obj.timer);
 	 iSpeedX*=startAdd;
	 iSpeedY*=startAdd;
 	obj.timer=setInterval(function (){
  		 Math.abs(iSpeedX)>1||(iSpeedX=0);
 		 Math.abs(iSpeedY)>1||(iSpeedY=0);
		  l=obj.offsetLeft+iSpeedX;
		  t=obj.offsetTop+iSpeedY;
  		  switch(direction){
				case 'left': 
						obj.style.left=l+'px';
						if(iSpeedX==0){clearInterval(obj.timer); }
						 break;
						
				case 'top': 
				       if(iSpeedY==0){clearInterval(obj.timer); }
						obj.style.top=t+'px';break;
						
 				default : 
				    if(iSpeedY==0&&iSpeedX==0){clearInterval(obj.timer);  }
					obj.style.left=l+'px';
					obj.style.top=t+'px'; break;
			  }
   		  iSpeedX*=endRub;
		  iSpeedY*=endRub;
   	}, 30);
}