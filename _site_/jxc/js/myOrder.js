$(function(){
    //mock
    var thisApi = {
        //全部订单
        order_all: {
            dev: "mock/order_all.json",
            product: "",
        },
        //待付款订单
        order_dfk: {
            dev: "mock/order_dfk.json",
            product: "",
        },
        //进行中订单
        order_jxz: {
            dev: "mock/order_jxz.json",
            product: "",
        },
        //待收货中订单
        order_dsh: {
            dev: "mock/order_dsh.json",
            product: "",
        },
        //待评价订单
        order_dpj: {
            dev: "mock/order_dpj.json",
            product: "",
        },
        //退款订单
        order_tk: {
            dev: "mock/order_tk.json",
            product: "",
        },
    };
    bMock.setFace(thisApi);
    bMock.setEnv("dev");
    // console.log(bMock.getFace("order_all"));
});

//订单状态分页
var orderPageAjax = {
    current: 3,

    reset: function(){
        $(window).unbind('scroll'); //初始化滚动事件

        $('.scobt').hide();
    },

    //全部
    order_all: function(){
        $.ajax({
            url: bMock.getFace("order_all"),
            type:"get",
            dataType:"json",
            /*data: {
                current: current,     //每页数据
                pageIndex: pageIndex  //当前页码
            },*/
            success:function(data,status){
                console.log(data);
            },
            error: function(){
                console.log(false);
            }
        });
    },

    //待付款
    order_dfk: function(){
        this.reset();

        current = this.current;

        if(pageIndex == 1) {
            $.ajax({
                url: bMock.getFace("order_dfk"),
                type:"get",
                dataType:"json",
                /*data: {
                    current: current,     //每页数据
                    pageIndex: pageIndex  //当前页码
                },*/
                success:function(data,status){
                    var order_dfk = data.data;
                    var str = '';

                    if(order_dfk.length > current){
                        for(var i=0; i<current; i++){
                            str += `
                                <div class="modrct_wrap">
                                    <a href="${order_dfk[i].url}">
                                        <div class="modrct_title">
                                            <div class="modrct_cot">
                                                <ul class="modrct_juify">
                                                    <li>
                                                        <dl>
                                                            <dd>
                                                                <div class="modrct_sign">
                                                                    <img src="${order_dfk[i].portrait}">
                                                                </div>
                                                            </dd>
                                                            <dd>${order_dfk[i].name}</dd>
                                                        </dl>
                                                    </li>
                                                    <li>${order_dfk[i].paystatus}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="modrct_body">
                                            <div class="modrct_cot">
                                                <div class="modrct_body_pic">
                                                    <img src="${order_dfk[i].img}">
                                                </div>
                                                <div class="modrct_body_txt">
                                                    <ul>
                                                        <li>
                                                            <h1>${order_dfk[i].title}</h1>
                                                        </li>
                                                        <li>
                                                            <dl>
                                                                <dd>
                                                                    <h2>${order_dfk[i].lab[0]}</h2>
                                                                </dd>
                                                                <dd>
                                                                    <h2>${order_dfk[i].lab[1]}</h2>
                                                                </dd>
                                                            </dl>
                                                        </li>
                                                        <li>
                                                            <ol class="modrct_juify">
                                                                <li>
                                                                    <dl>
                                                                        <dd>
                                                                            <h3>￥${order_dfk[i].price}</h3>
                                                                        </dd>
                                                                        <dd>
                                                                            <h4>￥${order_dfk[i].lastprice}</h4>
                                                                        </dd>
                                                                    </dl>
                                                                </li>
                                                                <li>
                                                                    <h2>数量：${order_dfk[i].number}</h2>
                                                                </li>
                                                            </ol>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modrct_price">
                                            <div class="modrct_cot">
                                                <ul>
                                                    <li>共${order_dfk[i].number}件商品</li>
                                                    <li>合计：￥${order_dfk[i].price}（含运费￥${order_dfk[i].freight})</li>
                                                </ul>
                                                <div class="clear"></div>
                                            </div>
                                        </div>
                                    </a>  
                                    <div class="modrct_btn">
                                        <div class="modrct_cot">
                                            <ul>
                                                <li>
                                                    <button onclick="location.href='${order_dfk[i].cancel_btn[1]}'">${order_dfk[i].cancel_btn[0]}</button>
                                                </li>
                                                <li>
                                                    <button class="inn" onclick="location.href='${order_dfk[i].pay_btn[1]}'">${order_dfk[i].pay_btn[0]}</button>
                                                </li>
                                            </ul>
                                            <div class="clear"></div>
                                        </div>
                                    </div>
                                </div> 
                            `;
                        }

                        $('.myorder_dfk').html(str);
                    } else {
                        for(var i=0; i<order_dfk.length; i++){
                            str += `
                                <div class="modrct_wrap">
                                    <a href="${order_dfk[i].url}">
                                        <div class="modrct_title">
                                            <div class="modrct_cot">
                                                <ul class="modrct_juify">
                                                    <li>
                                                        <dl>
                                                            <dd>
                                                                <div class="modrct_sign">
                                                                    <img src="${order_dfk[i].portrait}">
                                                                </div>
                                                            </dd>
                                                            <dd>${order_dfk[i].name}</dd>
                                                        </dl>
                                                    </li>
                                                    <li>${order_dfk[i].paystatus}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="modrct_body">
                                            <div class="modrct_cot">
                                                <div class="modrct_body_pic">
                                                    <img src="${order_dfk[i].img}">
                                                </div>
                                                <div class="modrct_body_txt">
                                                    <ul>
                                                        <li>
                                                            <h1>${order_dfk[i].title}</h1>
                                                        </li>
                                                        <li>
                                                            <dl>
                                                                <dd>
                                                                    <h2>${order_dfk[i].lab[0]}</h2>
                                                                </dd>
                                                                <dd>
                                                                    <h2>${order_dfk[i].lab[1]}</h2>
                                                                </dd>
                                                            </dl>
                                                        </li>
                                                        <li>
                                                            <ol class="modrct_juify">
                                                                <li>
                                                                    <dl>
                                                                        <dd>
                                                                            <h3>￥${order_dfk[i].price}</h3>
                                                                        </dd>
                                                                        <dd>
                                                                            <h4>￥${order_dfk[i].lastprice}</h4>
                                                                        </dd>
                                                                    </dl>
                                                                </li>
                                                                <li>
                                                                    <h2>数量：${order_dfk[i].number}</h2>
                                                                </li>
                                                            </ol>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modrct_price">
                                            <div class="modrct_cot">
                                                <ul>
                                                    <li>共${order_dfk[i].number}件商品</li>
                                                    <li>合计：￥${order_dfk[i].price}（含运费￥${order_dfk[i].freight})</li>
                                                </ul>
                                                <div class="clear"></div>
                                            </div>
                                        </div>
                                    </a>  
                                    <div class="modrct_btn">
                                        <div class="modrct_cot">
                                            <ul>
                                                <li>
                                                    <button onclick="location.href='${order_dfk[i].cancel_btn[1]}'">${order_dfk[i].cancel_btn[0]}</button>
                                                </li>
                                                <li>
                                                    <button class="inn" onclick="location.href='${order_dfk[i].pay_btn[1]}'">${order_dfk[i].pay_btn[0]}</button>
                                                </li>
                                            </ul>
                                            <div class="clear"></div>
                                        </div>
                                    </div>
                                </div> 
                            `;
                        }

                        $('.myorder_dfk').html(str);
                    }
                },
                error: function(){
                    console.log(false);
                }
            });

            pageIndex ++;
        }

        if(pageIndex > 1){
            $(window).scroll(function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
                    $.ajax({
                        url: bMock.getFace("order_dfk"),
                        type:"get",
                        dataType:"json",
                        /*data: {
                            current: current,     //每页数据
                            pageIndex: pageIndex  //当前页码
                        },*/
                        success: function(data, status){
                            var order_dfk = data.data;
                            var str = '';
                            var count = data.length;
                            console.log("总数据条数=" + count);

                            console.log(count);
                            
                            // 总页码
                            if(count % current == 0){
                                var pageNum = parseInt(count / current); 
                            } else {
                                var pageNum = parseInt(count / current) + 1;
                            }

                            for(var i=0; i<order_dfk.length; i++){
                                str += `
                                    <div class="modrct_wrap">
                                        <a href="${order_dfk[i].url}">
                                            <div class="modrct_title">
                                                <div class="modrct_cot">
                                                    <ul class="modrct_juify">
                                                        <li>
                                                            <dl>
                                                                <dd>
                                                                    <div class="modrct_sign">
                                                                        <img src="${order_dfk[i].portrait}">
                                                                    </div>
                                                                </dd>
                                                                <dd>${order_dfk[i].name}</dd>
                                                            </dl>
                                                        </li>
                                                        <li>${order_dfk[i].paystatus}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="modrct_body">
                                                <div class="modrct_cot">
                                                    <div class="modrct_body_pic">
                                                        <img src="${order_dfk[i].img}">
                                                    </div>
                                                    <div class="modrct_body_txt">
                                                        <ul>
                                                            <li>
                                                                <h1>${order_dfk[i].title}</h1>
                                                            </li>
                                                            <li>
                                                                <dl>
                                                                    <dd>
                                                                        <h2>${order_dfk[i].lab[0]}</h2>
                                                                    </dd>
                                                                    <dd>
                                                                        <h2>${order_dfk[i].lab[1]}</h2>
                                                                    </dd>
                                                                </dl>
                                                            </li>
                                                            <li>
                                                                <ol class="modrct_juify">
                                                                    <li>
                                                                        <dl>
                                                                            <dd>
                                                                                <h3>￥${order_dfk[i].price}</h3>
                                                                            </dd>
                                                                            <dd>
                                                                                <h4>￥${order_dfk[i].lastprice}</h4>
                                                                            </dd>
                                                                        </dl>
                                                                    </li>
                                                                    <li>
                                                                        <h2>数量：${order_dfk[i].number}</h2>
                                                                    </li>
                                                                </ol>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modrct_price">
                                                <div class="modrct_cot">
                                                    <ul>
                                                        <li>共${order_dfk[i].number}件商品</li>
                                                        <li>合计：￥${order_dfk[i].price}（含运费￥${order_dfk[i].freight})</li>
                                                    </ul>
                                                    <div class="clear"></div>
                                                </div>
                                            </div>
                                        </a>  
                                        <div class="modrct_btn">
                                            <div class="modrct_cot">
                                                <ul>
                                                    <li>
                                                        <button onclick="location.href='${order_dfk[i].cancel_btn[1]}'">${order_dfk[i].cancel_btn[0]}</button>
                                                    </li>
                                                    <li>
                                                        <button class="inn" onclick="location.href='${order_dfk[i].pay_btn[1]}'">${order_dfk[i].pay_btn[0]}</button>
                                                    </li>
                                                </ul>
                                                <div class="clear"></div>
                                            </div>
                                        </div>
                                    </div> 
                                `;
                            }

                            $('.myorder_dfk').append(str);

                            pageIndex ++;

                            console.log("pageIndex=" + pageIndex);
                            console.log("pageNum=" + pageNum);

                            if(pageNum == pageIndex){
                                $(window).unbind('scroll'); //初始化滚动事件

                                $('.scobt').show();
                            }
                        },
                        error: function () {
                            console.log("false");
                        } 
                    });
                }
            });
        }                
    },

    //进行中
    order_jxz: function(){
        this.reset();

        current = this.current;

        if(pageIndex == 1) {
            $.ajax({
                url: bMock.getFace("order_jxz"),
                type:"get",
                dataType:"json",
                /*data: {
                    current: current,     //每页数据
                    pageIndex: pageIndex  //当前页码
                },*/
                success:function(data,status){
                    var order_jxz = data.data;
                    var str = '';

                    if(order_jxz.length > current){
                        for(var i=0; i<current; i++){
                            str += `
                                <div class="modrct_wrap">
                                    <a href="${order_jxz[i].url}">
                                        <div class="modrct_title">
                                            <div class="modrct_cot">
                                                <ul class="modrct_juify">
                                                    <li>
                                                        <dl>
                                                            <dd>
                                                                <div class="modrct_sign">
                                                                    <img src="${order_jxz[i].portrait}">
                                                                </div>
                                                            </dd>
                                                            <dd>${order_jxz[i].name}</dd>
                                                        </dl>
                                                    </li>
                                                    <li>${order_jxz[i].paystatus}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="modrct_body">
                                            <div class="modrct_cot">
                                                <div class="modrct_body_pic">
                                                    <img src="${order_jxz[i].img}">
                                                </div>
                                                <div class="modrct_body_txt">
                                                    <ul>
                                                        <li>
                                                            <h1>${order_jxz[i].title}</h1>
                                                        </li>
                                                        <li>
                                                            <dl>
                                                                <dd>
                                                                    <h2>${order_jxz[i].lab[0]}</h2>
                                                                </dd>
                                                                <dd>
                                                                    <h2>${order_jxz[i].lab[1]}</h2>
                                                                </dd>
                                                            </dl>
                                                        </li>
                                                        <li>
                                                            <ol class="modrct_juify">
                                                                <li>
                                                                    <dl>
                                                                        <dd>
                                                                            <h3>￥${order_jxz[i].price}</h3>
                                                                        </dd>
                                                                        <dd>
                                                                            <h4>￥${order_jxz[i].lastprice}</h4>
                                                                        </dd>
                                                                    </dl>
                                                                </li>
                                                                <li>
                                                                    <h2>数量：${order_jxz[i].number}</h2>
                                                                </li>
                                                            </ol>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modrct_price">
                                            <div class="modrct_cot">
                                                <ul>
                                                    <li>共${order_jxz[i].number}件商品</li>
                                                    <li>合计：￥${order_jxz[i].price}（含运费￥${order_jxz[i].freight})</li>
                                                </ul>
                                                <div class="clear"></div>
                                            </div>
                                        </div>
                                    </a>  
                                    <div class="modrct_btn">
                                        <div class="modrct_cot">
                                            <ul>
                                                <li>
                                                    <button onclick="location.href='${order_jxz[i].viewLogistics_btn[1]}'">${order_jxz[i].viewLogistics_btn[0]}</button>
                                                </li>
                                            </ul>
                                            <div class="clear"></div>
                                        </div>
                                    </div>
                                </div> 
                            `;
                        }

                        $('.myorder_jxz').html(str);
                    } else {
                        for(var i=0; i<order_jxz.length; i++){
                            str += `
                                <div class="modrct_wrap">
                                    <a href="${order_jxz[i].url}">
                                        <div class="modrct_title">
                                            <div class="modrct_cot">
                                                <ul class="modrct_juify">
                                                    <li>
                                                        <dl>
                                                            <dd>
                                                                <div class="modrct_sign">
                                                                    <img src="${order_jxz[i].portrait}">
                                                                </div>
                                                            </dd>
                                                            <dd>${order_jxz[i].name}</dd>
                                                        </dl>
                                                    </li>
                                                    <li>${order_jxz[i].paystatus}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="modrct_body">
                                            <div class="modrct_cot">
                                                <div class="modrct_body_pic">
                                                    <img src="${order_jxz[i].img}">
                                                </div>
                                                <div class="modrct_body_txt">
                                                    <ul>
                                                        <li>
                                                            <h1>${order_jxz[i].title}</h1>
                                                        </li>
                                                        <li>
                                                            <dl>
                                                                <dd>
                                                                    <h2>${order_jxz[i].lab[0]}</h2>
                                                                </dd>
                                                                <dd>
                                                                    <h2>${order_jxz[i].lab[1]}</h2>
                                                                </dd>
                                                            </dl>
                                                        </li>
                                                        <li>
                                                            <ol class="modrct_juify">
                                                                <li>
                                                                    <dl>
                                                                        <dd>
                                                                            <h3>￥${order_jxz[i].price}</h3>
                                                                        </dd>
                                                                        <dd>
                                                                            <h4>￥${order_jxz[i].lastprice}</h4>
                                                                        </dd>
                                                                    </dl>
                                                                </li>
                                                                <li>
                                                                    <h2>数量：${order_jxz[i].number}</h2>
                                                                </li>
                                                            </ol>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modrct_price">
                                            <div class="modrct_cot">
                                                <ul>
                                                    <li>共${order_jxz[i].number}件商品</li>
                                                    <li>合计：￥${order_jxz[i].price}（含运费￥${order_jxz[i].freight})</li>
                                                </ul>
                                                <div class="clear"></div>
                                            </div>
                                        </div>
                                    </a>  
                                    <div class="modrct_btn">
                                        <div class="modrct_cot">
                                            <ul>
                                               <li>
                                                    <button onclick="location.href='${order_jxz[i].viewLogistics_btn[1]}'">${order_jxz[i].viewLogistics_btn[0]}</button>
                                                </li>
                                            </ul>
                                            <div class="clear"></div>
                                        </div>
                                    </div>
                                </div> 
                            `;
                        }

                        $('.myorder_jxz').html(str);
                    }
                },
                error: function(){
                    console.log(false);
                }
            });

            pageIndex ++;
        }

        if(pageIndex > 1){
            $(window).scroll(function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
                    $.ajax({
                        url: bMock.getFace("order_jxz"),
                        type:"get",
                        dataType:"json",
                        /*data: {
                            current: current,     //每页数据
                            pageIndex: pageIndex  //当前页码
                        },*/
                        success: function(data, status){
                            var order_jxz = data.data;
                            var str = '';
                            var count = data.length;
                            console.log("总数据条数=" + count);
                            
                            // 总页码
                            if(count % current == 0){
                                var pageNum = parseInt(count / current); 
                            } else {
                                var pageNum = parseInt(count / current) + 1;
                            }

                            for(var i=0; i<order_jxz.length; i++){
                                str += `
                                    <div class="modrct_wrap">
                                        <a href="${order_jxz[i].url}">
                                            <div class="modrct_title">
                                                <div class="modrct_cot">
                                                    <ul class="modrct_juify">
                                                        <li>
                                                            <dl>
                                                                <dd>
                                                                    <div class="modrct_sign">
                                                                        <img src="${order_jxz[i].portrait}">
                                                                    </div>
                                                                </dd>
                                                                <dd>${order_jxz[i].name}</dd>
                                                            </dl>
                                                        </li>
                                                        <li>${order_jxz[i].paystatus}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="modrct_body">
                                                <div class="modrct_cot">
                                                    <div class="modrct_body_pic">
                                                        <img src="${order_jxz[i].img}">
                                                    </div>
                                                    <div class="modrct_body_txt">
                                                        <ul>
                                                            <li>
                                                                <h1>${order_jxz[i].title}</h1>
                                                            </li>
                                                            <li>
                                                                <dl>
                                                                    <dd>
                                                                        <h2>${order_jxz[i].lab[0]}</h2>
                                                                    </dd>
                                                                    <dd>
                                                                        <h2>${order_jxz[i].lab[1]}</h2>
                                                                    </dd>
                                                                </dl>
                                                            </li>
                                                            <li>
                                                                <ol class="modrct_juify">
                                                                    <li>
                                                                        <dl>
                                                                            <dd>
                                                                                <h3>￥${order_jxz[i].price}</h3>
                                                                            </dd>
                                                                            <dd>
                                                                                <h4>￥${order_jxz[i].lastprice}</h4>
                                                                            </dd>
                                                                        </dl>
                                                                    </li>
                                                                    <li>
                                                                        <h2>数量：${order_jxz[i].number}</h2>
                                                                    </li>
                                                                </ol>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modrct_price">
                                                <div class="modrct_cot">
                                                    <ul>
                                                        <li>共${order_jxz[i].number}件商品</li>
                                                        <li>合计：￥${order_jxz[i].price}（含运费￥${order_jxz[i].freight})</li>
                                                    </ul>
                                                    <div class="clear"></div>
                                                </div>
                                            </div>
                                        </a>  
                                        <div class="modrct_btn">
                                            <div class="modrct_cot">
                                                <ul>
                                                    <li>
                                                        <button onclick="location.href='${order_jxz[i].viewLogistics_btn[1]}'">${order_jxz[i].viewLogistics_btn[0]}</button>
                                                    </li>
                                                </ul>
                                                <div class="clear"></div>
                                            </div>
                                        </div>
                                    </div> 
                                `;
                            }

                            $('.myorder_jxz').append(str);

                            pageIndex ++;

                            console.log("pageIndex=" + pageIndex);
                            console.log("pageNum=" + pageNum);

                            if(pageNum == pageIndex){
                                $(window).unbind('scroll'); //初始化滚动事件

                                $('.scobt').show();
                            }
                        },
                        error: function () {
                            console.log("false");
                        } 
                    });
                }
            });
        }                
    },

    //待收货
    order_dsh: function(){
        this.reset();

        current = this.current;

        if(pageIndex == 1) {
            $.ajax({
                url: bMock.getFace("order_dsh"),
                type:"get",
                dataType:"json",
                /*data: {
                    current: current,     //每页数据
                    pageIndex: pageIndex  //当前页码
                },*/
                success:function(data,status){
                    var order_dsh = data.data;
                    var str = '';

                    if(order_dsh.length > current){
                        for(var i=0; i<current; i++){
                            str += `
                                <div class="modrct_wrap">
                                    <a href="${order_dsh[i].url}">
                                        <div class="modrct_title">
                                            <div class="modrct_cot">
                                                <ul class="modrct_juify">
                                                    <li>
                                                        <dl>
                                                            <dd>
                                                                <div class="modrct_sign">
                                                                    <img src="${order_dsh[i].portrait}">
                                                                </div>
                                                            </dd>
                                                            <dd>${order_dsh[i].name}</dd>
                                                        </dl>
                                                    </li>
                                                    <li>${order_dsh[i].paystatus}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="modrct_body">
                                            <div class="modrct_cot">
                                                <div class="modrct_body_pic">
                                                    <img src="${order_dsh[i].img}">
                                                </div>
                                                <div class="modrct_body_txt">
                                                    <ul>
                                                        <li>
                                                            <h1>${order_dsh[i].title}</h1>
                                                        </li>
                                                        <li>
                                                            <dl>
                                                                <dd>
                                                                    <h2>${order_dsh[i].lab[0]}</h2>
                                                                </dd>
                                                                <dd>
                                                                    <h2>${order_dsh[i].lab[1]}</h2>
                                                                </dd>
                                                            </dl>
                                                        </li>
                                                        <li>
                                                            <ol class="modrct_juify">
                                                                <li>
                                                                    <dl>
                                                                        <dd>
                                                                            <h3>￥${order_dsh[i].price}</h3>
                                                                        </dd>
                                                                        <dd>
                                                                            <h4>￥${order_dsh[i].lastprice}</h4>
                                                                        </dd>
                                                                    </dl>
                                                                </li>
                                                                <li>
                                                                    <h2>数量：${order_dsh[i].number}</h2>
                                                                </li>
                                                            </ol>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modrct_price">
                                            <div class="modrct_cot">
                                                <ul>
                                                    <li>共${order_dsh[i].number}件商品</li>
                                                    <li>合计：￥${order_dsh[i].price}（含运费￥${order_dsh[i].freight})</li>
                                                </ul>
                                                <div class="clear"></div>
                                            </div>
                                        </div>
                                    </a>  
                                    <div class="modrct_btn">
                                        <div class="modrct_cot">
                                            <ul>
                                                <li>
                                                    <button onclick="location.href='${order_dsh[i].viewLogistics_btn[1]}'">${order_dsh[i].viewLogistics_btn[0]}</button>
                                                </li>
                                                <li>
                                                    <button class="inn" onclick="location.href='${order_dsh[i].receipt_btn[1]}'">${order_dsh[i].receipt_btn[0]}</button>
                                                </li>
                                            </ul>
                                            <div class="clear"></div>
                                        </div>
                                    </div>
                                </div> 
                            `;
                        }

                        $('.myorder_dsh').html(str);
                    } else {
                        for(var i=0; i<order_dsh.length; i++){
                            str += `
                                <div class="modrct_wrap">
                                    <a href="${order_dsh[i].url}">
                                        <div class="modrct_title">
                                            <div class="modrct_cot">
                                                <ul class="modrct_juify">
                                                    <li>
                                                        <dl>
                                                            <dd>
                                                                <div class="modrct_sign">
                                                                    <img src="${order_dsh[i].portrait}">
                                                                </div>
                                                            </dd>
                                                            <dd>${order_dsh[i].name}</dd>
                                                        </dl>
                                                    </li>
                                                    <li>${order_dsh[i].paystatus}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="modrct_body">
                                            <div class="modrct_cot">
                                                <div class="modrct_body_pic">
                                                    <img src="${order_dsh[i].img}">
                                                </div>
                                                <div class="modrct_body_txt">
                                                    <ul>
                                                        <li>
                                                            <h1>${order_dsh[i].title}</h1>
                                                        </li>
                                                        <li>
                                                            <dl>
                                                                <dd>
                                                                    <h2>${order_dsh[i].lab[0]}</h2>
                                                                </dd>
                                                                <dd>
                                                                    <h2>${order_dsh[i].lab[1]}</h2>
                                                                </dd>
                                                            </dl>
                                                        </li>
                                                        <li>
                                                            <ol class="modrct_juify">
                                                                <li>
                                                                    <dl>
                                                                        <dd>
                                                                            <h3>￥${order_dsh[i].price}</h3>
                                                                        </dd>
                                                                        <dd>
                                                                            <h4>￥${order_dsh[i].lastprice}</h4>
                                                                        </dd>
                                                                    </dl>
                                                                </li>
                                                                <li>
                                                                    <h2>数量：${order_dsh[i].number}</h2>
                                                                </li>
                                                            </ol>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modrct_price">
                                            <div class="modrct_cot">
                                                <ul>
                                                    <li>共${order_dsh[i].number}件商品</li>
                                                    <li>合计：￥${order_dsh[i].price}（含运费￥${order_dsh[i].freight})</li>
                                                </ul>
                                                <div class="clear"></div>
                                            </div>
                                        </div>
                                    </a>  
                                    <div class="modrct_btn">
                                        <div class="modrct_cot">
                                            <ul>
                                                <li>
                                                    <button onclick="location.href='${order_dsh[i].viewLogistics_btn[1]}'">${order_dsh[i].viewLogistics_btn[0]}</button>
                                                </li>
                                                <li>
                                                   <button class="inn" onclick="location.href='${order_dsh[i].receipt_btn[1]}'">${order_dsh[i].receipt_btn[0]}</button>
                                                </li>
                                            </ul>
                                            <div class="clear"></div>
                                        </div>
                                    </div>
                                </div> 
                            `;
                        }

                        $('.myorder_dsh').html(str);
                    }
                },
                error: function(){
                    console.log(false);
                }
            });

            pageIndex ++;
        }

        if(pageIndex > 1){
            $(window).scroll(function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
                    $.ajax({
                        url: bMock.getFace("order_dsh"),
                        type:"get",
                        dataType:"json",
                        /*data: {
                            current: current,     //每页数据
                            pageIndex: pageIndex  //当前页码
                        },*/
                        success: function(data, status){
                            var order_dsh = data.data;
                            var str = '';
                            var count = data.length;
                            console.log("总数据条数=" + count);
                            
                            // 总页码
                            if(count % current == 0){
                                var pageNum = parseInt(count / current); 
                            } else {
                                var pageNum = parseInt(count / current) + 1;
                            }

                            for(var i=0; i<order_dsh.length; i++){
                                str += `
                                    <div class="modrct_wrap">
                                        <a href="${order_dsh[i].url}">
                                            <div class="modrct_title">
                                                <div class="modrct_cot">
                                                    <ul class="modrct_juify">
                                                        <li>
                                                            <dl>
                                                                <dd>
                                                                    <div class="modrct_sign">
                                                                        <img src="${order_dsh[i].portrait}">
                                                                    </div>
                                                                </dd>
                                                                <dd>${order_dsh[i].name}</dd>
                                                            </dl>
                                                        </li>
                                                        <li>${order_dsh[i].paystatus}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="modrct_body">
                                                <div class="modrct_cot">
                                                    <div class="modrct_body_pic">
                                                        <img src="${order_dsh[i].img}">
                                                    </div>
                                                    <div class="modrct_body_txt">
                                                        <ul>
                                                            <li>
                                                                <h1>${order_dsh[i].title}</h1>
                                                            </li>
                                                            <li>
                                                                <dl>
                                                                    <dd>
                                                                        <h2>${order_dsh[i].lab[0]}</h2>
                                                                    </dd>
                                                                    <dd>
                                                                        <h2>${order_dsh[i].lab[1]}</h2>
                                                                    </dd>
                                                                </dl>
                                                            </li>
                                                            <li>
                                                                <ol class="modrct_juify">
                                                                    <li>
                                                                        <dl>
                                                                            <dd>
                                                                                <h3>￥${order_dsh[i].price}</h3>
                                                                            </dd>
                                                                            <dd>
                                                                                <h4>￥${order_dsh[i].lastprice}</h4>
                                                                            </dd>
                                                                        </dl>
                                                                    </li>
                                                                    <li>
                                                                        <h2>数量：${order_dsh[i].number}</h2>
                                                                    </li>
                                                                </ol>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modrct_price">
                                                <div class="modrct_cot">
                                                    <ul>
                                                        <li>共${order_dsh[i].number}件商品</li>
                                                        <li>合计：￥${order_dsh[i].price}（含运费￥${order_dsh[i].freight})</li>
                                                    </ul>
                                                    <div class="clear"></div>
                                                </div>
                                            </div>
                                        </a>  
                                        <div class="modrct_btn">
                                            <div class="modrct_cot">
                                                <ul>
                                                    <li>
                                                        <button onclick="location.href='${order_dsh[i].viewLogistics_btn[1]}'">${order_dsh[i].viewLogistics_btn[0]}</button>
                                                    </li>
                                                    <li>
                                                        <button class="inn" onclick="location.href='${order_dsh[i].receipt_btn[1]}'">${order_dsh[i].receipt_btn[0]}</button>
                                                    </li>
                                                </ul>
                                                <div class="clear"></div>
                                            </div>
                                        </div>
                                    </div> 
                                `;
                            }

                            $('.myorder_dsh').append(str);

                            pageIndex ++;

                            console.log("pageIndex=" + pageIndex);
                            console.log("pageNum=" + pageNum);

                            if(pageNum == pageIndex){
                                $(window).unbind('scroll'); //初始化滚动事件

                                $('.scobt').show();
                            }
                        },
                        error: function () {
                            console.log("false");
                        } 
                    });
                }
            });
        }                
    },

    //待评价
    order_dpj: function(){
        this.reset();

        current = this.current;

        if(pageIndex == 1) {
            $.ajax({
                url: bMock.getFace("order_dpj"),
                type:"get",
                dataType:"json",
                /*data: {
                    current: current,     //每页数据
                    pageIndex: pageIndex  //当前页码
                },*/
                success:function(data,status){
                    var order_dpj = data.data;
                    var str = '';

                    if(order_dpj.length > current){
                        for(var i=0; i<current; i++){
                            str += `
                                <div class="modrct_wrap">
                                    <a href="${order_dpj[i].url}">
                                        <div class="modrct_title">
                                            <div class="modrct_cot">
                                                <ul class="modrct_juify">
                                                    <li>
                                                        <dl>
                                                            <dd>
                                                                <div class="modrct_sign">
                                                                    <img src="${order_dpj[i].portrait}">
                                                                </div>
                                                            </dd>
                                                            <dd>${order_dpj[i].name}</dd>
                                                        </dl>
                                                    </li>
                                                    <li>${order_dpj[i].paystatus}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="modrct_body">
                                            <div class="modrct_cot">
                                                <div class="modrct_body_pic">
                                                    <img src="${order_dpj[i].img}">
                                                </div>
                                                <div class="modrct_body_txt">
                                                    <ul>
                                                        <li>
                                                            <h1>${order_dpj[i].title}</h1>
                                                        </li>
                                                        <li>
                                                            <dl>
                                                                <dd>
                                                                    <h2>${order_dpj[i].lab[0]}</h2>
                                                                </dd>
                                                                <dd>
                                                                    <h2>${order_dpj[i].lab[1]}</h2>
                                                                </dd>
                                                            </dl>
                                                        </li>
                                                        <li>
                                                            <ol class="modrct_juify">
                                                                <li>
                                                                    <dl>
                                                                        <dd>
                                                                            <h3>￥${order_dpj[i].price}</h3>
                                                                        </dd>
                                                                        <dd>
                                                                            <h4>￥${order_dpj[i].lastprice}</h4>
                                                                        </dd>
                                                                    </dl>
                                                                </li>
                                                                <li>
                                                                    <h2>数量：${order_dpj[i].number}</h2>
                                                                </li>
                                                            </ol>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modrct_price">
                                            <div class="modrct_cot">
                                                <ul>
                                                    <li>共${order_dpj[i].number}件商品</li>
                                                    <li>合计：￥${order_dpj[i].price}（含运费￥${order_dpj[i].freight})</li>
                                                </ul>
                                                <div class="clear"></div>
                                            </div>
                                        </div>
                                    </a>  
                                    <div class="modrct_btn">
                                        <div class="modrct_cot">
                                            <ul>
                                                <li>
                                                    <button onclick="location.href='${order_dpj[i].del_btn[1]}'">${order_dpj[i].del_btn[0]}</button>
                                                </li>
                                                <li>
                                                    <button class="inn" onclick="location.href='${order_dpj[i].evaluate_btn[1]}'">${order_dpj[i].evaluate_btn[0]}</button>
                                                </li>
                                            </ul>
                                            <div class="clear"></div>
                                        </div>
                                    </div>
                                </div> 
                            `;
                        }

                        $('.myorder_dpj').html(str);
                    } else {
                        for(var i=0; i<order_dpj.length; i++){
                            str += `
                                <div class="modrct_wrap">
                                    <a href="${order_dpj[i].url}">
                                        <div class="modrct_title">
                                            <div class="modrct_cot">
                                                <ul class="modrct_juify">
                                                    <li>
                                                        <dl>
                                                            <dd>
                                                                <div class="modrct_sign">
                                                                    <img src="${order_dpj[i].portrait}">
                                                                </div>
                                                            </dd>
                                                            <dd>${order_dpj[i].name}</dd>
                                                        </dl>
                                                    </li>
                                                    <li>${order_dpj[i].paystatus}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="modrct_body">
                                            <div class="modrct_cot">
                                                <div class="modrct_body_pic">
                                                    <img src="${order_dpj[i].img}">
                                                </div>
                                                <div class="modrct_body_txt">
                                                    <ul>
                                                        <li>
                                                            <h1>${order_dpj[i].title}</h1>
                                                        </li>
                                                        <li>
                                                            <dl>
                                                                <dd>
                                                                    <h2>${order_dpj[i].lab[0]}</h2>
                                                                </dd>
                                                                <dd>
                                                                    <h2>${order_dpj[i].lab[1]}</h2>
                                                                </dd>
                                                            </dl>
                                                        </li>
                                                        <li>
                                                            <ol class="modrct_juify">
                                                                <li>
                                                                    <dl>
                                                                        <dd>
                                                                            <h3>￥${order_dpj[i].price}</h3>
                                                                        </dd>
                                                                        <dd>
                                                                            <h4>￥${order_dpj[i].lastprice}</h4>
                                                                        </dd>
                                                                    </dl>
                                                                </li>
                                                                <li>
                                                                    <h2>数量：${order_dpj[i].number}</h2>
                                                                </li>
                                                            </ol>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modrct_price">
                                            <div class="modrct_cot">
                                                <ul>
                                                    <li>共${order_dpj[i].number}件商品</li>
                                                    <li>合计：￥${order_dpj[i].price}（含运费￥${order_dpj[i].freight})</li>
                                                </ul>
                                                <div class="clear"></div>
                                            </div>
                                        </div>
                                    </a>  
                                    <div class="modrct_btn">
                                        <div class="modrct_cot">
                                            <ul>
                                                <li>
                                                    <button onclick="location.href='${order_dpj[i].del_btn[1]}'">${order_dpj[i].del_btn[0]}</button>
                                                </li>
                                                <li>
                                                    <button class="inn" onclick="location.href='${order_dpj[i].evaluate_btn[1]}'">${order_dpj[i].evaluate_btn[0]}</button>
                                                </li>
                                            </ul>
                                            <div class="clear"></div>
                                        </div>
                                    </div>
                                </div> 
                            `;
                        }

                        $('.myorder_dpj').html(str);
                    }
                },
                error: function(){
                    console.log(false);
                }
            });

            pageIndex ++;
        }

        if(pageIndex > 1){
            $(window).scroll(function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
                    $.ajax({
                        url: bMock.getFace("order_dpj"),
                        type:"get",
                        dataType:"json",
                        /*data: {
                            current: current,     //每页数据
                            pageIndex: pageIndex  //当前页码
                        },*/
                        success: function(data, status){
                            var order_dpj = data.data;
                            var str = '';
                            var count = data.length;
                            console.log("总数据条数=" + count);
                            
                            // 总页码
                            if(count % current == 0){
                                var pageNum = parseInt(count / current); 
                            } else {
                                var pageNum = parseInt(count / current) + 1;
                            }

                            for(var i=0; i<order_dpj.length; i++){
                                str += `
                                    <div class="modrct_wrap">
                                        <a href="${order_dpj[i].url}">
                                            <div class="modrct_title">
                                                <div class="modrct_cot">
                                                    <ul class="modrct_juify">
                                                        <li>
                                                            <dl>
                                                                <dd>
                                                                    <div class="modrct_sign">
                                                                        <img src="${order_dpj[i].portrait}">
                                                                    </div>
                                                                </dd>
                                                                <dd>${order_dpj[i].name}</dd>
                                                            </dl>
                                                        </li>
                                                        <li>${order_dpj[i].paystatus}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="modrct_body">
                                                <div class="modrct_cot">
                                                    <div class="modrct_body_pic">
                                                        <img src="${order_dpj[i].img}">
                                                    </div>
                                                    <div class="modrct_body_txt">
                                                        <ul>
                                                            <li>
                                                                <h1>${order_dpj[i].title}</h1>
                                                            </li>
                                                            <li>
                                                                <dl>
                                                                    <dd>
                                                                        <h2>${order_dpj[i].lab[0]}</h2>
                                                                    </dd>
                                                                    <dd>
                                                                        <h2>${order_dpj[i].lab[1]}</h2>
                                                                    </dd>
                                                                </dl>
                                                            </li>
                                                            <li>
                                                                <ol class="modrct_juify">
                                                                    <li>
                                                                        <dl>
                                                                            <dd>
                                                                                <h3>￥${order_dpj[i].price}</h3>
                                                                            </dd>
                                                                            <dd>
                                                                                <h4>￥${order_dpj[i].lastprice}</h4>
                                                                            </dd>
                                                                        </dl>
                                                                    </li>
                                                                    <li>
                                                                        <h2>数量：${order_dpj[i].number}</h2>
                                                                    </li>
                                                                </ol>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modrct_price">
                                                <div class="modrct_cot">
                                                    <ul>
                                                        <li>共${order_dpj[i].number}件商品</li>
                                                        <li>合计：￥${order_dpj[i].price}（含运费￥${order_dpj[i].freight})</li>
                                                    </ul>
                                                    <div class="clear"></div>
                                                </div>
                                            </div>
                                        </a>  
                                        <div class="modrct_btn">
                                            <div class="modrct_cot">
                                                <ul>
                                                    <li>
                                                        <button onclick="location.href='${order_dpj[i].del_btn[1]}'">${order_dpj[i].del_btn[0]}</button>
                                                    </li>
                                                    <li>
                                                        <button class="inn" onclick="location.href='${order_dpj[i].evaluate_btn[1]}'">${order_dpj[i].evaluate_btn[0]}</button>
                                                    </li>
                                                </ul>
                                                <div class="clear"></div>
                                            </div>
                                        </div>
                                    </div> 
                                `;
                            }

                            $('.myorder_dpj').append(str);

                            pageIndex ++;

                            console.log("pageIndex=" + pageIndex);
                            console.log("pageNum=" + pageNum);

                            if(pageNum == pageIndex){
                                $(window).unbind('scroll'); //初始化滚动事件

                                $('.scobt').show();
                            }
                        },
                        error: function () {
                            console.log("false");
                        } 
                    });
                }
            });
        }                
    },

    //退款
    order_tk: function(){
        this.reset();

        current = this.current;

        if(pageIndex == 1) {
            $.ajax({
                url: bMock.getFace("order_tk"),
                type:"get",
                dataType:"json",
                /*data: {
                    current: current,     //每页数据
                    pageIndex: pageIndex  //当前页码
                },*/
                success:function(data,status){
                    var order_tk = data.data;
                    var str = '';

                    if(order_tk.length > current){
                        for(var i=0; i<current; i++){
                            str += `
                                <div class="modrct_wrap">
                                    <a href="javascript:;">
                                        <div class="modrct_title">
                                            <div class="modrct_cot">
                                                <ul class="modrct_juify">
                                                    <li>
                                                        <dl>
                                                            <dd>
                                                                <div class="modrct_sign">
                                                                    <img src="${order_tk[i].portrait}">
                                                                </div>
                                                            </dd>
                                                            <dd>${order_tk[i].name}</dd>
                                                        </dl>
                                                    </li>
                                                    <li>${order_tk[i].paystatus}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="modrct_body">
                                            <div class="modrct_cot">
                                                <div class="modrct_body_pic">
                                                    <img src="${order_tk[i].img}">
                                                </div>
                                                <div class="modrct_body_txt">
                                                    <ul>
                                                        <li>
                                                            <h1>${order_tk[i].title}</h1>
                                                        </li>
                                                        <li>
                                                            <dl>
                                                                <dd>
                                                                    <h2>${order_tk[i].lab[0]}</h2>
                                                                </dd>
                                                                <dd>
                                                                    <h2>${order_tk[i].lab[1]}</h2>
                                                                </dd>
                                                            </dl>
                                                        </li>
                                                        <li>
                                                            <ol class="modrct_juify">
                                                                <li>
                                                                    <dl>
                                                                        <dd>
                                                                            <h3>￥${order_tk[i].price}</h3>
                                                                        </dd>
                                                                        <dd>
                                                                            <h4>￥${order_tk[i].lastprice}</h4>
                                                                        </dd>
                                                                    </dl>
                                                                </li>
                                                                <li>
                                                                    <h2>数量：${order_tk[i].number}</h2>
                                                                </li>
                                                            </ol>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modrct_price">
                                            <div class="modrct_cot">
                                                <ul>
                                                    <li>共${order_tk[i].number}件商品</li>
                                                    <li>合计：￥${order_tk[i].price}（含运费￥${order_tk[i].freight})</li>
                                                </ul>
                                                <div class="clear"></div>
                                            </div>
                                        </div>
                                    </a>  
                                    <div class="modrct_btn">
                                        <div class="modrct_cot">
                                            <ul>
                                                <li>
                                                    <button onclick="location.href='${order_tk[i].view_btn[1]}'">${order_tk[i].view_btn[0]}</button>
                                                </li>
                                            </ul>
                                            <div class="clear"></div>
                                        </div>
                                    </div>
                                </div> 
                            `;
                        }

                        $('.myorder_tk').html(str);
                    } else {
                        for(var i=0; i<order_tk.length; i++){
                            str += `
                                <div class="modrct_wrap">
                                    <a href="javascript:;">
                                        <div class="modrct_title">
                                            <div class="modrct_cot">
                                                <ul class="modrct_juify">
                                                    <li>
                                                        <dl>
                                                            <dd>
                                                                <div class="modrct_sign">
                                                                    <img src="${order_tk[i].portrait}">
                                                                </div>
                                                            </dd>
                                                            <dd>${order_tk[i].name}</dd>
                                                        </dl>
                                                    </li>
                                                    <li>${order_tk[i].paystatus}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="modrct_body">
                                            <div class="modrct_cot">
                                                <div class="modrct_body_pic">
                                                    <img src="${order_tk[i].img}">
                                                </div>
                                                <div class="modrct_body_txt">
                                                    <ul>
                                                        <li>
                                                            <h1>${order_tk[i].title}</h1>
                                                        </li>
                                                        <li>
                                                            <dl>
                                                                <dd>
                                                                    <h2>${order_tk[i].lab[0]}</h2>
                                                                </dd>
                                                                <dd>
                                                                    <h2>${order_tk[i].lab[1]}</h2>
                                                                </dd>
                                                            </dl>
                                                        </li>
                                                        <li>
                                                            <ol class="modrct_juify">
                                                                <li>
                                                                    <dl>
                                                                        <dd>
                                                                            <h3>￥${order_tk[i].price}</h3>
                                                                        </dd>
                                                                        <dd>
                                                                            <h4>￥${order_tk[i].lastprice}</h4>
                                                                        </dd>
                                                                    </dl>
                                                                </li>
                                                                <li>
                                                                    <h2>数量：${order_tk[i].number}</h2>
                                                                </li>
                                                            </ol>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modrct_price">
                                            <div class="modrct_cot">
                                                <ul>
                                                    <li>共${order_tk[i].number}件商品</li>
                                                    <li>合计：￥${order_tk[i].price}（含运费￥${order_tk[i].freight})</li>
                                                </ul>
                                                <div class="clear"></div>
                                            </div>
                                        </div>
                                    </a>  
                                    <div class="modrct_btn">
                                        <div class="modrct_cot">
                                            <ul>
                                                <li>
                                                    <button onclick="location.href='${order_tk[i].view_btn[1]}'">${order_tk[i].view_btn[0]}</button>
                                                </li>
                                            </ul>
                                            <div class="clear"></div>
                                        </div>
                                    </div>
                                </div> 
                            `;
                        }

                        $('.myorder_tk').html(str);
                    }
                },
                error: function(){
                    console.log(false);
                }
            });

            pageIndex ++;
        }

        if(pageIndex > 1){
            $(window).scroll(function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
                    $.ajax({
                        url: bMock.getFace("order_tk"),
                        type:"get",
                        dataType:"json",
                        /*data: {
                            current: current,     //每页数据
                            pageIndex: pageIndex  //当前页码
                        },*/
                        success: function(data, status){
                            var order_tk = data.data;
                            var str = '';
                            var count = data.length;
                            console.log("总数据条数=" + count);
                            
                            // 总页码
                            if(count % current == 0){
                                var pageNum = parseInt(count / current); 
                            } else {
                                var pageNum = parseInt(count / current) + 1;
                            }

                            for(var i=0; i<order_tk.length; i++){
                                str += `
                                    <div class="modrct_wrap">
                                        <a href="javascript:;">
                                            <div class="modrct_title">
                                                <div class="modrct_cot">
                                                    <ul class="modrct_juify">
                                                        <li>
                                                            <dl>
                                                                <dd>
                                                                    <div class="modrct_sign">
                                                                        <img src="${order_tk[i].portrait}">
                                                                    </div>
                                                                </dd>
                                                                <dd>${order_tk[i].name}</dd>
                                                            </dl>
                                                        </li>
                                                        <li>${order_tk[i].paystatus}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="modrct_body">
                                                <div class="modrct_cot">
                                                    <div class="modrct_body_pic">
                                                        <img src="${order_tk[i].img}">
                                                    </div>
                                                    <div class="modrct_body_txt">
                                                        <ul>
                                                            <li>
                                                                <h1>${order_tk[i].title}</h1>
                                                            </li>
                                                            <li>
                                                                <dl>
                                                                    <dd>
                                                                        <h2>${order_tk[i].lab[0]}</h2>
                                                                    </dd>
                                                                    <dd>
                                                                        <h2>${order_tk[i].lab[1]}</h2>
                                                                    </dd>
                                                                </dl>
                                                            </li>
                                                            <li>
                                                                <ol class="modrct_juify">
                                                                    <li>
                                                                        <dl>
                                                                            <dd>
                                                                                <h3>￥${order_tk[i].price}</h3>
                                                                            </dd>
                                                                            <dd>
                                                                                <h4>￥${order_tk[i].lastprice}</h4>
                                                                            </dd>
                                                                        </dl>
                                                                    </li>
                                                                    <li>
                                                                        <h2>数量：${order_tk[i].number}</h2>
                                                                    </li>
                                                                </ol>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modrct_price">
                                                <div class="modrct_cot">
                                                    <ul>
                                                        <li>共${order_tk[i].number}件商品</li>
                                                        <li>合计：￥${order_tk[i].price}（含运费￥${order_tk[i].freight})</li>
                                                    </ul>
                                                    <div class="clear"></div>
                                                </div>
                                            </div>
                                        </a>  
                                        <div class="modrct_btn">
                                            <div class="modrct_cot">
                                                <ul>
                                                    <li>
                                                        <button onclick="location.href='${order_tk[i].view_btn[1]}'">${order_tk[i].view_btn[0]}</button>
                                                    </li>
                                                </ul>
                                                <div class="clear"></div>
                                            </div>
                                        </div>
                                    </div> 
                                `;
                            }

                            $('.myorder_tk').append(str);

                            pageIndex ++;

                            console.log("pageIndex=" + pageIndex);
                            console.log("pageNum=" + pageNum);

                            if(pageNum == pageIndex){
                                $(window).unbind('scroll'); //初始化滚动事件

                                $('.scobt').show();
                            }
                        },
                        error: function () {
                            console.log("false");
                        } 
                    });
                }
            });
        }                
    },
}

//加载订单
var loadOrder = function(){
    //全部
    orderPageAjax.order_all();

    $('.all').click(function(){
        orderPageAjax.order_all();
    });

    //待付款
    $('.dfk').click(function(){
        pageIndex = 1;
        orderPageAjax.order_dfk();
    });

    //进行中
    $('.jxz').click(function(){
        pageIndex = 1;
        orderPageAjax.order_jxz();
    });

    //待收货
    $('.dsh').click(function(){
        pageIndex = 1;
        orderPageAjax.order_dsh();
    });

    //待评价
    $('.dpj').click(function(){
        pageIndex = 1;
        orderPageAjax.order_dpj();
    });

    //退款
    $('.tk').click(function(){
        pageIndex = 1;
        orderPageAjax.order_tk();
    });
    
}

//页面交互
var tip = function(){
    //选项卡
    $('.myorder_top li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('.myorder_cont section').eq($(this).index()).show().siblings().hide();
    });

    //回到顶部
    $('.scrolltop').click(function(){
        var speed=200;//滑动的速度
        $('body,html').animate({ scrollTop: 0 }, speed);
        return false;
    });
}

$(function(){
    tip();  //页面交互
    loadOrder(); //加载订单
});