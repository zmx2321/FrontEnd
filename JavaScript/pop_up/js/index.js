   var btn = document.getElementsByClassName('btn')[0];
    var content = document.getElementsByClassName('content')[0];
    var mask = document.getElementsByClassName('mask')[0];
    var close = document.getElementsByClassName('close')[0];
    btn.onclick = function () {
        mask.style.display = content.style.display = 'block';
    }
    close.onclick = function () {
        mask.style.display = content.style.display = 'none';
    }
    /*var x = 0;
     var y = 0;
     content.onmousedown = function (e) {
         var e = e || event;
         //鼠标的坐标
         var pageX = e.clientX;
         var pageY = e.clientY;
         //弹出框离可视区的top和left距离
         var pop_t = content.offsetTop;
         var pop_l = content.offsetLeft;
         x = pageX - pop_l;
         y = pageY - pop_t;
         document.onmousemove = function (e) {
             var e = e || event;
             var l = e.clientX - x;
             var t = e.clientY - y;
             //弹出框的宽高度
             /!*var pop_w = content.clientWidth;
             var pop_h = content.clientHeight;*!/
             if (l < 0) {
                 l = 0;
             } else if (l > document.documentElement.clientWidth +content.clientWidth/2) {
                 l = document.documentElement.clientWidth +content.clientWidth/2;
             }
             if (t < 0) {
                 t = 0;
             } else if (t > document.documentElement.clientHeight +content.clientHeight/2) {
                 t = document.documentElement.clientHeight +content.clientHeight/2;
             }
             content.style.left = l + 'px';
             content.style.top = t + 'px';
         }
 */

    window.onload = function () {
        content.style.cursor = 'pointer';
        content.onmousedown = function (e) {
            var event = e || event;
            content.style.cursor = 'move';
            var disX = 0;
            var disY = 0;
            disX = event.clientX - content.offsetLeft;
            disY = event.clientY - content.offsetTop;
            document.onmousemove = function (e) {
                var event = e || event;
                var disClientLeft = event.clientX - disX;
                var disClientTop = event.clientY - disY;

                //判断物体是否超过可视窗，超出让物体显示在可视窗内
                /*var w = document.documentElement.clientWidth - content.offsetWidth;
                var h = document.documentElement.clientHeight - content.offsetHeight;
                if (disClientLeft < 0) {
                    disClientLeft = 0
                } else if (disClientLeft > w) {
                    disClientLeft = w;
                }
                if (disClientTop < 0) {
                    disClientTop = 0
                } else if (disClientTop > h) {
                    disClientTop = h;
                }*/
                disClientLeft = Math.max(0,Math.min(document.documentElement.clientWidth - content.offsetWidth,disClientLeft));
                disClientTop = Math.max(0,Math.min(document.documentElement.clientHeight - content.clientHeight,disClientTop));
                content.style.left = disClientLeft + content.offsetWidth/2 + "px";
                content.style.top = disClientTop + content.clientHeight/2 + "px";
            }
            content.onmouseup = function () {
                content.style.cursor = 'pointer';
                document.onmousemove = null;
                content.onmouseup = null;
            }
            return false;
        }
    }