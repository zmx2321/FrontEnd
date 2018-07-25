window.onload = function(){  
//获取canvas元素  
    var canvas=document.getElementById('canvas');  
//获取2d绘图环境  
    var cxt=canvas.getContext('2d');  
      
//声明一个时间参数(1:1天)  
var time=0;  
  
    function draw(){  
    //清除画布（清除之前内容）  
    cxt.clearRect(0,0,1000,1000);  
    //画轨道(圆心坐标，半径，旋转角度，正向画还是逆向画)  
        //设置笔触颜色  
        cxt.strokeStyle="#fff";  
        //开始画轨道  
        cxt.beginPath();  
        cxt.arc(500,500,100,0,360,false);  
        cxt.closePath();  
        //轨道  
        cxt.stroke();  
          
    //画太阳  
        cxt.beginPath();  
        cxt.arc(500,500,20,0,360,false);  
        cxt.closePath();  
        //填充(渐变)<圆心坐标内，半径内，圆心坐标外，半径外>径向  
        var sunColor = cxt.createRadialGradient(500,500,0,500,500,20);  
        sunColor.addColorStop(0,'#f00');  
        sunColor.addColorStop(1,'#f90');  
        cxt.fillStyle=sunColor;  
        cxt.fill();  
          
    //画地球  
        cxt.save();  
        //设置异次元空间的原点  
        cxt.translate(500,500);  
        //设置旋转角度  
            //cxt.rotate(90*Math.PI/190);  
            //地球公转一周需要365天，time=1天 一天转365/360度  
        cxt.rotate(time*365/360*Math.PI/190);  
        //画出地球  
        cxt.beginPath();  
        cxt.arc(0,-100,10,0,360,false);  
        //设置地球颜色  
        var earthColor = cxt.createRadialGradient(0,-100,0,0,-100,10);  
        earthColor.addColorStop(0,'#78b1e8');  
        earthColor.addColorStop(1,'#050c12');  
        cxt.fillStyle=earthColor;  
        cxt.fill();  
        cxt.closePath();  
        cxt.restore();  
        //每画一次图像，时间参数加1  
        time+=1;  
    }  
      
    //使地球动起来  
    setInterval(draw,15);  
};  