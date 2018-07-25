$(function(){
    var pageArray = [];

    var liCount = $('li').length;//获取获取记录条数
    var PageSize  = 10;//设置每页，你准备显示几条
    var PageCount  = Math.ceil(liCount/PageSize);//计算出总共页数
    var currentPage = 1;//设置当前页
    
    var i=0;
    for(i=1; i<=PageCount; i++){
        $('<a href="#" pageNum="'+i+'" >第'+i+'页</a>').appendTo('#pageIt');//显示分页按钮
    }
    
    var $li =  $('li');
    $li.each(function(){
        pageArray.push(this);
    });
    
    for(i=0;i<10;i++){
        $('#pagingList').append(pageArray[i]);
    }
    
    function showPage(whichPage){
        $('#pagingList').html('');
        for(i = (whichPage-1)*10; i < 10*whichPage ; i++){
            $('#pagingList').append(pageArray[i]);
        }
    }
    var a;
    $('a').click(function(){
        a = $(this).attr('pagenum');
        showPage(a);
    })
    
    // debugger;
});