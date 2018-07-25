jQuery.fn.tabSwitch = function(params) {  
    var p = params || {  
        tab: "cartTab li",  
        tabClass: "current",  
        tabFrame: "tabs_content"  
    };  
    var _btnTab = $("#" + p.tab);  
    var tabClass = p.tabClass;  
  
    var _tabFrame = $("." + p.tabFrame);  
    var intervalID;  
    var curLi;  
  
    _btnTab.mouseenter(function(){  
        curLi=$(this);  
        intervalID=setInterval(onMouseOver,150);//鼠标移入的时候有一定的延时才会切换到所在项，防止用户不经意的操作  
    }).mouseleave(function(){  
        clearInterval(intervalID);  
    });  
  
    function onMouseOver(){  
        _tabFrame.hide();  
        _tabFrame.eq(_btnTab.index(curLi)).show();  
  
        _btnTab.removeClass(tabClass);  
        curLi.addClass(tabClass);  
    }  
};


$("#redemptionPromotionList").tabSwitch({  
      tab: "cartTab li",  
      tabClass: "current",  
      tabFrame: "tabs_content"  
});