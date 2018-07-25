$(function(){  
    var defaultTabId="";  
    $(".tab").on("click",".tab-option",function(){  
        var dataTabId=$(this).attr("data-tab-id");  
        $(".tab").find(".tab-option").removeClass("selected");  
        $(this).addClass("selected");  
        $('.tab-content').removeClass("show");  
        $('.tab-content[data-tab-id='+dataTabId+']').addClass("show");  
        history.replaceState({selectedTab:dataTabId},"","#tab="+dataTabId);  
    });  
    if(location.hash){  
        defaultTabId=location.hash.substr(1).split("=")[1];  
        $(".tab").find(".tab-option").removeClass("selected");  
        $('.tab-option[data-tab-id='+defaultTabId+']').addClass("selected");  
        $('.tab-content').removeClass("show");  
        $('.tab-content[data-tab-id='+defaultTabId+']').addClass("show");  
    }  
});  	