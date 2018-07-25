var isdrag=false;   
var tx,x,ty,y;    
$(function(){   
    document.getElementById("moveid").addEventListener('touchstart',touchStart);  
    document.getElementById("moveid").addEventListener('touchmove',touchMove);
    document.getElementById("moveid").addEventListener('touchend',function(){  
        isdrag = false;  
    }); 
});
function touchStart(e){   
   isdrag = true; 
   e.preventDefault();
   tx = parseInt($("#moveid").css('left'));    
   ty = parseInt($("#moveid").css('top'));  
   x = e.touches[0].pageX;
   y = e.touches[0].pageY;  
}   
function touchMove(e){   
  if (isdrag){
   e.preventDefault();
       var n = tx + e.touches[0].pageX - x;
       var h = ty + e.touches[0].pageY - y;   
       $("#moveid").css("left",n); 
       $("#moveid").css("top",h);    
   }  
}    