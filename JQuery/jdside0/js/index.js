$(function(){
    $("#Nav ul li").mouseover(function(){
        var $top = $(this).offset().top;//获取li到头部的距离
        var $height = $(this).find(".menu").height()/2;
        if($top < $height){
            $top = 0;
        }else{
            $top = -$height;
        }
        $(this).find(".menu").css("top",$top).show();
        $(this).addClass("bor");
    }).mouseout(function(){
        $(this).find(".menu").hide();
        $(this).removeClass("bor");
    })
})