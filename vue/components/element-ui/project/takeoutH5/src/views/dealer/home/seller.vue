<template>
  <div class="page bg" transition="app">
    <x-header :left-options="{showBack:false}">
      <a slot="right" @click="rightClick()">
        <img src="../../../assets/img/ic_dinner_search.png" class="img-search" />
      </a>
      商品管理
    </x-header>
    <div class="tab">
      <span class="tab-item" @click="tabClick(true)" :class="{'selected' : switchTag}">已上架</span>
      <span class="tab-item" :class="{'selected' : !switchTag}" @click="tabClick(false)">已下架</span>
    </div>
    <div class="content vux-1px-t">
      <scroller height="100%" class="float-left" lock-x v-ref:scrollered>
        <div>
          <ul v-for="(position,item) in categoryList" class="menu">
            <li  class="flex menu-item vux-1px-b" @click="menuClick(position,item.id)" :class="{'checked' : position === index}">
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
      </scroller>
      <seller-index v-ref:sellered @click-detail="detail"></seller-index>
    </div>
    <div @click="add" class="div-add">
      <img src="../../../assets/img/ic_add.png"></div>
    <bottom-bar  :index="1"></bottom-bar>
    <div v-if="isShowAdd" class="div-options">
      <div class="div-content">
        <x-button @click="addCategory" class="add-category">添加分类</x-button>
        <x-button @click="addDish" class="add-dish">添加菜品</x-button>
        <x-button @click="addCancel" class="div-cancel">取消</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import XHeader from 'vux-components/x-header'
import Scroller from 'vux-components/scroller'
import XButton from 'vux-components/x-button'
import SellerIndex from '../../../components/SellerIndex'
import BottomBar from '../../../components/bottombar'
var url = require('aUrl')
export default {
  components: {
    Scroller,
    SellerIndex,
    XHeader,
    BottomBar,
    XButton
  },
  ready:function(){
    // this.getcategory();
  },
  data () {
    return {
      categoryList:[{
        id:1,
        name:'手撕傻逼'
      },{
        id:2,
        name:'鬼子哪里跑'
      },{
        id:3,
        name:'妖艳绿茶婊'
      }],
      search:'',
      switchTag: true,
      index:0,
      isShowAdd:false
    };
  },

  methods: {
    getcategory:function(){
     
    },

    tabClick:function(switchTag){
      this.switchTag = switchTag;
      this.$refs.sellered.type = switchTag?0:1;
    },

    menuClick:function(index,id){
      this.index = index;
      // this.$refs.sellered.klass = id;
      // this.$refs.sellered.requestData(1);
    },

    rightClick:function(){
      },

    add:function(){
      this.isShowAdd = true;
    },

    addCategory:function(){
      //添加分类
    },

    addDish:function(){
      //添加菜品
    },

    addCancel:function(){
      //取消弹框
      this.isShowAdd = false;
    },

    detail:function(id){
    }
  }
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/1px.less';
  .content{
    top: 4.8rem;
  }
  .div-options{
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
    div{
      position: absolute;
      left: 0;
      right: 0;
      bottom:0;
      padding: 0.75rem;
    }
  }
  .div-add{
    position: absolute;
    right: 1.25rem;
    bottom: 4rem;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    z-index: 1000;
    box-shadow:3px 3px 5px rgba(0,0,0,0.1);
    img{
      width: 2.2rem;
      height: 2.2rem;
    }
  }
  .tab{
    display: flex;
    display: -webkit-box;
    position: relative;
    line-height: 2.4rem;
    font-size: 0.7rem;
  }
  .tab-item{
    flex: 1;
    -webkit-box-flex: 1;
    display: block;
    width: 100%;
    height: 100%;
    background-color:#f6f6f6;
    color: #999;
    box-sizing: border-box;
    text-align: center;

  }
  .tab-item.selected{
    color: #2e2e2e;
    background-color:#fff
  }
  .menu{
      width: 94px;
    }
  .menu-item{
      height: 60px;
      flex-direction:row;
      align-items:center;
      justify-content:center;
      background-color:#f6f6f6;
      color: #666;
      font-size:12px;
      text-align: center;
    }
  .menu-item.checked{
      color: #2e2e2e;
      background-color:#fff
    }
  .img-search{
    width: 1.1rem;
    height: 1.1rem;
  }
</style>
<style lang="less">
  button.weui_btn.add-category{
    background-color: #ff6b6b;
    color: #fff;
    font-size: 0.9rem;
    height: 2.4rem;
    width: 100%;
  }
  button.weui_btn.add-dish{
    background-color: #fff;
    color: #000;
    font-size: 0.9rem;
    height: 2.4rem;
    width: 100%;
    margin-top: 0.5rem;
  }
  button.weui_btn.div-cancel{
    font-size: 0.8rem;
    background-color: rgba(0, 0, 0, 0);
    color: #fff;
    text-align: center;
    outline: none;
    height: 2.2rem;
    width: 100%;
    margin-top: 0.5rem;
  }
  button.weui_btn.div-cancel:after{
    border: 0;
  }
</style>