var outer=document.getElementById("outer");
var inner=document.getElementById("inner");
var aa=document.getElementById("aa");
var imgs=document.getElementById("imgs");
var x,y,n=false;
//图片切换
function imgChange(num){
    var n = num;
    outer.getElementsByTagName('img')[0].src = 'images/0'+n+'.jpg';
    aa.getElementsByTagName('img')[0].src = 'images/0'+n+'.jpg';
}
inner.onmousedown=test1;
document.onmousemove=test2;
document.onmouseup=test3;
function test1(event){
    var event=event || window.event;
    n=true;
    x=event.clientX-inner.offsetLeft;
    y=event.clientY-inner.offsetTop;
}
function test2(event){
    var event=event || window.event;
    if(n==true){
        inner.style.left=event.clientX-x+'px';
        inner.style.top=event.clientY-y+'px';
        imgs.style.left=-4*parseInt(inner.style.left)+'px';
        imgs.style.top=-4*parseInt(inner.style.top)+'px';
        if(parseInt(inner.style.left)<0){
            inner.style.left=0+'px';
        }
        if(parseInt(inner.style.top)<0){
            inner.style.top=0+'px';
        }
        if(parseInt(inner.style.left)>outer.clientWidth-inner.clientWidth){
            inner.style.left=outer.clientWidth-inner.clientWidth+'px';
        }
        if(parseInt(inner.style.top)>outer.clientHeight-inner.clientHeight){
            inner.style.top=outer.clientHeight-inner.clientHeight+'px';
        }
        if(parseInt(imgs.style.left)>0){
            imgs.style.left=0+'px';
        }
        if(parseInt(imgs.style.top)>0){
            imgs.style.top=0+'px';
        }
        if(parseInt(imgs.style.left)<-4*(outer.clientWidth-inner.clientWidth)){
            imgs.style.left=-4*parseInt(outer.clientWidth-inner.clientWidth)+"px";
        }
        if(parseInt(imgs.style.top)<-4*(outer.clientHeight-inner.clientHeight)){
            imgs.style.top=-4*parseInt(outer.clientHeight-inner.clientHeight)+"px";
        }
    }
}
function test3(){//鼠标松开时方法
    n=false;
}