<template>
    <section class="menu_page">
        <el-row>
             <el-col>
                 <el-menu :default-active="activeIndex" mode="vertical" background-color="#324057" text-color="#fff" active-text-color="#409eff" class="menu">
                    <!-- 首页 -->
                    <router-link to="/home">
                        <el-menu-item index="0">
                            <i class="fa fa-server"></i>
                            <span slot="title">{{ $t('leftMenu.index') }}</span>
                        </el-menu-item>
                    </router-link>

                    <!-- 资讯管理 -->
                    <router-link to="/consultation">
                        <el-menu-item index="2">
                            <i class="fa fa-file-text"></i>
                            <span slot="title">{{ $t('leftMenu.consultation') }}</span>
                        </el-menu-item>
                    </router-link>

                    <!-- 资质认证管理 -->
                    <router-link to="/identificationInfo">
                        <el-menu-item index="3">
                            <i class="fa fa-cc"></i>
                            <span slot="title">{{ $t('leftMenu.identificationInfo') }}</span>
                        </el-menu-item>
                    </router-link>

                     <!-- 积分管理 -->
                    <!--<router-link to="/consumeInfo">
                        <el-menu-item index="4">
                            <i class="icon iconfont icon-jifenduihuanchanpin"></i>
                            <span slot="title">积分管理</span>
                        </el-menu-item>
                    </router-link>-->

                    <!-- 轮播图管理 -->
                    <router-link to="/banner">
                        <el-menu-item index="5">
                            <i class="fa fa-cog"></i>
                            <span slot="title">{{ $t('leftMenu.banner') }}</span>
                        </el-menu-item>
                    </router-link>

                    <!-- 签到管理 -->
                    <!--<router-link to="/dailyTask">
                        <el-menu-item index="6">
                            <i class="icon iconfont icon-shangpin"></i>
                            <span slot="title">签到管理</span>
                        </el-menu-item>
                    </router-link>-->

                     <!-- 投票管理 -->
                     <!--<router-link to="/vote">
                         <el-menu-item index="7">
                             <i class="icon iconfont icon-tongji"></i>
                             <span slot="title">投票管理</span>
                         </el-menu-item>
                     </router-link>-->

                     <!-- 职业管理 -->
                     <!--<router-link to="/job">
                         <el-menu-item index="9">
                             <i class="icon iconfont icon-tongji"></i>
                             <span slot="title">职业管理</span>
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

                     <!-- 员工管理 -->
                     <router-link to="/staff">
                         <el-menu-item index="1">
                             <i class="fa fa-user"></i>
                             <span slot="title">{{ $t('leftMenu.staff') }}</span>
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
            items: [
                {
                    icon: "fa fa-paragraph",
                    name: "数据统计",
                    path: this.$t('leftMenu.statistics'),
                    children: [
                        { path: "/userStatistics", name: this.$t('leftMenu.userStatistics') },
                        { path: "/consumptionStatistics", name: this.$t('leftMenu.consumptionStatistics') }
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
                case "index":
                    return "0";
                    break;
                case "admin":
                    return "1";
                    break;
                case "consultation":
                    return "2";
                    break;
                case "identificationInfo":
                    return "3";
                    break;
                case "consumeInfo":
                    return "4";
                    break;
                case "banner":
                    return "5";
                    break;
                case "dailyTask":
                    return "6";
                    break;
                case "vote":
                    return "7";
                    break;
                case "job":
                    return "8";
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
