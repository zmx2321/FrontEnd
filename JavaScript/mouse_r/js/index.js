window.onload = function() {
    var forRight = document.getElementById("testRight");
    //获取对象，现在太熟悉了 
    forRight.style.display = "none";
    var title = forRight.getElementsByTagName("li");

    for (var i = 0; i < title.length; i++) {
        title[i].onmouseover = function() {
            this.classname = "active";
            //其实这里我们也可以调用其他事件吧 
        };
        
        title[i].onmouseout = function() {
            //这里也是鼠标的两个事件吧 
            this.classname = "";
        };
        
    }

    document.oncontextmenu = function(event) {
        //这是实现的关键点 
        var event = event || window.event;
        //这个都不是问题了吧 
        forRight.style.display = "block";
        forRight.style.left = event.clientX + "px";
        forRight.style.top = event.clientY + "px";
        //鼠标的坐标啊 
        return false;
        //这里返回false就是为了屏蔽默认事件 
    };
    
    document.onclick = function() {
        //就是为了更形象的模仿啊 
        forRight.style.display = "none";
    };
    
};

/*document.oncontextmenu=function(){ 
  return false; 
}*/