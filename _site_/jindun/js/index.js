//轮播图
var swiper = function(){
    var banSwiper = new Swiper('.m-banner .swiper-container', {
      pagination: {
        el: '.swiper-pagination'
      },
      autoplay: {
        delay: 2500
      },
      loop: true,
    });
}

//选项卡
var tab = function(){
	$(function(){
	    $('.tab_list li').click(function(){
	        $(this).addClass('active').siblings().removeClass('active');
	        $('.tab_content section').eq($(this).index()).show().siblings().hide();
	    });
	});
}

//车辆信息下拉
var vehicleSlide = function(){
	$('.tab_vehicle dt').toggle(
    function(){
        $(this).next().slideUp();
    },
    function(){
        $(this).next().slideDown();
    }
 	);
}

//顶部固定
var navfix = function(){
  $(window).scroll(function() {
      var window_top = $(window).scrollTop();
      var div_top = $('.nav_bar').offset().top;
      if (window_top > div_top) {
          $('.tab_list nav').addClass('nav_fix');
          $('.nav_bar').height($('nav').height());
      }
      else {
          $('.tab_list nav').removeClass('nav_fix');
          $('.nav_bar').height(0);
      }
  });
}

//ajax
var getData = {
  //轮播图
  banner: function(){
    $.ajax({
      url: 'json/banner.json',
      type: 'post',
      async: false,
      dataType: 'json',
      success: function(data){
        var str = '';
        var bannerData = data.data;

        for(var i=0; i<bannerData.length; i++){
          str+=`
            <div class="swiper-slide">
                <a href="${bannerData[i].url}">
                    <img src="${bannerData[i].img}" />
                </a>            
            </div>
          `;
        }
        $('.m-banner .swiper-wrapper').html(str);

        swiper();  //轮播图
      },
      error: function(){
        alert("error");
      }
    });
  },
  //违章信息
  illegal: function(){
    $.ajax({
      url: 'json/illegal.json',
      type: 'post',
      dataType: 'json',
      success: function(data){
        var str = '';
        var illegalData = data.data;

        for(var i=0; i<illegalData.length; i++){
          str+=`
            <li>
                <dl>
                    <dd>
                        <p>${illegalData[i].txt}</p>
                    </dd>
                    <dd>
                        <a href="${illegalData[i].url}">详情</a>
                    </dd>
                </dl>
            </li>
          `;
        }
        $('.tab_illegal ul').html(str);
      },
      error: function(){
        alert("error");
      }
    });
  },
  //车辆信息
  vehicle: function(){
    $.ajax({
      url: 'json/vehicle.json',
      type: 'post',
      dataType: 'json',
      success: function(data){
        var str = '';
        var vehicleData = data.data;

        for(var i=0; i<vehicleData.length; i++){
          str+=`
            <dl>
                <dt>${vehicleData[i].licenseNum}</dt>
                <dd>
                    <ul>
                        <li>车主姓名：</li>
                        <li>${vehicleData[i].username}</li>
                    </ul>
                    <ul>
                        <li>车辆类型：</li>
                        <li>${vehicleData[i].carType}</li>
                    </ul>
                    <ul>
                        <li>车架号后三位：</li>
                        <li>${vehicleData[i].frameNum}</li>
                    </ul>
                </dd>
            </dl>
          `;
        }
        $('.vehicle_cot').html(str);

        vehicleSlide();  //车辆信息下拉
      },
      error: function(){
        alert("error");
      }
    });
  }
}

//点击加载
var loadPage = function(){
  //车辆信息
  $('#load_vehicle').click(function(){
    getData.vehicle();  //车辆信息
  });
}


 $(function(){
  tab();  //选项卡
  navfix();  //顶部固定
  
  getData.banner();  //轮播图
  getData.illegal();  //违章信息
  loadPage();  //点击加载
 });