$(function(){
    //mock
    var thisApi = {
        //页面标签信息
        txtEvaluate: {
            dev: "mock/txtEvaluate.json",
            product: "",
        },
        //提交
        submit: {
            dev: "mock/submit.json",
            product: "",
        },
    };
    bMock.setFace(thisApi);
    bMock.setEnv("dev");
    // console.log(bMock.getFace("aa"));
});

//星星评价
var starEvaluate = function(){
    //获取星星评价
    $.fn.raty.defaults.path = 'images';

    //老师授课态度
    $('.total_points').raty({
        click: function(score, evt) {
            eval_score = $(this).find("input").val();

            localStorage.setItem("eval_score", eval_score);

            submitEvaluationInfo();

            // console.log(eval_score);
        },
        score: function() {
            return $(this).attr('data-score');
        }
    });
}

//点评
var txtEvaluate = function(){
    $.ajax({
        url: bMock.getFace("txtEvaluate"),
        type:"get",
        dataType:"json", 
        success:function(data,status){

            var src = '',
                txt_evaluate = data.lab;
                
            for(var i=0; i<txt_evaluate.length; i++){
                src += "<dd><span>" + txt_evaluate[i] + "</span></dd>";
            }

            $('#txt_evaluate').html(src);

            //选择标签
            $('#txt_evaluate dd').click(function(){
                $(this).addClass('active').siblings().removeClass('active');

                var txtEvaluate = $(this).find('span').html();

                localStorage.setItem("txtEvaluate", txtEvaluate);

                submitEvaluationInfo();

                // console.log(txtEvaluate);
            });
        },
        error: function () {
            console.log("false");
        }
    });
}

//匿名评价
var anonymousEvaluate = function(){
    var anony = false;

    $("input[name='anonymous']").click(function(){
        if($(this).prop("checked")){
            $(this).parent().find('b').addClass('active');
            anony = true;   //匿名

            localStorage.setItem("anony", anony);

            submitEvaluationInfo();

            // console.log(anony);
        } else {
            $(this).parent().find('b').removeClass('active');
            anony = false;   //不匿名

            localStorage.setItem("anony", anony);

            submitEvaluationInfo();

            // console.log(anony);
        }
    });
}

//提交评价信息
var submitEvaluationInfo = function(){
    var eval_score = localStorage.getItem("eval_score"),
        txtEvaluate = localStorage.getItem("txtEvaluate"),
        anony = localStorage.getItem("anony");


    if(eval_score == null){
        eval_score = $('.total_points').raty('score');
    }

    if(anony == null){
        anony = false;
    }

    var eval_info = [
        {
            eval_score: eval_score,  //分数
            txtEvaluate: txtEvaluate,  //分数
            anony: anony,  //分数
        }
    ];

    // console.log(eval_info[0]);

    $('#eval_btn').click(function(){
        if (txtEvaluate == null) {
            console.log("评价内容不得为空");
        } else {
            $.ajax({
                url: bMock.getFace("submit"),
                type:"post",
                data: JSON.stringify(eval_info),
                dataType:"json", 
                success:function(data,status){
                    console.log(data);

                    console.log(eval_info);

                    localStorage.clear();
                },
                error: function () {
                    console.log("false");
                }
            });
        }
    });
}

$(function(){
    starEvaluate(); //星星评价
    txtEvaluate();  //点评
    anonymousEvaluate();  //匿名评价

    submitEvaluationInfo(); //提交评价信息
});