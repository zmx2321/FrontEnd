<template>
    <el-container class="container f-pr">
        <el-header class="header f-oh">
            <HeadNav></HeadNav>
        </el-header>
        <el-container>
            <el-aside class="aside f-oh">
                <LeftMenu></LeftMenu>
            </el-aside>
            <el-main class="main f-oh">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import HeadNav from '../components/HeadNav'
    import LeftMenu from "../components/LeftMenu";

    import {
        Test  // 测试
    } from "../api/api"

    export default {
        name: "index",

        components: {
            HeadNav,
            LeftMenu
        },

        methods: {
            test: () => {
                Test().then(res => {
                    console.log(res);
                }).catch(({}));
            }
        },
        created: function(){
            this.test();
        },
    }
</script>

<style scoped>
    .container {
        width: 100%;
        height: 100%;
    }

    .header, .aside{
        background: #324057;
    }

    .header{
        padding: 0;
        border-bottom: 1px solid #1f2d3d;
    }

    .aside {
        flex: 0 0 230px;
        width: 230px;
    }

    .main {
        padding: 0;
    }
</style>