<template>
  <div class="page bg" transition="app">
    <x-header @on-click-back="clickback()" :left-options="{showBack:true,preventGoBack:true}">
      <a slot="right" @click="rightClick()">
        <img src="../../../assets/img/ic_dinner_search.png" class="img-search" />
      </a>
      订单管理
    </x-header>
    <tab active-color='#ffbb22'>
      <tab-item active-class="active-6-2 " v-for="item in list2" :selected="temp === item" @click="tabClick(item)">{{item}}</span>
    </tab-item>
  </tab>
  <div class="content">
    <order-index v-ref:ivoke></order-index>
  </div>
  <bottom-bar :index="0"></bottom-bar>
</div>
</template>
<script>
import XHeader from 'vux-components/x-header'
import Tab from 'vux-components/tab/tab'
import TabItem from 'vux-components/tab/tab-item'
import Scroller from 'vux-components/scroller'
import Loading from 'vux-components/loading'
import BottomBar from '../../../components/bottombar'
import OrderIndex from '../../../components/OrderIndex'

const list = () => ['待处理', '已确认', '已收货', '已完成']

export default {
  components: {
    Tab,
    TabItem,
    OrderIndex,
    BottomBar,
    XHeader
  },

  data () {
    return {
      temp:'待处理',
      list2:list()
    };
  },
  methods: {
    clickback:function(){
      this.$route.router.go({path:'/user/home'});
    },
    tabClick:function(item){
      this.temp = item;
      this.$refs.ivoke.requestData(item);
    },
    rightClick:function(){
        this.$route.router.go({
            path:"/order/search", query: {
                        type: 0,
                    }});
         
      },
  }
}
</script>

<style scoped>
.content{
    top: 4.6rem;
  }
.active-6-2 {
  color: #ffab00;
}
.img-search{
  width: 1.1rem;
  height: 1.1rem;
}
</style>