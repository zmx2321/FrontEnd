<template>
  <div id="page">
    <el-container>
      <el-aside width="220px">
        <v-slidebar :ids="ids"></v-slidebar>
      </el-aside>
      <el-main>
        <nav-bar></nav-bar>
        <div class="content">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
  
<script>
import slideBar from '@/components/slide-bar/index';
import navBar from '@/components/navbar/index';

export default {
  name: "home",
  components: {
    "v-slidebar": slideBar,
    navBar
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    const ids = JSON.parse(localStorage.menuIds)
    next(vm => {
      // 通过 `vm` 访问组件实例
      vm.ids = ids
    })
  },
  data () {
    return {
      ids: null,
    };
  },
}
</script>
  
<style lang="scss" scoped>
#page {
  width: 100%;
  height: 100%;

  .el-container {
    height: 100%;
  }

  .el-aside {
    width: 220px !important;
    background: #001529;
    box-shadow: 0 0 10px 3px #999;
    z-index: 999;
  }

  .el-main {
    min-width: 1200px;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    background: #f0f2f5;
    padding: 0;

    .content {
      padding: 20px;
    }
  }
}
</style>
