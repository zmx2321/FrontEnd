/* 代码整理：懒人之家 www.lanrenzhijia.com */
$.fn.join_qh = function(can){
	can = $.extend({
		box:null,
		num1:null,//记录当前屏数
		num2:null,//记录鼠标滚轮延时执行
		objDiv:null,//在这个区域内，浏览器滚动条失效
		pic_num:null,//当前显示图片数量(li个数)
		time:null//切换一屏时间
	}, can || {});
	
	$(can.num1).val(0);
	$(can.num2).val(0);
	var sig = $(can.box).find('ul li').innerWidth();
	var num_sum =  $(can.box).find('ul li').length;
	$(can.box).find('ul').width(sig*num_sum);
	$(can.box).mousewheel(function(event, delta) {
		var aaaa=$(can.num2).val();
		if (aaaa == 1){
			return;	
		}
	join_gun(delta);
	});

function join_gun(a){
	var z =$(can.num1).val();
    b = parseInt(z);
	c = Math.ceil(num_sum/can.pic_num);
	if(a<0){
		if(-b==c-1){
			return;
		}
		b-=1;
		$(can.num2).val(1);
	}else if(a>0){
		if(-b==0){
			return;
		}
		b+=1;
		$(can.num2).val(1);
	}
	$(can.num1).val(b);
	var single_w = sig*can.pic_num;
	move_w =single_w*b;
	$(can.box).find('ul').animate({'left': move_w},can.time);
	
	setTimeout(function(){
	$(can.num2).val(0);
	},1400);
	
}
//禁止鼠标滚轮事件对于浏览器滚动条的滚动
var scrollFunc=function(e){
    e=e||window.event;
   if (e&&e.preventDefault){ 
        e.preventDefault();
        e.stopPropagation();
    }else{ 
     e.returnvalue=false;  
     return false;     
    }
}
var obj=document.getElementById(can.objDiv);
if(obj.addEventListener&&!window.opera)
obj.addEventListener('DOMMouseScroll',scrollFunc,false);
else
obj.onmousewheel=scrollFunc;


}
/* 代码整理：懒人之家 www.lanrenzhijia.com */
/*生成换行
for(i=0; i<65;i++)
{$('body').append('<br>')}
*/