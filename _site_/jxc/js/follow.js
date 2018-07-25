$(function(){
    //mock
    var thisApi = {
        //商家列表
        business_list: {
            dev: "mock/business_list.json",
            product: "",
        },
		//产品列表
        product_list: {
            dev: "mock/product_list.json",
            product: "",
        }
    };
    bMock.setFace(thisApi);
    bMock.setEnv("dev");
    // console.log(bMock.getFace("business_list"));
});

// var followAjax = {
//     current: 5,

//     reset: function(){
//         $(window).unbind('scroll'); //初始化滚动事件

//         $('.scobt').hide();
//     },

//     //获取商家列表
// 	get_business_list: function(){
//         this.reset();

//         current = this.current;

//         if(pageIndex == 1){
//             $.ajax({
//                 url: bMock.getFace("business_list"),
//                 type:"get",
//                 dataType:"json",
//                 /*data: {
//                     current: current,     //每页数据
//                     pageIndex: pageIndex  //当前页码
//                 },*/
//                 success: function(data, status){
//                     var business_list = data.data;
//                     var str = '';

//                     if(business_list.length > current){
//                         for(var i=0; i<current; i++){
//                             str += 
	       //                      `<li>
								// 	<a href="${business_list[i]["url"]}">
								// 		<div class="fowcot_wrap">
								// 			<div class="fowcot_pic">
								// 				<img src="${business_list[i]["imgs"]}">
								// 				<div class="setop_bar">置顶</div>
								// 			</div>
								// 			<div class="fowcot_txt fowbus_txt">
								// 				<ul>
								// 					<li>
								// 						<dl>
								// 							<dd>
								// 								<h1>${business_list[i]["title"]}</h1>
								// 							</dd>
								// 						</dl>
								// 					</li>
								// 					<ol>
								// 						<li>
								// 							<h3>${business_list[i]["lab0"][0]}</h3>
								// 						</li>
								// 						<li>
								// 							<h3>${business_list[i]["lab0"][1]}</h3>
								// 						</li>
								// 					</ol>
								// 					<ol>
								// 						<li>
								// 							<h2>${business_list[i]["lab1"][0]}</h2>
								// 						</li>
								// 						<li>
								// 							<h2>${business_list[i]["lab1"][1]}</h2>
								// 						</li>
								// 						<li>
								// 							<h2>${business_list[i]["lab1"][2]}</h2>
								// 						</li>
								// 					</ol>
								// 					<li>
								// 						<dl>
								// 							<dd>
								// 								<h4>${business_list[i]["price"]}</h4>
								// 							</dd>
								// 							<dd><span>${business_list[i]["address"]}</span>${business_list[i]["distance"]}</dd>
								// 						</dl>
								// 					</li>
								// 				</ul>
								// 			</div>
								// 			<div class="clear"></div>
								// 		</div>
								// 	</a>
								// 	<div class="fowpot_statu">
								// 		<h3>···</h3>
								// 	</div>
								// </li>`;
//                         }

//                         $('.business_wrap').html(str);

//                     } else {
//                         for(var i=0; i<business_list.length; i++){
//                             str += 
// 	                            `<li>
// 									<a href="${business_list[i]["url"]}">
// 										<div class="fowcot_wrap">
// 											<div class="fowcot_pic">
// 												<img src="${business_list[i]["imgs"]}">
// 												<div class="setop_bar">置顶</div>
// 											</div>
// 											<div class="fowcot_txt fowbus_txt">
// 												<ul>
// 													<li>
// 														<dl>
// 															<dd>
// 																<h1>${business_list[i]["title"]}</h1>
// 															</dd>
// 														</dl>
// 													</li>
// 													<ol>
// 														<li>
// 															<h3>${business_list[i]["lab0"][0]}</h3>
// 														</li>
// 														<li>
// 															<h3>${business_list[i]["lab0"][1]}</h3>
// 														</li>
// 													</ol>
// 													<ol>
// 														<li>
// 															<h2>${business_list[i]["lab1"][0]}</h2>
// 														</li>
// 														<li>
// 															<h2>${business_list[i]["lab1"][1]}</h2>
// 														</li>
// 														<li>
// 															<h2>${business_list[i]["lab1"][2]}</h2>
// 														</li>
// 													</ol>
// 													<li>
// 														<dl>
// 															<dd>
// 																<h4>${business_list[i]["price"]}</h4>
// 															</dd>
// 															<dd><span>${business_list[i]["address"]}</span>${business_list[i]["distance"]}</dd>
// 														</dl>
// 													</li>
// 												</ul>
// 											</div>
// 											<div class="clear"></div>
// 										</div>
// 									</a>
// 									<div class="fowpot_statu">
// 										<h3>···</h3>
// 									</div>
// 								</li>`;
//                         }
//                         $('.business_wra').html(str);
//                     }
//                 },
//                 error: function(){
//                     console.log("false");
//                 }
//             });

//             pageIndex ++;
//         }

