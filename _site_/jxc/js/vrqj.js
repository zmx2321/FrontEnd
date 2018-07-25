function tip(){
        //分享
    $('.fenxiang').click(function(){
        $('.mask').fadeIn();
        $('.share_btn').fadeIn();
    });

    $('.share_btn_foot button').click(function(){
        $('.mask').fadeOut();
        $('.share_btn').fadeOut();
    });

        //收藏
    $('.shoucang').toggle(
        function(){
            $(this).find('img').attr("src", "images/btn-sc-xz.png");
        },
        function(){
            $(this).find('img').attr("src", "images/icon-sjzy-sc-wxz.png");
        }
    );
}

//Iframe高度自适应
function IframeHeight(){
	var IframeHeight = function(){
		var Iframe = $('#Iframe'),
	    	btnHeight = $('.busntail_btn').height(),
			winHeight = $(window).height();

	        Iframe.css('height', winHeight - btnHeight );
	    
	}

	$.getScript("js/basefont.js", function(){
	  IframeHeight();
	});

	$(window).resize(function() {
	    IframeHeight();
	});
}


$(function(){
	IframeHeight();
	tip();
});
