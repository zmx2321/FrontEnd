<template>
    <section class="menu_page">
        <el-row>
             <el-col>
                 <!-- 管理员0 -->
                 <el-menu :default-active="activeIndex" mode="vertical" background-color="#324057" text-color="#fff" active-text-color="#409eff" class="menu" v-if="userType==0">
                    <!-- 首页 -->
                    <router-link to="/home">
                        <el-menu-item index="0">
                            <i class="fa fa-server"></i>
                            <span slot="title">首页</span>
                        </el-menu-item>
                    </router-link>

                    <!-- 账号管理 -->
                    <router-link to="/account_manager">
                        <el-menu-item index="1">
                            <i class="fa fa-address-card"></i>
                            <span slot="title">账号管理</span>
                        </el-menu-item>
                    </router-link>

                    <!-- 用户管理 -->
                    <router-link to="/user_manager">
                        <el-menu-item index="2">
                            <i class="fa fa-user"></i>
                            <span slot="title">用户管理</span>
                        </el-menu-item>
                    </router-link>

                    <!-- 充值管理 -->
                    <router-link to="/income_manager">
                        <el-menu-item index="3">
                            <i class="fa fa-cog"></i>
                            <span slot="title">充值管理</span>
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

                 <!-- 组长1 -->
                 <el-menu :default-active="activeIndex" mode="vertical" background-color="#324057" text-color="#fff" active-text-color="#409eff" class="menu" v-if="userType==1">
                     <!-- 首页 -->
                     <router-link to="/home">
                         <el-menu-item index="0">
                             <i class="fa fa-server"></i>
                             <span slot="title">首页</span>
                         </el-menu-item>
                     </router-link>

                     <!-- 账号管理 -->
                     <router-link to="/account_manager">
                         <el-menu-item index="1">
                             <i class="fa fa-address-card"></i>
                             <span slot="title">账号管理</span>
                         </el-menu-item>
                     </router-link>

                     <!-- 用户管理 -->
                     <router-link to="/user_manager">
                         <el-menu-item index="2">
                             <i class="fa fa-user"></i>
                             <span slot="title">用户管理</span>
                         </el-menu-item>
                     </router-link>
                 </el-menu>

                 <!-- 客服2 -->
                 <el-menu :default-active="activeIndex" mode="vertical" background-color="#324057" text-color="#fff" active-text-color="#409eff" class="menu" v-if="userType == 2">
                     <!-- 首页 -->
                     <router-link to="/home">
                         <el-menu-item index="0">
                             <i class="fa fa-server"></i>
                             <span slot="title">首页</span>
                         </el-menu-item>
                     </router-link>

                     <!-- 用户管理 -->
                     <router-link to="/user_manager">
                         <el-menu-item index="2">
                             <i class="fa fa-user"></i>
                             <span slot="title">用户管理</span>
                         </el-menu-item>
                     </router-link>
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
            // 用户类型
            userType: 0,

            items: [
                /*{
                    icon: "fa fa-paragraph",
                    name: "test",
                    path: "infoshow",
                    children: [
                        { path: "/test", name: "test" },
                    ]
                }*/
            ]
        };
    },

    // 解决路由跳转导航不高亮问题
    computed:{
        activeIndex(){
            let pathName = this.$route.path.replace('/','');

            switch (pathName) {
                case "home":
                    return "0";
                    break;
                case "account_manager":
                    return "1";
                    break;
                case "user_manager":
                    return "2";
                    break;
                case "income_manager":
                    return "3";
                    break;
            }
        },
    },

    created () {
        /**
         * 管理员0：账号管理、用户管理、充值管理；
         * 组长1：账号管理、用户管理、充值管理；
         * 客服/话务2：  用户管理
         */
        this.userType = localStorage.userType;
    }
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
