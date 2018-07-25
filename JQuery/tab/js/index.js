;(function($){
    $.fn.tab = function(options){
        var defaults = {
            currentClass:'current',
            tabNav:'.tabNav>li',
            tabContent:'.tabContent>div',
            evenType:'click',
        }

        var options = $.extend(defaults,options);

        this.each(function(){
            var _this = $(this);
            $(this).find(defaults.tabNav).bind(options.evenType,function(){
                $(this).addClass(options.currentClass).siblings().removeClass(options.currentClass);
                var index = $(this).index();
                _this.find(options.tabContent).eq(index).show().siblings().hide();
            });
        });
    }
})(jQuery);


$(function(){
    $('.tab').tab();
});


/*//jquery官方模板
//把函数全部封装在闭包里
;(function( $ ){    //分号避免一些不必要的麻烦
    $.fn.plugin = function(options){ //我们要传进来的参数
        var defaults = {    //对象
            //各种参数，各种属性
        }

        var options = $.extend(defaults,options);
        //把我们定义的defaults对象合并到options这个参数上

        this.each(function(){
           //实现功能的代码
        });
    }
})(jQuery);

$(function(){
    $('').plugin();
});*/