<template>
<scroller lock-x scrollbar-y use-pulldown use-pullup
  @pulldown:loading="refresh"
  :pullup-config="pullupConfig" height="100%" :pulldown-config="pulldownConfig" :pullup-config="pullupConfig" @pullup:loading="loadMore" v-ref:scroller>
		<div>
			<div @click="" class="text-content clear-both" v-for="item in 40">
				<div>
        <div class="float-left" style="position:relative;line-height: 0" >
          <img class="img bg-shadow" src="../assets/img/ic_pig_rect.png">
          <div v-if="type == 1" class="overlay"><span class="text-off">已下架</span></div>
        </div>
					<div class="right-content">
						<div>
							<p class="text-name font-two-line-ellipsis">青椒炒小鬼子</p>
							<p class="gray text-name describe font-two-line-ellipsis" style="margin-top:6px;">小鬼子炒出来的味道极好，爱吃不吃，不吃喂猪！！！</p>
						</div>
					</div>
				</div>
				<div class="price clear-both">
					<span class="font-price">¥66.66</span>
				</div>
				<div class="vux-1px-t line-top"></div>
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
var url = require('aUrl')
export default {
  components: {
    Scroller,
    Loading
  },
  props:{
    state:{
      type:Number,
      default:0
    },
    search:{
      type:String,
      default:''
    },
    klass:{
      type:Number,
      default:''
    },
    noItem:{
      type:Boolean,
      default:false
    },
    type:{
      type:Number,
      default:0
    }
  },
  data () {
    return {
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
      lastIndex:1,   //上次加载的序号
      itemsPerLoad:20 ,   //最多可加载的条目
      toast : {
        show : false,
        msg: ''
      },
      loading:{
        show:false
      }
    };
  },
  methods: {

    requestData:function(index){
        this.list = [];
    },

      loadMore () {
          // this.requestData(this.lastIndex++);
           setTimeout(() => {
                this.$nextTick(() => {
                   this.$broadcast('pullup:reset', this.$refs.scroller.uuid);
              })
           }, 2000)
      },

      refresh () {
          // this.requestData(1);
          setTimeout(() => {
                this.$nextTick(() => {
                this.$broadcast('pulldown:reset', this.$refs.scroller.uuid);
              })
           }, 2000)
      },

      detail:function(id){
        this.$emit("click-detail",id);
      }

  }
}
</script>

<style scoped>
@import '~vux/src/styles/1px.less';
.text-content{
  margin-left: 0.5rem;
  padding-top: 0.75rem;
  padding-right: 0.75rem;
}
.right-content{
  margin-left:3.5rem;
}
.overlay {    
  position: absolute;    
  top: 0px;       
  z-index: 10001;      
  filter:alpha(opacity=60);    
  text-align: center;
  width: 3rem;
  height: 3rem;    
  background-color:rgba(0,0,0,0.3);
}    

.text-off{
  font-size:0.75rem;
  color: #fff;
  line-height: 3rem;
}

.text-name.describe{
  max-height:1.6rem;
  margin-top:0.3rem;
  line-height:1.4;
}
.price{
  margin-top:0.6rem;
  margin-left:3.5rem;
  line-height: 1;
}
.line-top{
  margin-top:0.75rem;
}
</style>