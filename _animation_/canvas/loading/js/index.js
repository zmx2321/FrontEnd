var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var img = document.getElementById("fire");
var num = 9;
//圆环进度显示数，此例是“90%”
var _num = (num * 2 / 10);
//旋转角度占比
var circleProgress = {
    staticDraw: function() {
        this.innerCircle();
        this.centerBgCircle();
    },
    dynamicDraw: function(rotate) {
        this.centerCircle(rotate);
        this.outerCircle(rotate);
        this.fireMove(rotate);
    },
    //内环
    innerCircle: function() {
        ctx.font = "60px Arial";
        ctx.fillStyle = '#f30';
        ctx.fillText(num + '0%', 200, 270);
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#f2f2f2';
        ctx.beginPath();
        ctx.arc(250, 250, 150, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
    },
    //中层背景环
    centerBgCircle: function() {
        ctx.strokeStyle = '#f2f2f2';
        ctx.lineWidth = 18;
        ctx.beginPath();
        ctx.arc(250, 250, 185, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
    },
    //中层环
    centerCircle: function(rotate) {
        ctx.save();
        //保存当前的状态
        //背景为渐变色
        var ctx_lineGrad = ctx.createLinearGradient(250, 0, 250, 500);
        ctx_lineGrad.addColorStop(0, '#fd0');
        ctx_lineGrad.addColorStop(1, '#fc7d37');
        ctx.strokeStyle = ctx_lineGrad;
        ctx.lineCap = "round";
        //线的两端是半圆形
        ctx.lineWidth = 18;
        ctx.beginPath();
        if (num == 10) {
            ctx.arc(250, 250, 185, 1.5 * Math.PI, (rotate - 0.5000001) * Math.PI);
            //整圆
        } else {
            ctx.arc(250, 250, 185, 1.5 * Math.PI, (rotate - 0.5) * Math.PI);
            //圆弧
        }

        ctx.stroke();
        //恢复之前的状态
    },
    //最外环
    outerCircle: function(rotate) {
        ctx.save();
        var ctx_lineGrad = ctx.createLinearGradient(250, 40, 250, 250);
        ctx_lineGrad.addColorStop(0, '#fffaf7');
        ctx_lineGrad.addColorStop(1, '#ffd2b0');
        ctx.strokeStyle = ctx_lineGrad;
        ctx.lineCap = "round";
        ctx.lineWidth = 6;
        ctx.beginPath();
        if (num == 10) {
            ctx.arc(250, 250, 230, 1.5 * Math.PI, (rotate - 0.5000001) * Math.PI);
        } else {
            ctx.arc(250, 250, 230, 1.5 * Math.PI, (rotate - 0.5) * Math.PI);
        }
        ctx.stroke();
        ctx.restore();
    },
    //火箭
    fireMove: function(rotate) {
        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate(rotate * Math.PI);
        ctx.translate(-250, -250);
        /*canvas的宽度/2-img的宽度/2 = 205*/
        ctx.drawImage(img, 205, 0);
        ctx.restore();
    }
};

circleProgress.staticDraw();
run();
function run() {
    circleProgress.dynamicDraw();
    var index = 0;
    var timer = setInterval(function() {
        ctx.clearRect(0, 0, 500, 500);
        //清空
        circleProgress.staticDraw();
        if (index < _num) {
            index += 0.1;
            circleProgress.dynamicDraw(index);
        } else {
            circleProgress.dynamicDraw(_num);
            clearInterval(timer);
        }
    }, 70);
}
function btnRun() {
    var btn = document.getElementById('btn');
    btn.disabled = true;
    setTimeout(function() {
        btn.disabled = false;
    }, 1000);

    run();
}
