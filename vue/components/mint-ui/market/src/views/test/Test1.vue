<template>
    <div className="page-wrap">
        <!-- tabbar -->
        <mt-tabbar v-model="selected" fixed>
            <mt-tab-item id="sel1">选项一</mt-tab-item>
            <mt-tab-item id="sel2">选项二</mt-tab-item>
            <mt-tab-item id="sel3">选项三</mt-tab-item>
            <mt-tab-item id="sel4">选项四</mt-tab-item>
        </mt-tabbar>

        <!-- tabcontainer -->
        <mt-tab-container className="page-tabbar-container" v-model="selected">
            <mt-tab-container-item id="sel1">
                <mt-cell title="餐厅"/>
            </mt-tab-container-item>
            <mt-tab-container-item id="sel2">
                <mt-cell title="订单"/>
            </mt-tab-container-item>
            <mt-tab-container-item id="sel3">
                <mt-cell title="发现"/>
            </mt-tab-container-item>
            <mt-tab-container-item id="sel4">
                <div className="page-part">
                    <mt-cell title="我的"/>
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

        components: {},

        data() {
            return {
                selected: 'sel3'
            }
        },

        computed: {},
        methods: {}
    }
</script>
<style lang="less" scoped>

</style>

