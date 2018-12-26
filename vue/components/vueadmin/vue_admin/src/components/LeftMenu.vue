<template>
    <section class="menu_page">
        <el-row>
             <el-col>
                 <el-menu mode="vertical" background-color="#324057" text-color="#fff" active-text-color="#409eff" class="el-menu-vertical-demo">
                    <!-- 首页 -->
                    <router-link to="/home">
                        <el-menu-item index="0">
                            <i class="fa fa-margin fa-server"></i>
                            <span slot="title">首页</span>
                        </el-menu-item>
                    </router-link>

                     <!-- 设备管理 -->
                    <router-link to="/device_manage">
                        <el-menu-item index="1">
                            <i class="fa fa-margin fa-server"></i>
                            <span slot="title">设备管理</span>
                        </el-menu-item>
                    </router-link>

                     <!-- 运营管理 -->
                     <router-link to="/operate_manage">
                         <el-menu-item index="2">
                             <i class="fa fa-margin fa-server"></i>
                             <span slot="title">运营管理</span>
                         </el-menu-item>
                     </router-link>

                     <!-- 账号管理 -->
                     <router-link to="/account_manage">
                         <el-menu-item index="3">
                             <i class="fa fa-margin fa-server"></i>
                             <span slot="title">个人信息</span>
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

                     <!-- 个人信息 -->
                     <router-link to="/infoshow">
                         <el-menu-item index="4">
                             <i class="fa fa-margin fa-server"></i>
                             <span slot="title">个人信息</span>
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
              icon: "fa-asterisk",
              name: "数据管理",
              path: "data_manage",
              children: [
                  {path: "data_manage", name: "数据管理"},
                  {path: "/record_manage", name: "记录管理"},
                  {path: "/user_manage", name: "用户管理"},
                  {path: "/rider_manage", name: "骑手管理"}
              ]
          },
          {
              icon: "fa-asterisk",
              name: "信息管理",
              path: "info",
              children: [{ path: "infoshow", name: "个人信息" }]
          },
          {
              icon: "fa-asterisk",
              name: "临时",
              path: "temp",
              children: [
                  { path: "/cabinet_manage", name: "柜口管理" },
              ]
          },
          {
              icon: "fa-money",
              name: "test",
              path: "test",
              children: [
                  { path: "/test", name: "test" },
                  { path: '/rich_text', name: '富文本'},
                  { path: "/helloDGTable", name: "筛选" },
              ]
          }
      ]
    };
  }
};
</script>

<style scoped>
.menu_page {
    width: 100%;
    height: 100%;
    background-color: #324057;
}

.el-menu-vertical-demo{
    border: none;
}
</style>
