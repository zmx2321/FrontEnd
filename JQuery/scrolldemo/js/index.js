$(function(){
   var targetHeight = $(".test").offset().top;

   $(window).scroll(function(){
        slideIn($(".target"),150);
   });

  function slideIn(obj,left){
      var targetHeight = obj.offset().top;
      var scrollTop = $(this).scrollTop();
      if(scrollTop>targetHeight-400){
           obj.animate({left:left+'px',opacity:1,filter:'Alpha(opacity=90)'},500);
      }
   };

});
