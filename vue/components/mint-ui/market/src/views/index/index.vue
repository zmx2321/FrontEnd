<template>
	<div class="page-wrap">
		<!-- tabbar -->
		<mt-tabbar v-model="tabSelected" fixed class="tabbar">
			<mt-tab-item id="sel1">
				<span>借啊</span>
			</mt-tab-item>
			<mt-tab-item id="sel2">
				<img src="" alt="">
				<span>借款</span>
			</mt-tab-item>
			<mt-tab-item id="sel3">
				<img src="" alt="">
				<span>我的</span>
			</mt-tab-item>
		</mt-tabbar>

		<!-- tabcontainer -->
		<mt-tab-container class="page-tabbar-container" v-model="tabSelected">
			<!--sel1-->
			<mt-tab-container-item id="sel1" class="tabcont">
				<mt-swipe :auto="4000" class="swp">
					<mt-swipe-item>1</mt-swipe-item>
					<mt-swipe-item>2</mt-swipe-item>
					<mt-swipe-item>3</mt-swipe-item>
				</mt-swipe>

				<div class="banbar"></div>

				<div class="cotbar">
					<ul>
						<li>热门借款</li>
						<li>查看更多</li>
					</ul>
				</div>

				<div class="tablist">

				</div>
			</mt-tab-container-item>

			<!--sel2-->
			<mt-tab-container-item id="sel2">
				<mt-cell title="借款" align="center" />
				<div class="page-navbar">
					<!-- navbar -->
					<mt-navbar class="page-part navbar" v-model="navSelected">
						<mt-tab-item id="1">推荐</mt-tab-item>
						<mt-tab-item id="2">新产品</mt-tab-item>
						<mt-tab-item id="3">极速放款</mt-tab-item>
						<mt-tab-item id="4">额度大</mt-tab-item>
					</mt-navbar>

					<!-- tabcontainer -->
					<mt-tab-container v-model="navSelected" class="tabcont">
						<!--推荐-->
						<mt-tab-container-item id="1">
							<div class="tablist">

							</div>
							<div class="tablist">

							</div>
							<div class="tablist">

							</div>
							<div class="tablist">

							</div>
						</mt-tab-container-item>
						<!--新产品-->
						<mt-tab-container-item id="2">
							<div class="tablist">

							</div>
						</mt-tab-container-item>
						<!--极速放款-->
						<mt-tab-container-item id="3">
							<div class="tablist">

							</div>
						</mt-tab-container-item>
						<!--额度大-->
						<mt-tab-container-item id="4">
							<div class="tablist">

							</div>
						</mt-tab-container-item>
					</mt-tab-container>
				</div>
			</mt-tab-container-item>

			<!--sel3-->
			<mt-tab-container-item id="sel3">
				<div class="f-pr ffhad">
					<div class="circle"></div>
					<span>123456789</span>
				</div>
				<div class="ffcot">
					<div class="fctlt">
						<mt-cell title="贷款浏览记录" href="//github.com" is-link>
							<img slot="icon" src="../../assets/img/tt.png" width="24" height="24">
						</mt-cell>
					</div>
					<div class="fctlt">
						<mt-cell title="咨询客服" href="//github.com" is-link>
						<img slot="icon" src="../../assets/img/tt.png" width="24" height="24">
					</mt-cell>
					</div>
				</div>
			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>

export default {
	name: 'index',

	components: { 

	},

	data(){
		return{
            tabSelected: 'sel1',
            navSelected: "1",
		}
	},

	computed:{

	},
	methods:{

	}
}
</script>
<style lang="less" scoped>
	.swp {
		z-index: -1;
		height: 100px;
		background: #f00;
	}

	.tabbar {
		background: #fff;
		border-top: solid 1px #eeeeee;
		min-height: 1.5rem;

		.mint-tab-item {
			span {
				/*display: block;*/
				/*height: 30px;*/
				/*line-height: 30px;*/
			}
		}
	}

	.banbar {
		width: 100%;
		height: 1.2rem;
		background: #f00;
		margin: 0.3rem 0;
	}

	.cotbar {
		background: #fff;
		height: 1rem;

		ul {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			width: 90%;
			margin: 0 auto;

			li{
				height: 1rem;
				line-height: 1rem;
			}
		}
	}

	.tabcont {
		padding-bottom: 1.6rem;

		.tablist {
			width: 100%;
			height: 133px;
			border-bottom: solid 1px #efefef;
			background: #fec9c9;
			margin-bottom: 0.3rem;
		}
	}

	.navbar {
		background: initial;

		.mint-tab-item:not(:last-child) {
			/*margin-right: 0.5rem;*/
		}

		.mint-tab-item {
			/*height: 1.1rem;*/
			background: #fff;
		}
	}

	.ffhad {
		width: 100%;
		height: 5rem;
		background: #fff;
		margin-bottom: 0.2rem;

		.circle {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 2.6rem;
			height: 2.6rem;
			overflow: hidden;
			border-radius: 1.3rem;
			background: #f00;
		}

		span {
			position: absolute;
			bottom: 0.5rem;
			width: 100%;
			text-align: center;
			font-size: 0.35rem;
			letter-spacing: 0.03rem;
			font-weight: bold;
		}
	}

	.ffcot {
		width: 100%;
		min-height: 11.8rem;
		background: #fff;
	}

	.fctlt {
		width: 100%;
		background: #fff;

		.mint-cell {
			background: none;
		}
	}
</style>

