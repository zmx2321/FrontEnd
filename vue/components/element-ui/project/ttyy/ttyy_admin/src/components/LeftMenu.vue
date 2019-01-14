<template>
    <section class="menu_page">
        <el-row>
             <el-col>
                 <el-menu :default-active="activeIndex" mode="vertical" background-color="#324057" text-color="#fff" active-text-color="#409eff" class="menu">
                    <!-- 首页 -->
                    <router-link to="/home">
                        <el-menu-item index="0">
                            <i class="fa fa-server"></i>
                            <span slot="title">首页</span>
                        </el-menu-item>
                    </router-link>

                     <!-- 用户管理 -->
                    <router-link to="/user">
                        <el-menu-item index="1">
                            <i class="fa fa-address-book"></i>
                            <span slot="title">用户管理</span>
                        </el-menu-item>
                    </router-link>

                     <!-- banner管理 -->
                    <router-link to="/banner">
                        <el-menu-item index="2">
                            <i class="fa fa-map-signs"></i>
                            <span slot="title">banner管理</span>
                        </el-menu-item>
                    </router-link>

                     <!-- 兑换码管理 -->
                    <router-link to="/redeem_code">
                        <el-menu-item index="3">
                            <i class="fa fa-money"></i>
                            <span slot="title">兑换码管理</span>
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
                // {
                //     icon: "fa fa-paragraph",
                //     name: "个人信息",
                //     path: "infoshow",
                //     children: [
                //         { path: "/infoshow", name: "个人信息" },
                //     ]
                // }
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
                case "user":
                    return "1";
                    break;
                case "banner":
                    return "2";
                    break;
                case "redeem_code":
                    return "3";
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
</style>
