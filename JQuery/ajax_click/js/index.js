$(function(){
    //ajax加载
    $('.btn').click(function(){
        $.ajax({
            url: "json/test.json",
            type: "get",
            dataType: "json",
            success: function(data, status){
                console.log(data);

                var str = '';

                str += "<button class='testbtn'>ajax加载</button>"
                $('.box').html(str);
            }
        });
    });

    //在加载之后进行点击（事件委托）
    $('body').on('click' , '.testbtn' , function(){
         alert("在加载之后进行点击（事件委托）");
    });
});