//         if (pageIndex > 1){
//             $(window).scroll(function(){
//                 if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
//                     $.ajax({
//                         url: bMock.getFace("business_list"),
//                         type:"get",
//                         dataType:"json",
//                         /*data: {
//                             current: current,     //每页数据
//                             pageIndex: pageIndex  //当前页码
//                         },*/
//                         success: function(data, status){
//                             var business_list = data.data;
//                             var str = '';
//                             var count = data.length;
//                             console.log("总数据条数=" + count);
                            
//                             // 总页码
//                             if(count % current == 0){
//                                 var pageNum = parseInt(count / current); 
//                             } else {
//                                 var pageNum = parseInt(count / current) + 1;
//                             }

//                             for(var i=0; i<business_list.length; i++){
// 	                            str += 
// 		                            `<li>
// 										<a href="${business_list[i]["url"]}">
// 											<div class="fowcot_wrap">
// 												<div class="fowcot_pic">
// 													<img src="${business_list[i]["imgs"]}">
// 													<div class="setop_bar">置顶</div>
// 												</div>
// 												<div class="fowcot_txt fowbus_txt">
// 													<ul>
// 														<li>
// 															<dl>
// 																<dd>
// 																	<h1>${business_list[i]["title"]}</h1>
// 																</dd>
// 															</dl>
// 														</li>
// 														<ol>
// 															<li>
// 																<h3>${business_list[i]["lab0"][0]}</h3>
// 															</li>
// 															<li>
// 																<h3>${business_list[i]["lab0"][1]}</h3>
// 															</li>
// 														</ol>
// 														<ol>
// 															<li>
// 																<h2>${business_list[i]["lab1"][0]}</h2>
// 															</li>
// 															<li>
// 																<h2>${business_list[i]["lab1"][1]}</h2>
// 															</li>
// 															<li>
// 																<h2>${business_list[i]["lab1"][2]}</h2>
// 															</li>
// 														</ol>
// 														<li>
// 															<dl>
// 																<dd>
// 																	<h4>${business_list[i]["price"]}</h4>
// 																</dd>
// 																<dd><span>${business_list[i]["address"]}</span>${business_list[i]["distance"]}</dd>
// 															</dl>
// 														</li>
// 													</ul>
// 												</div>
// 												<div class="clear"></div>
// 											</div>
// 										</a>
// 										<div class="fowpot_statu">
// 											<h3>···</h3>
// 										</div>
// 									</li>`;
//                             }

//                             $('.business_wrap').append(str);
                            
//                             pageIndex ++;

//                             console.log("pageIndex=" + pageIndex);
//                             console.log("pageNum=" + pageNum);

//                             if(pageNum == pageIndex){
//                                 $(window).unbind('scroll'); //初始化滚动事件

//                                 $('.scobt').show();
//                             }
//                         },
//                         error: function () {
//                             console.log("false");
//                         } 
//                     });
//                 }
//             })
//         }
// 	},

// 	//获取产品列表
// 	get_product_list: function(){
//         this.reset();

//         current = this.current;

//         if(pageIndex == 1){
//             $.ajax({
//                 url: bMock.getFace("product_list"),
//                 type:"get",
//                 dataType:"json",
//                 /*data: {
//                     current: current,     //每页数据
//                     pageIndex: pageIndex  //当前页码
//                 },*/
//                 success: function(data, status){
//                     var product_list = data.data;
//                     var str = '';

//                     if(product_list.length > current){
//                         for(var i=0; i<current; i++){
//                             str += 
	       //                      `<li>
								// 	<a href="${product_list[i]["url"]}">
								// 		<div class="fowcot_wrap">
								// 			<div class="fowcot_pic">
								// 				<img src="images/cs/272153.jpg">
								// 			</div>
								// 			<div class="fowcot_txt fowpudct_txt">
								// 				<ul>
								// 					<li>
								// 						<dl>
								// 							<dd>
								// 								<h1>${product_list[i]["title"]}</h1>
								// 							</dd>
								// 							<dd>${product_list[i]["info"]}</dd>
								// 						</dl>
														
								// 					</li>
								// 					<ol>
								// 						<li>${product_list[i]["lab"][0]}</li>
								// 						<li>${product_list[i]["lab"][1]}</li>
								// 					</ol>
								// 					<li>
								// 						<dl>
								// 							<dd>
								// 								<ol>
								// 									<li>
								// 										<h4>${product_list[i]["price"]}</h4>
								// 									</li>
								// 									<li>
								// 										<span>${product_list[i]["lastprice"]}</span>
								// 									</li>
								// 								</ol>
								// 							</dd>
								// 							<dd>
								// 								<button>${product_list[i]["btn"]}</button>
								// 							</dd>
								// 						</dl>
								// 					</li>
								// 				</ul>
								// 			</div>
								// 			<div class="clear"></div>
								// 		</div>
								// 	</a>
								// </li>`;
//                         }

//                         $('.product_wrap').html(str);

