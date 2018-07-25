$(function(){
    //mock
    var thisApi = {
        //提交
        submit: {
            dev: "mock/submit.json",
            product: "",
        },
    };
    bMock.setFace(thisApi);
    bMock.setEnv("dev");
    //console.log(bMock.getFace("submit"));
});

//提交绑定手机号
var submitBindphoneInfo = function(){
    var bid_phone = $('input[name=bid_phone]'),
        bid_identcode = $('input[name=bid_identcode]');

    $('.mymess_button').click(function(){
        // 验证手机号码
        if(bid_phone.val().search(/^1[3|5|7|8|][0-9]{9}$/)){
            console.log("电话格式不对");
        } else if(bid_identcode.val() == ""){
            $(".test_bubble").fadeIn('slow').delay(500).fadeOut('slow');
        } else {
            bind_info = [
                {
                    bid_phone: bid_phone.val(),
                    bid_identcode: bid_identcode.val(),
                }
            ];

            $.ajax({
                url: bMock.getFace("submit"),
                type:"post",
                data: JSON.stringify(bind_info),
                dataType:"json", 
                success:function(data,status){
                    console.log(bind_info[0]);
                },
                error: function () {
                    console.log("false");
                }
            });
        }

    });
}


$(function(){
    submitBindphoneInfo();  //提交绑定手机号
});