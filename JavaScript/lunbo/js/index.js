window.onload = function(){
    /*var items = document.querySelectorAll(".slider-item");*/
    var items = document.getElementsByClassName("slider-item");
    for(var i = 0;i<items.length;i++){
        var item = items[i];
        item.style["left"] = item.offsetWidth*i+'px';
        item.style["transitionDelay"] = .3*i+'s';
        var sub = item.children;
        for(var j = 0;j<sub.length;j++){
            var img = sub[j];
            img.style["backgroundPosition"] = -item.offsetWidth*i+'px';
        }
    }
    var num = 0;
    document.getElementById('prev').addEventListener("click",function(){
        var rotate = ++num*90;
        for(var i = 0;i<items.length;i++){
            items[i].style["transform"] = "rotateX("+rotate+"deg)";
        }
    })
    document.getElementById('next').addEventListener("click",function(){
        var rotate = --num*90;
        for(var i = 0;i<items.length;i++){
            items[i].style["transform"] = "rotateX("+rotate+"deg)";
        }
    })
}