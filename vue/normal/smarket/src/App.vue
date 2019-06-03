<template>
  <div id="app">
    <SideBar></SideBar>

    <div class="cot">
      <!-- 路由视图入口 -->
      <router-view />
    </div>
    <!--<div id="cont">
      <ul>
        &lt;!&ndash; 调用组件，使用插槽 &ndash;&gt;
        <MenuList>
          <span slot="title">可乐</span>
          <span slot="price">22</span>
        </MenuList>
        <MenuList>
          <span slot="title">雪碧</span>
          <span slot="price">33</span>
        </MenuList>
      </ul>
    </div>-->
  </div>
</template>

<script>
    // 在一个组件里使用另一个组件，需要通过import导入
    // import MenuList from './components/MenuList'
    import SideBar from './components/SideBar'

    export default {
        components: {
            // 导入进来的组件要放在components中，
            // 在es6中如果key与value相同，就可以省略
            // MenuList,
            SideBar
        }
    }

    /**
     * 1.beforeCreate  创建实例前触发
     * 2.created  创建实例后触发
     * 3.beforeMount  渲染dom前触发
     * 4.mounted  渲染dom后触发
     * 5.beforeUpdate  数据更改前后触发
     * 6.updated  数据更改后触发
     * 7.beforeDestroy  实例销毁前触发
     * 8.destroyed  实例销毁后触发
     */
</script>

<style lang="less">

</style>
