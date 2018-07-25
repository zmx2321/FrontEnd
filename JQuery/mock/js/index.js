$(function(){
    //mock
    var thisApi = {
        //demo1
        demo1: {
            dev: "mock/demo1.json",
            product: "",
        },
        //demo2
        demo2: {
            dev: "mock/demo2.json",
            product: "",
        },
        //demo3
        demo3: {
            dev: "mock/demo3.json",
            product: "",
        },
        //demo4
        demo4: {
            dev: "mock/demo4.json",
            product: "",
        },
    };
    bMock.setFace(thisApi);
    bMock.setEnv("dev");
    console.log(bMock.getFace("demo1"));
});

$(function(){
    $.ajax({
        url: bMock.getFace("demo1"),
        type:"get",
        dataType:"json",
        success:function(data,status){
            console.log(data);
        },
        error: function () {
            console.log("false");
        }
    });

    $.ajax({
        url: bMock.getFace("demo2"),
        type:"get",
        dataType:"json",
        success:function(data,status){
            console.log(data);
        },
        error: function () {
            console.log("false");
        }
    });

    $.ajax({
        url: bMock.getFace("demo3"),
        type:"get",
        dataType:"json",
        success:function(data,status){
            console.log(data);
        },
        error: function () {
            console.log("false");
        }
    });

    $.ajax({
        url: bMock.getFace("demo4"),
        type:"get",
        dataType:"json",
        success:function(data,status){
            console.log(data);
        },
        error: function () {
            console.log("false");
        }
    });
});