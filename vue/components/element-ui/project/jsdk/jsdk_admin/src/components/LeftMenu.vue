<template>
    <section class="menu_page">
        <el-row>
             <el-col>
                 <el-menu mode="vertical" background-color="#324057" text-color="#fff" active-text-color="#409eff" class="el-menu-vertical-demo">
                    <!-- 首页 -->
                    <router-link to="/home">
                        <el-menu-item index="0">
                            <i class="fa fa-server"></i>
                            <span slot="title">首页</span>
                        </el-menu-item>
                    </router-link>

                     <!-- 项目管理 -->
                    <router-link to="/project_manage">
                        <el-menu-item index="1">
                            <i class="fa fa-cog"></i>
                            <span slot="title">项目管理</span>
                        </el-menu-item>
                    </router-link>

                     <!-- 项目访问量 -->
                    <router-link to="/uv">
                        <el-menu-item index="2">
                            <i class="fa fa-cog"></i>
                            <span slot="title">项目访问量</span>
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
