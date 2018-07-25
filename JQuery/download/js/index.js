$(document).ready(function(){  
        var range = 50;             //距下边界长度/单位px  
        var elemt = 500;           //插入元素高度/单位px  
        var maxnum = 20;            //设置加载最多次数  
        var num = 1;  
        var totalheight = 0;   
        var main = $("#content");                     //主体元素  
        $(window).scroll(function(){  
            var srollPos = $(window).scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)  
              
            //console.log("滚动条到顶部的垂直高度: "+$(document).scrollTop());  
            //console.log("页面的文档高度 ："+$(document).height());  
            //console.log('浏览器的高度：'+$(window).height());  
              
            totalheight = parseFloat($(window).height()) + parseFloat(srollPos);  
            if(($(document).height()-range) <= totalheight  && num != maxnum) {  
                main.append("<div style='border:1px solid tomato;margin-top:20px;color:#ac"+(num%20)+(num%20)+";height:"+elemt+"' >hello world"+srollPos+"---"+num+"</div>");  
                num++;  
            }  
        });  
    });  













/*var str = '';
if(page=="") page=1; 
var stop=true;//触发开关，防止多次调用事件 
$(window).scroll( function(event){
//当内容滚动到底部时加载新的内容 100当距离最底部100个像素时开始加载. 
if ($(this).scrollTop() + $(window).height() + 10 >= $(document).height() && $(this).scrollTop() > 10) {
//if(stop==true){ 
//stop=false; 
//var canshu="page/"+page+"; 
var url = "";
var parm = {'page':page};
page=page+1;//当前要加载的页码 
//加载提示信息 
$("#showlists").append("<li class='ajaxtips'><div style='font-size:2em'>Loding…..</div><>");
$.post(url,parm,function(data){
if( data.count == 0 ) {
$('.prolist-abtn').html('已全部加载完');
return;
} 
$.each(eval(data), function(data, val) {
var url1 = "";
$(".ajaxtips").hide();
str = '<div class="content" id="showdiv">';
str +='<div class="cont clearfix">';
str +='<a href="url"><div class="cont_img fl">';
str +='<img src='+val.imgurl+' alt="" /></div>';
str += '<div class="cont_list fl"><p>'+val.sceneryname+'</p><ul class="cont_list fl">';
str += '<li class="cont_list2"><span>￥</span>';
str +='<strong>'+val.sellerprice+'</strong>起<i>￥'+val.sellerprice+'</i></li>';
str +='</ul></div></a></div></div>';
$("#showdiv").append(str);//把新的内容加载到内容的后面 
}); 
stop=true; 
},'JSON') 
} 
});*/





/*$(function() {
  var page = 1;
  var discount = $('#discount');
  var innerHeight = window.innerHeight;
  var timer2 = null;
  $.ajax({
    url: '/lightapp/marketing/verify/apply/list?page=1',
    type: 'GET',
    dataType: 'json',
    timeout: '1000',
    cache: 'false',
    success: function (data) {
        if (data.error_code === 0) {
          var arrText = [];
          for (var i = 0, t; t = data.list[i++];) {
            arrText.push('<div class="consume-whole">');
            arrText.push('<h3>' + t.title + '</h3>');
            if (t.coupon_type == 1 ) {
              arrText.push('<p>金额：￥' + t.amount + '</p>');
            } else {
              arrText.push('<p>优惠：' + t.amount + '</p>');
            }
            arrText.push('<p><span class="hx-user">用户：s账户飒飒是是是啊啊12' + t.user_name +'</span>' + '<span>核销时间：' + t.use_time + '</span></p>');
            arrText.push('</div>');
          }
          discount.html(arrText.join(''));
        };
        var ajax_getting = false;　
        $(window).scroll(function() {
          clearTimeout(timer2);
          timer2 = setTimeout(function() {
            var scrollTop = $(document.body).scrollTop();　　
            var scrollHeight = $('body').height();　　
            var windowHeight = innerHeight;
            var scrollWhole = Math.max(scrollHeight - scrollTop - windowHeight);
            if (scrollWhole < 100) {
              if (ajax_getting) {
                return false;
              } else {
                ajax_getting = true;
              }
              discount.append('<div class="load"><img src="/lightapp/static/zhida-yunying/img/load.gif" width="6%" /></div>');
              $('html,body').scrollTop($(window).height() + $(document).height());
              page++;
              $.ajax({
                url: '/lightapp/marketing/verify/apply/list?page=' + page,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                  if (data.error_code === 0) {
                    var arrText = [];
                    for (var i = 0, t; t = data.list[i++];) {
                      arrText.push('<div class="consume-whole"><a href="/lightapp/marketing/verify/page/info?rule_id=' + t.rule_id + '&coupon_id='+ t.coupon_id +'">');
                      arrText.push('<h3>' + t.title + '</h3>');
                      if (t.coupon_type == 1 ) {
                         arrText.push('<p>金额：￥' + t.amount + '</p>');
                      } else {
                        arrText.push('<p>优惠：' + t.amount + '</p>');
                      };
                      arrText.push('<p><span class="hx-user">用户：账户飒111111111' + t.user_name +'</span>' + '<span>核销时间：' + t.use_time + '</span></p>');
                      arrText.push('</a></div>');
                    }
                    discount.append(arrText.join(''));
                    $(".load").remove();
                  } else {
                    $(".load").remove();
                    discount.append('<div class="no-data">没有更多数据。</div>');
                    $(window).unbind('scroll');
                  };
                  ajax_getting = false;
                }
              });　　
            };
            $(".load").remove();
          }, 200);
        });
        if (data.error_code == 156006) {
          $('.coupon').html('<div class="error"><h2>出错啦！</h2><p>原因：未登录</p></div>')
        };
        if (data.error_code == 156003) {
          $('.coupon').html('<div class="error"><h2>出错啦！</h2><p>原因：权限不足~请补充</p></div>')
        };
        if (data.error_code == 156007) {
          $('.coupon').html('<div class="error"><h2>出错啦！</h2><p>原因：服务异常</p></div>')
        };
        if (data.error_code == 511) {
          $('.coupon').html('<div class="error"><h2>出错啦！</h2><p>原因：账号未开通直达号</p></div>')
        };
        if (data.error_code == 520) {
          $('.coupon').html('<div class="stays"><span></span><p>暂无核销记录</p></div>')
        }
 
      },
      error: function (data) {
 
      }
  })
  $(window).bind("orientationchange", function() {
    $('.sliders').css('left',$(window).width() / 2 +'px');
  })
})*/