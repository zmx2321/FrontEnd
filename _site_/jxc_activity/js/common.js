/**
 * @fileoverview A page of edit
 * author zmx2321@163.com
 * data 2018/7/6
 */

//工具方法
var util = {
    /**
     * [resizeWindow 根据font自适应]
     * @return 0
     */
    resizeWindow: function(){
        var cHeight = $(document.body)[0].clientWidth;
        var windowHeight = cHeight / 7.5 + "px";
        $('html').css('fontSize', windowHeight);
    },

    tipInfo: function(str){
        var cont = "<span class='bubble f-dn l-bdru f-ptr2 f-fs1'>" + str +"</span>";

        $('body').append(cont);

        $(".bubble").fadeIn('slow').delay(200).fadeOut('slow');
    },
}

//窗口大小改变时加载
$(window).on('resize', function(){
    util.resizeWindow();  //根据font自适应
});

//load
$(function(){
    util.resizeWindow();  //根据font自适应
});