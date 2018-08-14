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

    //显示模态窗时公用
    show: function(){
        $('.m-modal').fadeIn();  //显示遮罩层
    },

    //隐藏模态窗时公用
    hide: function(){
        $('.m-modal').fadeOut();  //隐藏遮罩层
    },

    //显示二维码
    showQRCode: function(){
        this.show();  //显示模态框
        $('#QRCodeModal').fadeIn();  //显示二维码
    },

    //隐藏二维码
    hideQRCode: function(){
        this.hide();  //显示模态框
        $('#QRCodeModal').fadeOut();  //显示二维码
    },

    /**
     * [tabAutoHeight 选项卡自适应高度]
     * @param  {[type]} list      [选项卡]
     * @param  {[type]} wrapper   [swiper-wrapper]
     * @param  {[type]} container [swiper-container]
     * @param  {[type]} list_cot  [选项卡内容]
     * @return {[type]}           [0]
     */
    tabAutoHeight: function(list, wrapper, container, list_cot){
        function tabAutoHeight(){
            list.each(function(){
                if($(this).hasClass('active')){
                    wrapper.css("height", list_cot.eq($(this).index()).css("height") + 120);
                    container.css("height", list_cot.eq($(this).index()).css("height") + 120);

                    return false;
                }
            });
        }

        setTimeout(function () { 
            tabAutoHeight();  //填充高度
        }, 30);
    },

    /**
     * swiper高度自适应
     * [mirAutoHeight swiper高度自适应]
     * @param  {[type]} i       [索引]
     * @param  {[type]} list  [选项卡按钮]
     * @param  {[type]} tabitm  [内容主体部分]
     * @param  {[type]} slide   [内容主体外部盒子]
     * @param  {[type]} swipwap [swiper盒子]
     * @param  {[type]} swipcot [swiper主体部分]
     * @return {[type]}         [description]
     */
    swpAutoHeight: function(i, list, tabitm, slide, swipwap, swipcot){
        list.removeClass('active').eq(i).addClass('active');

        var tabitm = tabitm.eq(i);

        swipwap.css("height", tabitm.height() + 15);  //swiper-wrapper高度
        swipcot.css("height", tabitm.height() + 15);  //swiper-container高度
    }
}

//二维码
var QRCode = function(){
    //显示
    $('#QRCode').click(function(){
        util.showQRCode();
    });
    
    //隐藏
    $('#Modal').click(function(){
        util.hideQRCode();
    });
}

//窗口大小改变时加载
$(window).on('resize', function(){
    util.resizeWindow();  //根据font自适应
});

//load
$(function(){
    util.resizeWindow();  //根据font自适应
    QRCode();  //二维码
});