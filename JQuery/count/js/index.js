var count = function(){
    $('.num_up').click(function(){
        var n = $(".num").text();
        var num = parseInt(n) + 1;
        if(num==0){
            alert("cc");
        }
        $(".num").text(num);
    });

    $('.num_down').click(function(){
        var n = $(".num").text();
        var num = parseInt(n) - 1;
        if(num==0){
            alert("不能为0!"); 
            return;
        }
        $(".num").text(num);
    }); 
}

$(function(){
    count();
});