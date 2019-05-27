<template>
	<div class="page bg" transition="app">
		<x-header :left-options="{showBack:false}">个人中心</x-header>
		<div class="main-content">
			<div class="top">
				<div class="top-left">
					<img class="img float-left" :src=supplier.shop_img>
					<div class="font-2e top-name">
						<p>手撕傻逼</p>
						<p class="user-name">独孤裘</p>
					</div>
					<div class="clear-both"></div>
				</div>
				<div class="float-right top-right">
					<span class='font-f2' v-if="check1">营业中</span>
					<span class='font-f2' v-else>休息中</span>
					<input class="weui_switch switched" :checked="check1" type="checkbox" @click="change(0)"></input>
			</div>
		</div>
		<div class="line-space"></div>
		<ul class="font-2e">
			<li class="cell" @click="userProfile">
				<span class="float-left">我的资料</span>
				<img class="float-right arrow" src="../../../assets/img/ic_arrow.png"></li>
			<li class="cell vux-1px-t" @click="modifyPsw">
				<span class="float-left">修改密码</span>
				<img class="float-right arrow" src="../../../assets/img/ic_arrow.png"></li>
			<li class="cell vux-1px-t" @click="msgCenter">
				<span class="float-left">消息中心</span>
				<img class="float-right arrow" src="../../../assets/img/ic_arrow.png"></li>
			<li class="cell vux-1px-t">
				<span class="float-left">自动接单</span>
				<div class="float-right auto-order">
					<input class="weui_switch switched" :checked="check2" type="checkbox" @click="change(1)"/>
				</div>
			</li>
			<li class="line-space"></li>
			<li class="cell" @click="myAccount">
				<span class="float-left">我的账户</span>
				<img class="float-right arrow" src="../../../assets/img/ic_arrow.png"></li>
			<li class="cell vux-1px-t" @click="saleStatictis">
				<span class="float-left">销售统计</span>
				<img class="float-right arrow" src="../../../assets/img/ic_arrow.png"></li>
			<li class="cell vux-1px-t">
				<x-button class="logout" @click="logout">退出登录</x-button>
			</li>
		</ul>
	</div>
	<dialog :show.sync="dialog.show" :scroll="false">
		<div class="div-dialog">
			<p style="text-align: left;">{{dialog.msg}}</p>
			<div class="flex click-div">
				<span @click="cancel" class="click-text" style="text-align: left;">取消</span>
				<span @click="enter" class="click-text" style="text-align: right;">确定</span>
			</div>
		</div>
	</dialog>
	<bottom-bar :index="2"></bottom-bar>
	<toast :show.sync="toast.show" type="text" :time="1000" :callback="callback">
		  <p v-text="toast.msg"></p>
	</toast>
	<loading :show="loading.show" text="修改中..."></loading>
</div>
</template>

<script>
 import XHeader from 'vux-components/x-header'
 import Group from 'vux-components/group'
 import Cell  from 'vux-components/cell'
 import Switch from 'vux-components/switch'
 import XButton from 'vux-components/x-button'
 import Loading from 'vux-components/loading'
 import Dialog from 'vux-components/dialog'
 import BottomBar from '../../../components/bottombar'
 var url = require('aUrl')
 export default{
 	components:{
 		XHeader,
 		Group,
 		Cell,
 		Switch,
 		XButton,
 		Dialog,
 		BottomBar,
 		Loading
 	},
 	ready:function(){
 		this.initData();
 	},
 	data(){
 		return{
 			check1:false,
 			check2:false,
 			supplier:{},
 			dialog:{
 				type:0,
 				show:false,
 				msg:''
 			},
 			toast : {
	        show : false,
	        msg: ''
	      },
	      loading:{
	        show:false
	      }
 		};
 	},
 	methods:{
 		initData:function(){
	 		
		},

 		userProfile:function(){
 			//我的资料
			
 		},

 		modifyPsw:function(){
 			//修改密码
 			
 		},

 		msgCenter:function(){
 			//消息中心
 			
 		},

 		myAccount:function(){
 			//我的账户
 		
 		},

 		saleStatictis:function(){
 			//销售统计
 			
 		},

 		change:function(type){
 			this.dialog.type = type;
 			if(type == 0){
 				this.check1 = !this.check1;
 				if(this.check1){
	 				this.dialog.msg ='确定要将鬼子切换到超人形态么？切换后鬼子将很难打败!'
	 				this.dialog.show = this.check1;
 				}
 			}else{
 				this.check2 = !this.check2;
 				if(this.check2){
	 				this.dialog.msg ='是否要开启无敌模式呢？'
	 				this.dialog.show = this.check2;
 				}
 			}
 		},

 		logout:function(){
 			//退出登录,清空缓存
 			// localStorage.removeItem("token");
 			
 		},

 		cancel:function(){
 			this.dialog.show = false;
 			if(this.dialog.type == 0){
 			   this.check1 = false;
 			}else{
 				this.check2 = false;
 			}
 		},

 		enter:function(){
 			this.dialog.show = false;
 			if(this.dialog.type == 0){
 				this.check1 = true;
 			}else{
 				this.check2 = true;
 			}
 		}
 	}
 }

</script>
<style scoped lang="less">
@import '~vux/src/styles/1px.less';
	.main-content{
	  overflow-x: hidden;
	  overflow-y: scroll;
	  height: 80%;
	}
	::-webkit-scrollbar {
	  width: 0;
	  height: 0; 
	}
	.top{
		padding: 0.75rem;
	}
	.top-name{
		white-space: nowrap;
		max-width: 5rem;
		margin-left: 3.75rem;
		line-height: 1;
		padding-top: 0.4rem;
	}
	.top-left{
		width: auto;
		display:inline-block;
	}
	.user-name{
		margin-top: 0.75rem;
	}
	.top-right{
		height:3rem;
		line-height: 3rem;
	}
	.auto-order{
		height: 2.75rem;
		line-height: 2.75rem;
	}
	.weui_switch.switched:checked{
		border-color: #ffbb22;
		background-color: #ffbb22;
		vertical-align: middle;
	}
	.weui_switch.switched{
		vertical-align: middle;
	}
	.cell{
		list-style:none;
		height: 2.75rem;
		line-height: 2.75rem;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
	}
	.arrow{
		margin-top: 1rem;
		width: 0.4rem;
		height: 0.8rem;
	}
	button.weui_btn.logout{
		background-color: #ff6b6b;
		margin-top: 1.5rem;
		color: #fff;
		height: 2.4rem;
		float:right;
	}
	.div-dialog{
		padding-top: 1rem;
		padding-left: 1.2rem;
		padding-right: 1.2rem;
		padding-bottom: 1.5rem;
		font-size: 0.8rem;
		p{
			color: #666;
		}
	}
	.click-div{
		flex-direction: row;
		margin-top: 2.45rem;
		padding-left: 2.25rem;
		padding-right: 2.25rem;
	}
	.click-text{
		color: #ffbb22;
		flex: 1;
	}
</style>