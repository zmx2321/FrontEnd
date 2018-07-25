var i = 0;
var timer = null;
window.onload=function(){
    if(i>=5){
        i=0;
    }
    i++;//1 2 3 4 5  1 2 3 4 5   1 2 3 4 5
    var imgSrc = "images/00"+i+".jpg";
    $('ul li').css('color','#9ea0a2');
    $('img').attr('src',imgSrc);
    $('ul li:eq('+(i-1)+')').css('color','white');//$('ul li:eq('+(i-1)+')')

}
timer = setInterval(window.onload,1000);

$('ul li').hover(function(){
    clearInterval(timer);
    var $id = this.id;
    $('ul li').css('color','#9ea0a2');
    $(this).css('color','white');
    var imgUrl = 'images/00'+$id+'.jpg';
    $('img').attr('src',imgUrl);
},function(){
    i=this.id;
    timer = setInterval(window.onload,1000);
})

// var i = 0; //全局变量（局部变量）
// var timer = null; //timer 变量 代表的是定时器
// window.onload = function() {
// if (i >= 5) {
//     i = 0;
// }
// i++; //12345往复循环
// var imgsrc = "images/00" + i + ".jpg"; //引号里面 字符串 不是变脸 PHP双引号中的变量可以被解析
// $('ul li').css('color', '#9ea0a2');
// $('img').attr('src' , imgsrc);
//     // $('ul lieq(' + i(-1) + ')').css('color', 'wiite') //li index 01234
//     $('ul li:eq('+(i-1)+')').css('color','white');//$('ul li:eq('+(i-1)+')')
//     document.getElementsByClassName('li') //
// }
// timer = setInterval(window.onload, 3000);