//                     } else {
//                         for(var i=0; i<product_list.length; i++){
//                             str += 
// 	                            `<li>
// 									<a href="${product_list[i]["url"]}">
// 										<div class="fowcot_wrap">
// 											<div class="fowcot_pic">
// 												<img src="images/cs/272153.jpg">
// 											</div>
// 											<div class="fowcot_txt fowpudct_txt">
// 												<ul>
// 													<li>
// 														<dl>
// 															<dd>
// 																<h1>${product_list[i]["title"]}</h1>
// 															</dd>
// 															<dd>${product_list[i]["info"]}</dd>
// 														</dl>
														
// 													</li>
// 													<ol>
// 														<li>${product_list[i]["lab"][0]}</li>
// 														<li>${product_list[i]["lab"][1]}</li>
// 													</ol>
// 													<li>
// 														<dl>
// 															<dd>
// 																<ol>
// 																	<li>
// 																		<h4>${product_list[i]["price"]}</h4>
// 																	</li>
// 																	<li>
// 																		<span>${product_list[i]["lastprice"]}</span>
// 																	</li>
// 																</ol>
// 															</dd>
// 															<dd>
// 																<button>${product_list[i]["btn"]}</button>
// 															</dd>
// 														</dl>
// 													</li>
// 												</ul>
// 											</div>
// 											<div class="clear"></div>
// 										</div>
// 									</a>
// 								</li>`;
//                         }
//                         $('.product_wrap').html(str);
//                     }
//                 },
//                 error: function(){
//                     console.log("false");
//                 }
//             });

//             pageIndex ++;
//         }

//         if (pageIndex > 1){
//             $(window).scroll(function(){
//                 if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
//                     $.ajax({
//                         url: bMock.getFace("product_list"),
//                         type:"get",
//                         dataType:"json",
//                         /*data: {
//                             current: current,     //每页数据
//                             pageIndex: pageIndex  //当前页码
//                         },*/
//                         success: function(data, status){
//                             var product_list = data.data;
//                             var str = '';
//                             var count = data.length;
//                             console.log("总数据条数=" + count);
                            
//                             // 总页码
//                             if(count % current == 0){
//                                 var pageNum = parseInt(count / current); 
//                             } else {
//                                 var pageNum = parseInt(count / current) + 1;
//                             }

//                             for(var i=0; i<product_list.length; i++){
// 	                            str += 
// 		                            `<li>
// 										<a href="${product_list[i]["url"]}">
// 											<div class="fowcot_wrap">
// 												<div class="fowcot_pic">
// 													<img src="images/cs/272153.jpg">
// 												</div>
// 												<div class="fowcot_txt fowpudct_txt">
// 													<ul>
// 														<li>
// 															<dl>
// 																<dd>
// 																	<h1>${product_list[i]["title"]}</h1>
// 																</dd>
// 																<dd>${product_list[i]["info"]}</dd>
// 															</dl>
															
// 														</li>
// 														<ol>
// 															<li>${product_list[i]["lab"][0]}</li>
// 															<li>${product_list[i]["lab"][1]}</li>
// 														</ol>
// 														<li>
// 															<dl>
// 																<dd>
// 																	<ol>
// 																		<li>
// 																			<h4>${product_list[i]["price"]}</h4>
// 																		</li>
// 																		<li>
// 																			<span>${product_list[i]["lastprice"]}</span>
// 																		</li>
// 																	</ol>
// 																</dd>
// 																<dd>
// 																	<button>${product_list[i]["btn"]}</button>
// 																</dd>
// 															</dl>
// 														</li>
// 													</ul>
// 												</div>
// 												<div class="clear"></div>
// 											</div>
// 										</a>
// 									</li>`;
//                             }

//                             $('.product_wrap').append(str);

//                             pageIndex ++;

//                             console.log("pageIndex=" + pageIndex);
//                             console.log("pageNum=" + pageNum);

//                             if(pageNum == pageIndex){
//                                 $(window).unbind('scroll'); //初始化滚动事件

//                                 $('.scobt').show();
//                             }
//                         },
//                         error: function () {
//                             console.log("false");
//                         } 
//                     });
//                 }
//             })
//         }
// 	},
// }

//加载商家和产品列表
// var get_list = function(){
// 	 //获取商家列表
// 	pageIndex = 1;
// 	followAjax.get_business_list();

// 	$(".business").click(function(){
// 	   	pageIndex = 1;
// 	    followAjax.get_business_list();
// 	});

// 	//获取产品列表
// 	$(".product").click(function(){
// 	   	pageIndex = 1;
// 	    followAjax.get_product_list();
// 	});	
// }

//页面交互
var tip = function(){
	//选项卡
    $('.follow_top li').click(function(){
    	$(this).addClass('active').siblings().removeClass('active');
    	$('.follow_cont section').eq($(this).index()).show().siblings().hide();
    });

    //选择状态  fowbus_statu
    $('.fowpot_statu h3').click(function(){
        $('.mask').fadeIn();
    });

    $('.fowbus_statu_fot button').click(function(){
        $('.mask').fadeOut();
    });

    $('.scrolltop').click(function(){
        var speed=200;//滑动的速度
        $('body,html').animate({ scrollTop: 0 }, speed);
        return false;
    });
}

$(function(){
	// get_list();
	tip();    //页面交互
});