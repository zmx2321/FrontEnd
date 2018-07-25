   var main = document.getElementsByClassName('main')[0];
    var drag_block_bg = document.getElementsByClassName('drag-block-bg')[0];
    var drag_block = document.getElementsByClassName('drag-block')[0];
    //背景的宽度
    var bg_w = main.clientWidth;
    //滑动块的宽度
    var block_w = drag_block.clientWidth;
    var x = 0;
    var flag = false;
    drag_block.onmousedown = function (e) {
        var e = e || event;
        //鼠标的位置
        var dis_x = e.clientX - drag_block.offsetLeft;
        document.onmousemove = function (e) {
            var e = e || event;
            x = e.clientX - dis_x;
            if(x<0){
                x = 0;
            }else if(x >= bg_w - block_w){
                x = bg_w - block_w;
            }
            if(x == bg_w - block_w){
                flag = true;
                drag_block.style.backgroundImage = 'url(images/slide_ok.png)';
                drag_block.onmouseup();
            }
            drag_block_bg.style.width = x + 'px';
            drag_block_bg.style.backgroundColor = '#7ac23c';
            drag_block.style.left = x + 'px';
        }
        drag_block.onmouseup = function () {
            document.onmousemove = null;
            if(flag){
                drag_block.onmousedown = null;
                drag_block.style.left = bg_w - block_w + 'px';
            }else{
                drag_block.style.left = 0;
                drag_block_bg.style.width = 0;
            }

        }
    }