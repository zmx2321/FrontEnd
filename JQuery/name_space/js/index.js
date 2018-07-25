var namespace = {
    int: function() {
        this.hide.hideFun();
        this.show.showFun();
        this.tab.tabFun();
    }
};
namespace.hide = {
    hideBtn: $('#div1'),
    hideFun: function() {
        var that = this;
        var a = this.hideBtn;
        a.click(function() {
            $(this).hide();
        });
    }
};
namespace.show = {
    showBtn: $('#div2'),
    showBox: $('#div3'),
    showFun: function() {
        var that = this;
        var a = this.showBtn;
        var b = this.showBox;
        a.click(function(event) {
            b.show();
        });
    }
}
namespace.tab = {
    tabBtn: $('.tab_nav li'),
    tabCon: $('.tab_main div'),
    tabFun: function() {
        var that = this;
        var a = this.tabBtn;
        var b = this.tabCon;
        a.click(function() {
            $(this).addClass('active').siblings().removeClass('active');
            b.eq($(this).index()).show().siblings().hide();
        });
    }
}
namespace.int();