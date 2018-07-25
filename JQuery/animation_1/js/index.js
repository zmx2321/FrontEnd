            $(function(){
                init();
                var flag = true;
                //鼠标移到球上，两边的球闪开，移除，合拢
                $('.ball').on({
                    mouseover:function(){
                        var show_ele_arr = [];
                        $.each($('.ball:lt(8)'),function(i){
                            var show_ball = $(this).css('display');
                            if(show_ball != 'none'){
                                show_ele_arr.push(parseInt($(this).index()));
                            }
                        });
                        //console.log(show_ele_arr)
                        var hover_arr = [];
                        var index = parseInt($(this).index());
                        for(var i=0;i<show_ele_arr.length;i++){
                            if(index == show_ele_arr[i]){
                                hover_arr.push(show_ele_arr[i-1],show_ele_arr[i+1]);
                            }
                        }
                        //console.log(hover_arr)
                        if(hover_arr[0] == undefined){
                            $('.ball').eq(hover_arr[1]).find('.chang_box').css('margin-left','5px');
                        }else if(hover_arr[1] == undefined){
                            $('.ball').eq(hover_arr[0]).find('.chang_box').css('margin-right','5px');
                        }else{
                            $('.ball').eq(hover_arr[0]).find('.chang_box').css('margin-right','5px');
                            $('.ball').eq(hover_arr[1]).find('.chang_box').css('margin-left','5px');
                        }
                    },
                    mouseout:function(){
                        $('.ball .chang_box').each(function(){
                            $(this).css({
                                'margin-left':0,
                                'margin-right':0
                            });
                        });
                    }
                });
                //完成和更多的操作
                $('#btn').click(function(){
                    if(flag){
                        $(this).text('完成');
                        $('.point').each(function(){
                            $(this).css('display','inline-block');
                        });
                        
                        var show_ele_arr = [];
                        $.each($('.ball'),function(i){
                            var show_ball = $(this).css('display');
                            if(show_ball != 'none'){
                                show_ele_arr.push($(this));
                            }
                            for(var i=0;i<show_ele_arr.length-1;i++){
                                show_ele_arr[i].find('.point').addClass('active');
                            }
                            $(this).css({'display':'block','left':0});
                            init();
                        }); 
                        
                        flag = false;
                    }else{
                        $(this).text('更多');
                        $('.point').each(function(){
                            $(this).css('display','none');
                        });
                        var hide_ele_arr = [];
                        $.each($('.ball:lt(7)'),function(i){
                            var rep_show = $(this).find('.point').hasClass('active');
                            if(!rep_show){
                                hide_ele_arr.push($(this));
                            }
                            for(var i=0;i<hide_ele_arr.length;i++){
                                hide_ele_arr[i].css('display','none');
                                init();
                            }
                        }); 
                        
                        flag = true;
                    }
                });
                $('.ball:lt(7)').click(function(){
                    if($(this).find('.point').hasClass('active')){
                        $(this).find('.point').removeClass('active');
                        flag_checked = true;
                    }else{
                        $(this).find('.point').addClass('active');
                        flag_checked = false;
                    }
                    if(flag){
                        var txt = $(this).find('.chang_box').text();
                        $('#sum').text(txt);
                        $('#move_sum').text(txt).show();
                        $('#move_sum').animate({
                            top:'-55px'
                        },500,function(){
                            $('#move_sum').hide().css({
                                top:'-25px'});
                        });
                    }
                    
                });
            });
                
                
                
        function init(){
            var show_left_arr = [0,90,180,270,360,450,540,630,720];
            var show_ele_arr = [];
            $.each($('.ball'),function(i){
                var show_ball = $(this).css('display');
                if(show_ball != 'none'){
                    show_ele_arr.push($(this));
                }
            });
                
            for(var i=0;i<show_ele_arr.length;i++){
                show_ele_arr[i].css('left',show_left_arr[i]+'px');
            }
        }