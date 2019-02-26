<template>
    <section class="menu_page">
        <el-row>
             <el-col>
                 <el-menu :default-active="activeIndex" mode="vertical" background-color="#324057" text-color="#fff" active-text-color="#409eff" class="menu">
                    <!-- 首页 -->
                    <router-link to="/home">
                        <el-menu-item index="0">
                            <i class="icon iconfont icon-shouye"></i>
                            <span slot="title">首页</span>
                        </el-menu-item>
                    </router-link>

                    <!-- 二级菜单 -->
                    <template  v-for="item in items" >
                        <el-submenu v-if="item.children" :index="item.path" :key="item.path">
                            <template slot="title">
                                <i :class="'fa fa-margin '+item.icon"></i>
                                <span slot="title">{{item.name}}</span>
                            </template>
                            <router-link v-for="(citem,cindex) in item.children"
                                :to="citem.path" :key="cindex" class="menu_child">
                                <el-menu-item
                                    :index='citem.path'>
                                    <span slot="title">{{citem.name}}</span>
                                </el-menu-item>
                            </router-link>
                        </el-submenu>
                    </template>
                 </el-menu>
             </el-col>
        </el-row>
    </section>
</template>

<script>
export default {
    name: "leftmenu",

    data() {
        return {
            items: [
                {
                    icon: "fa fa-paragraph",
                    name: "test",
                    path: "infoshow",
                    children: [
                        { path: "/test", name: "test" },
                    ]
                },
                {
                    icon: "fa fa-paragraph",
                    name: "v3DMDemo",
                    path: "v3DMDemo",
                    children: [
                        { path: "/v3DMDemo1", name: "v3DMDemo1" },
                        { path: "/v3DMDemo2", name: "v3DMDemo2" },
                    ]
                },
                {
                    icon: "fa fa-paragraph",
                    name: "d3Demo",
                    path: "d3Demo",
                    children: [
                        { path: "/d3Demo1", name: "d3Demo1" },
                        { path: "/d3Demo2", name: "d3Demo2" },
                    ]
                },
                {
                    icon: "fa fa-paragraph",
                    name: "casDemo",
                    path: "casDemo",
                    children: [
                        { path: "/casDemo1", name: "casDemo1" },
                        { path: "/casDemo2", name: "casDemo2" },
                    ]
                },
            ]
        };
    },

    // 解决路由跳转导航不高亮问题
    computed:{
        activeIndex(){
            let pathName = this.$route.path.replace('/','');

            switch (pathName) {
                case "index":
                    return "0";
                    break;
                case "account":
                    return "1";
                    break;
                case "user":
                    return "2";
                    break;
                case "banner":
                    return "3";
                    break;
                case "redeem_code":
                    return "4";
                    break;
                case "order":
                    return "5";
                    break;
                case "product":
                    return "6";
                    break;
                case "statistics":
                    return "7";
                    break;
            }
        },
    },
};
</script>

<style scoped>
    .menu_page {
        width: 100%;
        height: 100%;
    }

    .menu{
        border: none;
    }

    .menu span{
        margin-left: 8px;
    }
</style>
