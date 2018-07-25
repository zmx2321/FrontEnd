window.onload = function() {
    var outer = document.getElementById("outer");
    var inner = document.getElementById("inner");
    var imgs = document.getElementById("imgs");
    var x, y, n = false;
    inner.onmousedown = test1;
    //如果把inner改为document,鼠标在窗口任意位置点击，图片都会跟随
    document.onmousemove = test2;
    //document如果改为outer,鼠标在outer内才起作用
    document.onmouseup = test3;
    function test1(event) {
        //鼠标按下时方法
        var event = event || window.event;
        //调试兼容,各个浏览器认识event有差别.
        //var event=event;
        n = true;
        //当n=true（n的值可随便设定）时，假定为鼠标按下的事件
        x = event.clientX - inner.offsetLeft;
        //鼠标在透明层的相对横坐标=鼠标坐标-方块左边距
        y = event.clientY - inner.offsetTop;
        //鼠标在透明层的相对纵坐标=鼠标坐标-方块上边距
    }
    function test2(event) {
        //鼠标移动时方法
        var event = event || window.event;
        if (n == true) {
            //鼠标移动范围 
            inner.style.left = event.clientX - x + "px";
            inner.style.top = event.clientY - y + "px";
            //图片移动范围 
            imgs.style.left = -4 * parseInt(inner.style.left) + "px";
            imgs.style.top = -4 * parseInt(inner.style.top) + "px";
            //限定鼠标移动的范围 
            if (parseInt(inner.style.left) < 0) {
                inner.style.left = 0 + "px";
            }
            if (parseInt(inner.style.top) < 0) {
                inner.style.top = 0 + "px";
            }
            if (parseInt(inner.style.left) > outer.clientWidth - inner.clientWidth) {
                inner.style.left = outer.clientWidth - inner.clientWidth + "px";
            }
            if (parseInt(inner.style.top) > outer.clientHeight - inner.clientHeight) {
                inner.style.top = outer.clientHeight - inner.clientHeight + "px";
            }
            //限定图片移动的范围 
            if (parseInt(imgs.style.left) > 0) {
                imgs.style.left = 0 + "px";
            }
            if (parseInt(imgs.style.top) > 0) {
                imgs.style.top = 0 + "px";
            }
            if (parseInt(imgs.style.left) < -4 * (outer.clientWidth - inner.clientWidth)) {
                imgs.style.left = -4 * parseInt(outer.clientWidth - inner.clientWidth) + "px";
            }
            if (parseInt(imgs.style.top) < -4 * (outer.clientHeight - inner.clientHeight)) {
                imgs.style.top = -4 * parseInt(outer.clientHeight - inner.clientHeight) + "px";
            }
        }
    }
    function test3() {
        //鼠标松开时方法
        n = false;
    }
}

