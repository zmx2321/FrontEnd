themeUtil = {

}

//nav置顶
var setnavscroll = function(){
    util.setnavscroll($('.navbar'), $('.pro_nav'), 'navfix');
}

//选项卡
var proTab = function(){
    /**
     * swiper高度自适应
     * [mirAutoHeight swiper高度自适应]
     * @param  {[type]} i       [索引]
     * @param  {[type]} mribtn  [选项卡按钮]
     * @param  {[type]} tabitm  [内容主体部分]
     * @param  {[type]} slide   [内容主体外部盒子]
     * @param  {[type]} swipwap [swiper盒子]
     * @param  {[type]} swipcot [swiper主体部分]
     * @return {[type]}         [description]
     */
    function mirAutoHeight(i, mribtn, tabitm, slide, swipwap, swipcot){
        mribtn.removeClass('active').eq(i).addClass('active');

        var tabitm = tabitm.eq(i);

        swipwap.css("height", tabitm.height());  //swiper-wrapper高度
        swipcot.css("height", tabitm.height());  //swiper-container高度
    }

    // 滑动
    var mrifoTabSwiper = new Swiper('.pro_cot', {
        onTransitionEnd: function (swiper) {
            mirAutoHeight(mrifoTabSwiper.activeIndex, $('#proTab li'), $(".pro_itm"), $(".pro_wap .swiper-slide"), 
                $(".pro_wap"), $(".pro_cot"));
        }
    })
    
    // 列表切换
    $('#proTab li').on('click', function (e) {
        mirAutoHeight($(this).index(), $('#proTab li'), $(".pro_itm"), $(".pro_wap .swiper-slide"), 
                $(".pro_wap"), $(".pro_cot"));
        mrifoTabSwiper.slideTo($(this).index(), 200, false);
    });
}

// 提交图文详情 (富文本 wangEditor)
var submitEditor = function (){
    var E = window.wangEditor
    var editor = new E('#editorToolbar', '#editorContent')
    editor.customConfig.uploadImgShowBase64 = true  // 使用 base64 保存图片  

    editor.create();

    $('#editorTextSave').click(function(){
        var content = editor.txt.html();  // 读取 html

        if(content==""){  
            alert('请把内容填写完整！');  
            return false;  
        }  
          
         $.ajax({  
            type : "post",  
            url : "/upload",  
            data : {
                "content" : content  
            },  
            success : function(res) {  
                alert('保存成功!');
                editor.txt.clear();  //清空编辑器内容
            },  
            error : function(data) {  
                alert('保存失败！');  
            }  
        }); 
    });   
}

//滚动条滚动的时候加载
$(window).scroll(function(){
    setnavscroll();  //nav置顶
});

//load
$(function(){
	submitEditor();  // 提交图文详情 (富文本 wangEditor)
    proTab();  //选项卡
});