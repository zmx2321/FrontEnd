/*
@插件功能：抛郑碰撞运动+重力运动
@draggingGravity(obj) 只需要传递一个obj进去即可使用
@作者：姚观寿
@时间：2016-2-16 22:54
@联系qq,281113270，86690712。
@如果您在使用过程中有发现bug，可以联系我们，谢谢！
 */
function draggingGravity(obj){
	  var disX=disY=iSpeedX=iSpeedY=lastX=lastY=l=t=0,
			maxHieght=document.documentElement.clientHeight-obj.offsetHeight,
			maxWidth=document.documentElement.clientWidth-obj.offsetWidth,
			//判断是否为火狐浏览器
			 isFirefox=navigator.userAgent.indexOf("Firefox")<0;
			 isFirefox||(maxHieght=maxHieght-4);
			 
  	 window.onresize=function(){
 		       maxHieght=document.documentElement.clientHeight-obj.offsetHeight;
	           maxWidth=document.documentElement.clientWidth-obj.offsetWidth;
			   isFirefox||(maxHieght=maxHieght-4);
 			   collide(obj,maxHieght,maxWidth);
 			 }
		
		  
		 
   	obj.onmousedown=function(e){
		clearInterval(obj.timer);
		   var ev=e||window.event;
 		         disX=ev.clientX-obj.offsetLeft;
		         disY=ev.clientY-obj.offsetTop;
		     document.onmousemove=function(e){
 			      var ev=e||window.event;
					l=ev.clientX-disX; 
					t=ev.clientY-disY; 
 					t<=maxHieght||(t=maxHieght);	
					t>0||(t=0);
					l<maxWidth||(l=maxWidth);	
					l>0||(l=0);
					obj.style.left=l+'px';
					obj.style.top=t+'px';
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
 				  collide(obj,maxHieght,maxWidth);
				  e&&e.preventDefault();
				  return false;
  				 }	 
    } 

function  collide(obj,maxHieght,maxWidth)
{
	 clearInterval(obj.timer);
	obj.timer=setInterval(function (){
						iSpeedY+=3;
						l=obj.offsetLeft+iSpeedX;
						t=obj.offsetTop+iSpeedY;
						
						t<=maxHieght||(iSpeedY*=-0.85,iSpeedX*=0.85,t=maxHieght);
						t>0||(iSpeedY*=-1,iSpeedX*=0.85,t=0);
 			 
			            l<=maxWidth||(iSpeedX*=-0.85,iSpeedY*=0.97,l=maxWidth);
						l>0||(iSpeedX*=-0.85,iSpeedY*=0.97,l=0);
						 
						 Math.abs(iSpeedX)>1||(iSpeedX=0);
						 Math.abs(iSpeedY)>1||(iSpeedY=0);
						if(iSpeedY==0&&iSpeedX==0&&t==maxHieght)
						  {
							  clearInterval(obj.timer);
							  }
						 obj.style.left=l+'px';
						 obj.style.top=t+'px';
  	}, 30);
}
 