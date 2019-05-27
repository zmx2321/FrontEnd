<template>
  <div style="height:100%;">
    <loading :show="isLoading" position="absolute"></loading>
    <view-box v-ref:view-box>
      <!--default slot-->
      <div>
        <router-view
        :transition="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')"
        ></router-view>
      </div>
    </view-box>
  </div>
</template>
<script>
import {Loading, ViewBox} from 'vux-components'

export default {
  ready () {
  },
  data () {
    return {
      isIndex: true
    }
  },
  components: {
    Loading,
    ViewBox
  }
}
</script>

<style lang="less">
@import '~vux/dist/vux.css';
@import './assets/css/common.css';
body { 
  background-color: #fff;  
}
  
.vux-header .vux-header-left .vux-header-back:before{border: 0;background-image: url('assets/img/ic_dinner_back.png');background-size: 100% 100%;background-repeat: no-repeat;-webkit-transform: rotate(0deg);transform: rotate(0deg);width: 21/40rem;height: 40/40rem;top:0;}
.vux-demo-header-box {z-index: 100;position: absolute;width: 100%;left: 0;top: 0;}
.page .vux-header{background-color: #ffbb22;padding: 0;height: 96/40rem;}
.weui_tabbar{height: 98/40rem;background-color: #f6f6f6;}
.weui_tabbar_icon{width: 48/40rem;height: 48/40rem;}
.weui_tabbar_label{font-size: 20/40rem;}
.weui_tabbar_icon+.weui_tabbar_label{margin-top: 0;}
.weui_tabbar:before{border-top: 0;}
.vux-header-title{margin: 0 108/40rem !important;}
.vux-header .vux-header-left, .vux-header .vux-header-right{top: 24/40rem;}
.vux-header .vux-header-right{right: 15/40rem;}
.vux-header .vux-header-left{left: 15/40rem;}
.vux-header .vux-header-title, .vux-header h1{color: #fff;font-size: 36/40rem;line-height: 96/40rem;}  
.weui_tab_bd{padding-bottom: 0;}
.weui_tabbar_item.weui_bar_item_on .weui_tabbar_label{
  color: #ffbb22;
}    
.content{top: 96/40rem;bottom: 98/40rem;left:0;right:0;overflow: auto; position: absolute;}
.xs-plugin-pulldown-container{
  font-size: 0.75rem;
  color: #262626;
}
.xs-plugin-pulldown-loading{
  font-size: 0.75rem;
  color: #262626;
}
.xs-plugin-pullup-container{
  font-size: 0.75rem;
  color: #262626;
}
.xs-plugin-pullup-loading{
  font-size: 0.75rem;
  color: #262626;
}
.scroll-block{
  display: inline-block;
}
</style>
