$(function(){//window.onload()
    var con = $('#con');//document.getElementById()
    var demo = $('#demo');
    var demo1 = $('#demo1');
    demo1.html(demo.html());
    function scrollDiv(){
        if(con.scrollLeft()>demo.width()){
            con.scrollLeft(0);
        }else{
            var cLeft = con.scrollLeft()+2;
            con.scrollLeft(cLeft);
        }// i += 1 i=i+1
    }
    var marquee = setInterval(scrollDiv,100);
})