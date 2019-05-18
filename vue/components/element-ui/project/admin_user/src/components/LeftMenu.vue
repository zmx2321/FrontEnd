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

                     <!-- 链接管理 -->
                     <router-link to="/link_manager">
                         <el-menu-item index="2">
                             <i class="fa fa-cog"></i>
                             <span slot="title">链接管理</span>
                         </el-menu-item>
                     </router-link>

                     <!-- 统计管理 -->
                     <!--<router-link to="/log_manager">
                         <el-menu-item index="4">
                             <i class="fa fa-cog"></i>
                             <span slot="title">统计管理</span>
                         </el-menu-item>
                     </router-link>-->

                    <!-- 用户管理 -->
                    <!--<router-link to="/user_manager">
                        <el-menu-item index="2">
                            <i class="fa fa-user"></i>
                            <span slot="title">用户管理</span>
                        </el-menu-item>
                    </router-link>-->

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

                 <!-- 管理员0 -->
                 <el-menu :default-active="activeIndex" mode="vertical" background-color="#324057" text-color="#fff" active-text-color="#409eff" class="menu" v-if="userType==2">
                     <!-- 首页 -->
                     <router-link to="/home">
                         <el-menu-item index="0">
                             <i class="fa fa-server"></i>
                             <span slot="title">首页</span>
                         </el-menu-item>
                     </router-link>

                     <!-- 统计管理 -->
                     <router-link to="/log_manager">
                         <el-menu-item index="1">
                             <i class="fa fa-address-card"></i>
                             <span slot="title">统计管理</span>
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
                {
                    icon: "fa fa-paragraph",
                    name: "统计管理",
                    path: "统计管理",
                    children: [
                        { path: "/log_manager", name: "统计管理" },
                        { path: "/rltm_manager", name: "实时统计" },
                    ]
                }
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
                case "link_manager":
                    return "2";
                    break;
            }
        },
    },

    created () {
        /**
         * 0-管理员，2-渠道
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
