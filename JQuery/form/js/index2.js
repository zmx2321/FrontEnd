
$(function(){        
    console.log("data");
    $('#send').click(function(){
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "http://10.10.10.202:8080/admin/user/login",
            data: $('#form').serialize(),  //将该表单序列化
            success: function(data){
                console.log(data);
                
            },
            error:function(request){
                console.log(request);
                // alert("异常！");
            }
        });
    });
})