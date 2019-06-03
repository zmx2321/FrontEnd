<template>
    <div>
        <h1>sidebar</h1>
        <router-link to="/home">首页</router-link>
        <router-link to="/dishes">食谱</router-link>
        <router-link to="/manage">管理</router-link>
        <!-- 数据 -->
        <router-link :to=orderLink>订单</router-link>
        <router-link to="/about">关于</router-link>

        <!-- 不需要a标签，指定一个跳转标签 -->
        <router-link to="/manage" tag="span">管理</router-link>

        <!-- 根据路由名字跳转 -->
        <router-link :to="{name: 'order0'}">订单</router-link>
    </div>
</template>

<script>
    export default {
        name: "SideBar",

        // 是一个函数
        data () {
            return {
                orderLink: "/order",
            }
        }
    }
</script>

<style lang="less" scoped>
    a {
        &:hover{
            color: #f00;
        }

        &.active {
            color: #f00;
        }
    }
</style>