$(function(){
    ;(function($){
      $.fn.tabSwiper= function(option){
        function  tabSwiper(option,element){
               this.element = element;            
             this.ulArr = this.element.children(); 
             this.width = this.ulArr.width() ;  
             this.pagetab = 0;
             this.swiperone=true  
             this.option =$.extend({isWiper:true,isAuto:true,},option);         
             this.init();
        };
        tabSwiper.prototype ={          
          init:function(option){
              var  m  = this  
            m.setWidth(m.ulArr);
            m.clickSwitch(m.ulArr,m);
            m.swiperEvent(m);         
          },

          setWidth:function(u){         
            var content = u.eq(1);
            var cont = content.children().length;
            content.children().css("width",this.width+"px");          
            content.css("width",cont* this.width+"px");
            return cont;
          },
          clickSwitch:function(u,m){
             u.eq(0).children().on('click',function(){
               var  $this = $(this)
                m.pagetab = $(this).index();  
                m.movetab(m,m.pagetab);
             })
          },
            _swipeRight:function (m,callback){            
           var  _x1=0;
           var right;         
              $(m).on("touchstart",function(e){
                var  e = e  || event;         
                var _touch = e.originalEvent.targetTouches[0]; 
               _x1= _touch.pageX;           
              }).on("touchmove",function(e){
                var  e = e  || event;
                var _touch = e.originalEvent.targetTouches[0];            
                if(_touch.pageX -_x1 > 0 ){
                  var  swiper = Math.abs(_touch.pageX -_x1)
                  right ="right";
                }
              }).on('touchend',function(){  
                if(right =="right"){
                  callback();
                  right='undefined';
                 }
             }) 
           },
          _swipeLeft:function (m,callback){         
           var  _x1=0
           var left;  

               $(m).on("touchstart",function(e){
              var  e = e  || event;                       
              var _touch = e.originalEvent.targetTouches[0]; 
             _x1= _touch.pageX;           
               }).on("touchmove",function(e){
              var  e = e  || event
              var _touch = e.originalEvent.targetTouches[0];            
              if(_touch.pageX -_x1 < 0 ){
                var  swiper = Math.abs(_touch.pageX -_x1);              
                left ="left";
              }
               }).on('touchend',function(){
                if(left =="left"){
                  callback();
                  left ='undefined';
                 }
              })      
          },
          swiperEvent:function(m){            
            if(m.option.isWiper) {                                 
                 m._swipeRight(m.ulArr.eq(1),function(){                
                     m.pagetab--;                                       
                     m.movetab(m,m.pagetab);                
                });
                 m._swipeLeft(m.ulArr.eq(1),function(){   
                     m.pagetab++;  
                     m.movetab(m,m.pagetab);
                })
              }
          },          
          movetab:function(m,index){  
             if(index< 0){
                index = m.pagetab = 0;                  
              };
              if(index >= m.setWidth(m.ulArr)){ 
                index= m.pagetab =m.setWidth(m.ulArr)-1;
             };       
             m.ulArr.eq(1).css("-webkit-transform","translateX(-"+index* m.width+"px)");          
             m.ulArr.eq(0).children().eq(index).addClass("current").siblings().removeClass("current");                     
         },
        };
        this.each(function(){             
          new tabSwiper(option,$(this))
        })
      };
    })(jQuery)
    $('.ui-tab').tabSwiper({
      isWiper:true,//是否滑动
        
      });
  });