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

                     <!-- 员工账号管理 -->
                     <router-link to="/account">
                         <el-menu-item index="1">
                             <i class="icon iconfont icon-yuangongguanli"></i>
                             <span slot="title">员工账号管理</span>
                         </el-menu-item>
                     </router-link>

                    <!-- 用户管理 -->
                    <router-link to="/user">
                        <el-menu-item index="2">
                            <i class="icon iconfont icon-yonghu"></i>
                            <span slot="title">用户管理</span>
                        </el-menu-item>
                    </router-link>

                    <!-- banner管理 -->
                    <router-link to="/banner">
                        <el-menu-item index="3">
                            <i class="icon iconfont icon-tupian"></i>
                            <span slot="title">banner管理</span>
                        </el-menu-item>
                    </router-link>

                     <!-- 兑换码管理 -->
                    <router-link to="/redeem_code">
                        <el-menu-item index="4">
                            <i class="icon iconfont icon-jifenduihuanchanpin"></i>
                            <span slot="title">兑换码管理</span>
                        </el-menu-item>
                    </router-link>

                    <!-- 订单管理 -->
                    <router-link to="/order">
                        <el-menu-item index="5">
                            <i class="icon iconfont icon-dingdan"></i>
                            <span slot="title">订单管理</span>
                        </el-menu-item>
                    </router-link>

                    <!-- 商品管理 -->
                    <router-link to="/product">
                        <el-menu-item index="6">
                            <i class="icon iconfont icon-shangpin"></i>
                            <span slot="title">商品管理</span>
                        </el-menu-item>
                    </router-link>

                     <!-- 数据统计 -->
                     <router-link to="/statistics">
                         <el-menu-item index="7">
                             <i class="icon iconfont icon-tongji"></i>
                             <span slot="title">数据统计</span>
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
