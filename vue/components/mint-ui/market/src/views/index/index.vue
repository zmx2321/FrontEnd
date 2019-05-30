<template>
	<div class="page-wrap">
		<!-- tabbar -->
		<mt-tabbar v-model="tabSelected" fixed class="tabbar">
			<mt-tab-item id="sel1">
				<div class="tabslwp" @click="ja">
					<span>借啊</span>
				</div>
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
					<mt-swipe-item v-for="(item,index) in banner" :key="index">
						<img :src="item.img" :alt="item.title">
					</mt-swipe-item>
				</mt-swipe>

				<div class="banbar">
					<marquee behavior="scroll" style="color:red; font-size:large">dddddddddddddddd</marquee>
				</div>

				<div class="cotbar">
					<ul>
						<li>热门借款</li>
						<li>查看更多</li>
					</ul>
				</div>
				<!--adminId: 3
				archive: 0
				categoryId: 1
				createAt: "2019-05-30 01:36:01"
				desc: "借呗日下17万"
				descAmount: "1111"
				descApplyMaterials: "111"
				descApplyNum: "1111"
				descApplyRequires: "111"
				descDate: "1111"
				descDatesGivenMoney: "1111"
				descRefundWays: "111"
				icon: "https://iconfont.alicdn.com/t/1546597984039.jpeg@100h_100w.jpg"
				id: 84
				linkId: 12
				memo: "111"
				mobile: "15777777777"
				rateMonth: "1111"
				ratePass: "1111"
				realName: "李四"
				sort: 111
				tags: "1111"
				title: "222222"
				updateAt: "2019-05-30 01:43:42"
				url: "http://qq.com"-->
				<div class="ltwp">
					<div class="tablist" v-for="(item,index) in product" :key="index">
						<a :href="item.url">
							<div class="tblimg f-oh">
								<div class="imgwp f-fl">
									<img :src="item.icon" :alt="item.title">
								</div>
								<span class="f-fl">{{ item.title }}</span>
								<span class="f-fl tbdsc">{{ item.desc }}</span>
							</div>
						</a>
					</div>
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
							<div class="ltwp" v-infinite-scroll="loadMore"
								 infinite-scroll-disabled="loading"
								 infinite-scroll-distance="10">
								<div class="tablist" v-for="(item,index) in product" :key="index">
									<a :href="item.url">
										{{ item.id }}
										{{ item.title }}
									</a>
								</div>
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

import {
    banner,
    product,
    category
} from "../../server/api"

export default {
	name: 'index',

	components: { 

	},

	data(){
		return{
            tabSelected: 'sel1',
            navSelected: "1",

			banner: [],
            product: [],
            category: [],

			page_arg: {
                pageNum: 1,
                pageSize: 5,
                total: "",
			}
		}
	},

	computed:{

	},
	methods:{
	    /**
		 * api banner
		 */
		getBanner() {
            banner().then(res => {
                let datas = res.data.data;

                this.banner = datas;
			}).catch({});
		},
	    /**
		 * api product
		 */
		getProduct() {
            let params = {
                pageNum: this.page_arg.pageNum,
                pageSize: this.page_arg.pageSize,
                // categoryId: 0,
			}

            product(params).then(res => {
                // console.log(res.data.data.set);

                let datas = res.data.data.set;

                this.product = datas;

                this.page_arg.total = res.data.data.pager.total;
			}).catch({});
		},

        /*loadMore() {
            this.loading = true;
            setTimeout(() => {
                let last = this.page_arg.total;

                for (let i = 1; i <= 5; i++) {
                    this.product.push(last + i);
                }
                this.loading = false;
            }, 2500);
        },*/

	    /**
		 * api category
		 */
		getCategory() {
            category().then(res => {
                // console.log(res.data.data);

                let datas = res.data.data;

                this.category = datas;
			}).catch({});
		},

		// 借啊
        ja() {
            let params = {
                pageNum: this.page_arg.pageNum,
                pageSize: this.page_arg.pageSize,
                categoryId: 0,
            }

            product(params).then(res => {
                // console.log(res.data.data.set);

                let datas = res.data.data.set;

                this.product = datas;

                this.page_arg.total = res.data.data.pager.total;
            }).catch({});
		}
	},
    created() {
	    this.getBanner();
	    this.getProduct();
	    this.getCategory();
	}
}
</script>
<style lang="less" scoped>

	.swp {
		z-index: -1;
		height: 4.2rem;

		img{
			width: 100%;
			height: 100%;
		}
	}

	.tabbar {
		background: #fff;
		border-top: solid 1px #eeeeee;
		min-height: 1.5rem;

		.mint-tab-item {
			.tabslwp {
				display: block;
				width: 100%;
				min-height: 1.5rem;

				span {
					/*display: block;*/
					/*height: 30px;*/
					/*line-height: 30px;*/
				}
			}
		}
	}

	.banbar {
		width: 100%;
		height: 1rem;
		background: #fff;
		margin: 0.3rem 0;

		marquee {
			height: 1rem;
			line-height: 1rem;
			overflow: hidden;
		}
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
		padding-bottom: 2.5rem;

		.tablist {
			width: 100%;
			height: 133px;
			border-top: solid 1px #efefef;
			background: #fff;

			a{
				display: block;
				width: 100%;
				height: 100%;

				.tblimg {
					width: 5.5rem;
					height: 2rem;
					margin: 0.25rem 0 0 0.4rem;

					.imgwp {
						width: 2.5rem;
						height: 1.8rem;
						overflow: hidden;

						img {
							width: 100%;
							height: 100%;
						}
					}

					span{
						margin: 0.2rem 0 0 0.2rem;
						font-size: 0.22rem;
					}

					.tbdsc{
						margin-top: 0.8rem;
					}
				}
			}
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

