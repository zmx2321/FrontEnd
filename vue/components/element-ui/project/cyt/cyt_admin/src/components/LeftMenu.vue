<template>
    <section class="menu_page">
        <el-row>
             <el-col>
                 <el-menu :default-active="activeIndex" mode="vertical" background-color="#324057" text-color="#fff" active-text-color="#409eff" class="menu">
                     <!-- 首页 -->
                     <router-link to="/index">
                         <el-menu-item index="0">
                             <i class="fa fa-server"></i>
                             <span slot="title">首页</span>
                         </el-menu-item>
                     </router-link>

                     <!-- 设备管理 -->
                     <router-link to="/device_manage">
                         <el-menu-item index="1">
                             <i class="fa fa-cog"></i>
                             <span slot="title">设备管理</span>
                         </el-menu-item>
                     </router-link>

                     <!-- 管理员管理 -->
                     <router-link to="/admin_manage">
                         <el-menu-item index="2">
                             <i class="fa fa-address-book"></i>
                             <span slot="title">管理员管理</span>
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
    // import {} from "../api"

export default {
    name: "leftmenu",

    data() {
        return {
            items: [
                {
                    icon: "fa-area-chart",
                    name: "数据管理",
                    path: "data_manage",
                    children: [
                        { path: "/record_manage", name: "记录管理" },
                        { path: "/user_manage", name: "用户管理" },
                        { path: "/rider_manage", name: "骑手管理" }
                    ]
                },
                // {
                //     icon: "fa-asterisk",
                //     name: "临时",
                //     path: "temp",
                //     children: [
                //         { path: "/cabinet_manage", name: "格口管理" },
                //         { path: "/banner_manage", name: "banner管理" },
                //     ]
                // },
                // {
                //     icon: "fa-money",
                //     name: "test",
                //     path: "test",
                //     children: [
                //         { path: "/test", name: "test" },
                //         { path: '/rich_text', name: '富文本'},
                //         { path: '/map', name: '地图'},
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
                case "device_manage":
                    return "1";
                    break;
                case "admin_manage":
                    return "2";
                    break;
            }
        },
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
