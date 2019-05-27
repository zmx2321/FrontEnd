<template>
  <tabbar>
      <tabbar-item v-link="{path:'order'}">
          <img slot="icon" src="../assets/img/ic_order.png" class="iconhome" v-if="index!=0">
          <img slot="icon" src="../assets/img/ic_order_1.png" class="iconhome" v-if="index==0">
          <span slot="label" v-bind:class="{'_color':index==0}">订单管理</span> 
      </tabbar-item>
      <tabbar-item v-link="{path:'seller'}">
          <img slot="icon" src="../assets/img/ic_product.png" class="iconfvr" v-if="index!=1">
          <img slot="icon" src="../assets/img/ic_product_1.png" class="iconfvr active" v-if="index==1">
          <span slot="label" v-bind:class="{'_color':index==1}">商品管理</span> 
      </tabbar-item>
      <tabbar-item v-link="{path:'account'}">
          <img slot="icon" src="../assets/img/ic_account.png" class="iconinfo" v-if="index!=2">
          <img slot="icon" src="../assets/img/ic_account_1.png" class="iconinfo" v-if="index==2">
          <span slot="label" v-bind:class="{'_color':index==2}">个人中心</span> 
      </tabbar-item>
    </tabbar>
</template>

<script>
import {Tabbar, TabbarItem} from 'vux-components'

export default {
  components: {
     Tabbar, TabbarItem
  },
  ready:function(){
    // if(!localStorage.token || !localStorage.islogin){
    //     this.$route.router.go({path:'/account/login'});
    //   }
  },
  data(){
    return {

    }
  },
  props: {
    index: {
      type: Number,
      default: 'cancel'
    }
  },
}
</script>
<style scoped lang="less">
  ._color{ 
    color: #ffbb22;
  }
</style>