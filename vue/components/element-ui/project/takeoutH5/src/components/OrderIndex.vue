<template>
  <scroller height="100%" lock-x scrollbar-y use-pulldown use-pullup
  @pulldown:loading="refresh" :pulldown-config="pulldownConfig"
  :pullup-config="pullupConfig" @pullup:loading="loadMore" v-ref:scrollercont>
    <div style="padding-bottom: 2.4rem;">
      <div v-for="i in n" class="clear-both" @click="itemClick">
        <div class="line-space"></div>
        <div class="main-content">
          <p>
            <span class="gray float-left">订单号:12312312</span>
            <span class="gray float-right">2012-02-03 12:42:12</span>
          </p>

        </div>
        <div class="main-content">
          <img class="img float-left" src="../assets/img/ic_pig_rect.png">
          <div class="content-right">
            <div>
              <span class="font-one-line-ellipsis text-name name">
                西红柿炒蛋西红柿炒蛋柿炒蛋西红柿炒蛋西红柿炒蛋西红柿炒蛋西红柿炒蛋西红柿炒蛋西红柿炒蛋西红柿炒蛋西红柿炒蛋西红柿炒蛋西红柿炒蛋西红柿炒蛋
              </span>
              <span class="font-count font-2e">x1</span>
            </div>
            <div>
              <div class="font-status">
                <span class="gray">当前状态：</span>
                <span class="font-f0">待处理</span>
              </div>
              <div>
                <span class="gray">配送方式：猪猪配送</span>
                <div class="float-right">
                  <span class="font-2e font-price-key">订单金额：</span>
                  <span class="font-price">¥230</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button class="btn-status">确认</button>
        </div>
      </div>
    </div>
  </scroller>
  <toast :show.sync="toast.show" type="text" :time="1000" :callback="callback">
    <p v-text="toast.msg"></p>
  </toast>
  <loading :show="loading.show" text="数据加载中"></loading>
</template>
<script>
import Scroller from 'vux-components/scroller'
import Loading from 'vux-components/loading'

export default {
  components: {
    Scroller,
    Loading
  },

  ready:function(){
    this.requestData();
  },

  data () {
    return {
      n: 20,
      n1: 10,
      pullupConfig:{
          content: '上拉加载',
          downContent: '释放加载',
          upContent: '上拉加载',
          loadingContent: '加载中'
        },
      pulldownConfig:{
          content: '下拉刷新',
          downContent: '释放刷新',
          upContent: '下拉刷新',
          loadingContent: '刷新中'
        },
      list:[],
      lastIndex:0 ,   //上次加载的序号
      maxItems:1 ,   //最多可加载的条目
      itemsPerLoad:20 ,   //最多可加载的条目
      toast : {
        show : false,
        msg: '验证码发送成功'
      },
      loading:{
        show:false
      }
    };
},
  methods: {

    requestData:function(item){
      //替换成自己的网络请求就好了
      // var orderUrl = '';
      // this.lastIndex = index;
      //   this.loading.show = true; 
      //   this.$http.get(url+orderUrl,this.search==''?{status:this.trateState,limit:this.itemsPerLoad,page:this.lastIndex}:{search:this.search,limit:this.itemsPerLoad,page:this.lastIndex})
      //       .then(function(res) {
      //          this.loading.show = false;
      //           if(res.data.data.data.length>0){
      //             this.noItem = true;
      //             if(this.lastIndex == 1){
      //               this.list = [];
      //             }
      //             for(var i = 0;i<res.data.data.data.length;i++){
      //                 this.list.push(res.data.data.data[i]);
      //             }

      //             if(!res.data.data.hasNext){
      //               this.$broadcast('pullup:disable', this.$refs.scroller.uuid);
      //             }else{
      //               this.$broadcast('pullup:enable', this.$refs.scroller.uuid);
      //             }
      //             this.$nextTick(() => {
      //                 this.$refs.scroller.reset()
      //             })
      //            }else{
      //             if(this.lastIndex == 1){
      //               this.noItem = false;
      //             }
      //            }
      //         })
    },

    itemClick:function(id){
      this.$route.router.go({path:"/order/detail",query:{
        id:id,
      }
     });
    },

   loadMore (uuid) {
      setTimeout(() => {
        this.n += 10
        this.$nextTick(() => {
          this.$broadcast('pullup:reset', uuid)
          if(this.n>=70){
              this.$broadcast('pullup:disable', uuid)
          }
        })
      }, 2000)
    },

    refresh (uuid) {
      setTimeout(() => {
        this.n = 3
        this.$nextTick(() => {
          this.requestData();
            this.$broadcast('pulldown:reset', uuid)
           this.$broadcast('pullup:disable', uuid)
        })
      }, 2000)
    }
  }
}
</script>

<style scoped>
.main-content{
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.6rem;
  line-height: 1;
  clear:left;
  display: block;
}
.name{
    margin-right: 1.2rem;
    height: 0.75rem;
    -webkit-line-clamp: 1;
}

.content-right{
  position:relative;
  margin-left:3.5rem;
  line-height: 1;
}

.font-count{
  position: absolute;
  top: 0;
  right: 0;
}
.font-status{
  margin-top: 0.3em;
}
.font-price-key{
  font-size: 0.6rem;
}
.btn-status{
  text-align:center;
  background-color:#ffbb22;
  color:#fff;
  width: 4rem;
  height:1.5rem;
  margin-top:0.75rem;
  float:right;
  border:0;
  clear: right;
}
</style>