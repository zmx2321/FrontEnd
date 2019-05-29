<template>
	<div class="page-wrap">
		<!-- tabbar -->
		<mt-tabbar v-model="tabSelected" fixed>
			<mt-tab-item id="sel1">选项一</mt-tab-item>
			<mt-tab-item id="sel2">选项二</mt-tab-item>
			<mt-tab-item id="sel3">选项三</mt-tab-item>
			<mt-tab-item id="sel4">选项四</mt-tab-item>
		</mt-tabbar>

		<!-- tabcontainer -->
		<mt-tab-container class="page-tabbar-container" v-model="tabSelected">
			<!--sel1-->
			<mt-tab-container-item id="sel1">
				<div class="page-navbar">
					<!-- navbar -->
					<mt-navbar class="page-part" v-model="navSelected">
						<mt-tab-item id="1">选项一</mt-tab-item>
						<mt-tab-item id="2">选项二</mt-tab-item>
						<mt-tab-item id="3">选项三</mt-tab-item>
					</mt-navbar>

					<!-- tabcontainer -->
					<mt-tab-container v-model="navSelected" class="tabcont">
						<mt-tab-container-item id="1">
							<mt-cell title="内容" />
							<mt-swipe :auto="4000">
								<mt-swipe-item>1</mt-swipe-item>
								<mt-swipe-item>2</mt-swipe-item>
								<mt-swipe-item>3</mt-swipe-item>
							</mt-swipe>

						</mt-tab-container-item>
						<mt-tab-container-item id="2">
							<mt-cell title="测试" />
						</mt-tab-container-item>
						<mt-tab-container-item id="3">
							<mt-cell title="选项" />
						</mt-tab-container-item>
					</mt-tab-container>
				</div>
			</mt-tab-container-item>

			<!--sel2-->
			<mt-tab-container-item id="sel2">
				<mt-cell title="订单" />
			</mt-tab-container-item>

			<!--sel3-->
			<mt-tab-container-item id="sel3">
				<mt-cell title="发现" />
			</mt-tab-container-item>

			<!--sel4-->
			<mt-tab-container-item id="sel4">
				<div class="page-part">
					<mt-cell title="我的" />
				</div>
				<router-link to="/">
					<!-- button -->
					<mt-button type="danger" size="large">退出</mt-button>
				</router-link>
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
.tabcont {
	padding-bottom: 20px;
}
</style>

