<template>
  <div class="page bg" transition="app">
    <x-header :left-options="{showBack:true}">订单详情</x-header>
    <div class="scroll">
      <ul>
        <li v-for="item in 3" class="top flex">
          <div class="flex" style="flex-direction:row;align-items:center;">
            <img class="img" src="http://7xjpiw.com1.z0.glb.clouddn.com/lmomxPrSpuaZ_DWLdg3Itl1EMxHD">
            <p class="font-2e font-one-line-ellipsis name">手撕鬼子</p>
          </div>
          <div class="flex" style="flex-direction:row;align-items:flex-end;line-height: 1;">
            <span class="count">x2</span>
            <p style="width: 3.3rem;" class="font-price">¥32.00</p>
          </div>
        </li>
        <li class="line-space"></li>
        <li class="item vux-1px-t">
          <span class="font-key">配送费</span>
          <span class="font-value1 float-right">¥12.00</span>
        </li>
        <li class="item vux-1px-t">
          <span class="font-key">优惠减免</span>
          <span class="font-value1 float-right">-¥5.00</span>
        </li>
        <li class="item vux-1px-t">
          <span class="font-key">订单金额</span>
          <span class="f-price float-right">¥10.00</span>
        </li>
        <li class="item vux-1px-t">
          <span class="font-key">支付方式</span>
          <span class="font-way float-right">支付宝支付</span>
        </li>
        <li class="item-group vux-1px-t">
          <span class="font-group">订单信息</span>
        </li>
        <li class="item">
          <span class="font-key">订单号码</span>
          <span class="font-value2">12</span>
        </li>
        <li class="item vux-1px-t">
          <span class="font-key">下单时间</span>
          <span class="font-value2">2016-12-11 12:42:12</span>
        </li>
        <li class="flex item vux-1px-t flex-address" style="height: auto;">
          <span class="font-key">订单备注</span>
          <span class="font-value2" style="flex:1;margin-left: 1.3rem">鬼子不要太辣了</span>
        </li>
        <li class="item-group vux-1px-t">
          <span class="font-group">配送信息</span>
        </li>
        <li class="item">
          <span class="font-key">收货姓名</span>
          <span class="font-value2">xrb</span>
        </li>
        <li class="item vux-1px-t">
          <span class="font-key">收货电话</span>
          <span class="font-value2">15878954562</span>
        </li>
        <li class="flex item vux-1px-t flex-address" style="height: auto;">
          <span class="font-key">收货地址</span>
          <span class="font-value2" style="flex:1;margin-left: 1.3rem;">大西洋彼岸</span>
        </li>
        <li class="item vux-1px-t">
          <span class="font-key">配送方式</span>
          <span class="font-value2">送货上门</span>
        </li>
        <li class="vux-1px-t"></li>
      </ul>
    </div>
    <toast :show.sync="toast.show" type="text" :time="1000" :callback="callback">
      <p v-text="toast.msg"></p>
    </toast>
  </div>
</template>

<script>

import XHeader from 'vux-components/x-header'
var url = require('aUrl');
const listKey = () => ['商品金额','配送费','优惠减免','订单金额','支付方式']

export default{
  components:{
    XHeader
  },
  ready:function(){
    let self = this;
    self.initData();
  },
  data(){
    return{
      order:{},
      orderId:this.$route.query.id,
      freePrice:0.00,
      payWay:'',
      toast:{
            show : false,
            msg: ''
          }
    }
  },
  methods:{
    initData:function(){
      // this.$http.get(url+'')
      //     .then(function(res){
      //       if(res.data.statusCode == 0){
      //         this.order = res.data.data;
      //         switch(this.order.pay_way) {
      //           case 0:
      //             this.payWay = '账户余额支付';
      //             break;
      //           case 1:
      //             this.payWay = '支付宝支付';
      //             break;
      //           case 2:
      //             this.payWay = '微信支付';
      //             break;
      //           case 3:
      //             this.payWay = '公众号支付';
      //             break;
      //           case 4:
      //             this.payWay = '一网通支付';
      //             break;
      //         }
      //         if(this.order.free_items != null && this.order.free_items.length > 0){
      //           this.freePrice = this.order.free_items[0].amount;
      //         }
      //       }else{
      //         this.toast.show = true;
      //         this.toast.msg = res.data.msg;
      //       }
      //     })
    }
  }
}

</script>

<style scoped lang="less">
@import '~vux/src/styles/1px.less';
.scroll{
  overflow-x: hidden;
  overflow-y: scroll;
  height: 90%;
}
.top{
    height: 4rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }
  .name{
    margin-left: 0.5rem;
    width: 6rem;
  }
  .count{
    color: #999;
    font-size: 0.6rem;
    margin-right: 0.5rem
  }
  .flex-address{
    flex-direction: row;
    align-items: center;
    padding-bottom: 0.6rem;
    padding-top: 0.6rem;
    span{
      line-height: 1.1rem;
    }
  }
  .item{
    height: 2.2rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  .font-key{
    word-break: keep-all;
    color: #999;
    font-size: 0.7rem;
    line-height: 2.2rem;
  }
  .font-value1{
    color: #2e2e2e;
    font-size: 0.6rem;
    line-height: 2.2rem;
  }
  .font-value2{
    color: #2e2e2e;
    font-size: 0.7rem;
    margin-left: 1rem;
  }
  .item-group{
    background-color: #f1f1f1;
    height: 2.2rem;
    line-height: 2.2rem;
    padding-left: 0.75rem;
  }
  .font-group{
    color: #666;
    font-size: 0.7rem;
  }
  .f-price{
    color: #ff4f22;
    font-size: 0.7rem;
    line-height: 2.2rem;
  }
  .font-way{
    color: #ffab00;
    font-size: 0.7rem;
    line-height: 2.2rem;
  }
</style>