//json数据
var data = {
    "msg": [
        {
            "id" : 0,
            "cont" : "测试内容1",
        },
        {
            "id" : 1,
            "cont" : "测试内容2",
        },
        {
            "id" : 2,
            "cont" : "测试内容3",
        }
    ]
}
 // 使用 location.hash 属性来修改锚部分
 function changePart(id) {
    location.hash = id;
 }
 // 锚点改变后要执行的函数
 function myFunction(){
    var hasNum = getId();
    var _data = data.msg;
    var _item = _data[hasNum];
    render(_item);
 }
 //地址栏#id
 function getId(){
    var id = window.location.hash;
    if(id){
        return id.replace('#','');
    }else{
        return 0;
    }
 }
 // 渲染页面
function render(d){
    var val = d.id +"==="+d.cont;
    $("#demo").html(val);
}

 $(function(){
     $('body').on('click','.next-page',function(){
        var hasNum = getId();
        var _d = data.msg,
        _i = Number(hasNum)+1;
        if(_i < _d.length){

            changePart(_i);           
        }else{
            return false;
        }
    });
    $('body').on('click','.previous-page',function(){
        var hasNum = getId();
        var _d = data.msg,
        _i = Number(hasNum)-1;
        if(_i >=0 && _i < _d.length){
            changePart(_i);            
        }else{
            return false;
        }
    });

    var hasNum = getId();
    var _data = data.msg[hasNum];
    render(_data);
    // 调用hashchange
    if(window.addEventListener){
        window.addEventListener("hashchange", myFunction,false);
    }else if(window.attachEvent){
        window.attachEvent("hashchange", myFunction);
    }
 })