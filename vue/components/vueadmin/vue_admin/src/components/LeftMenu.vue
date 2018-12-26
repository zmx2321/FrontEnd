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

                     <router-link to="/rich_text">
                         <el-menu-item index="1">
                             <i class="fa fa-margin fa-server"></i>
                             <span slot="title">富文本</span>
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
              icon: "fa-money",
              name: "资料管理",
              path: "manager",
              children: [
                  { path: "device_manage", name: "设备管理" },
                  { path: "data_manage", name: "数据管理" },
                  { path: "operate_manage", name: "运营管理" },
                  { path: "account_manage", name: "账号管理" }
              ]
          },
          {
              icon: "fa-asterisk",
              name: "信息管理",
              path: "info",
              children: [{ path: "infoshow", name: "个人信息" }]
          },
          {
              icon: "fa-money",
              name: "test",
              path: "test",
              children: [
                  { path: "/test", name: "test" },
                  { path: '/rich_text', name: 'rich_text'},
                  // { path: "sx", name: "sx" },
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
