<template>
    <div>
        <h6>关于我们</h6>

        <router-link to="/about/intro">简介</router-link>
        <router-link to="/about/join">加入</router-link>
        <router-link to="/about/contact">联系</router-link>
        <!--<nav>
            <ul>
                <li>
                    <router-link to="/about/intro">简介</router-link>
                </li>
                <li>
                    <router-link to="/about/join">加入</router-link>
                </li>
                <li>
                    <router-link to="/about/contact">联系</router-link>
                </li>
            </ul>
        </nav>-->

        <div class="box">
            <router-view />
        </div>
    </div>
</template>

<script>
    export default {
        name: "about"
    }
</script>

<style scoped>

</style>