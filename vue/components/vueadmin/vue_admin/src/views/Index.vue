<template>
    <section class="container">
        <HeadNav></HeadNav>

        <div class="main">
            <div class="left_container">
                <LeftMenu></LeftMenu>
            </div>

            <div class="right_container">
                <transition name="fade"  mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </section>
</template>

<script>
    import HeadNav from '../components/HeadNav'
    import LeftMenu from "../components/LeftMenu";

    export default {
        name: "index",

        components: {
            HeadNav,
            LeftMenu
        }
    }
</script>

<style scoped>
    .container {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .main{
        display: flex;
        position: absolute;
        top: 60px;
        bottom: 0px;
        overflow: hidden;
    }

    .left_container{
        flex: 0 0 230px;
        width: 230px;
    }

    .right_container {
        position: absolute;
        bottom: 0;
        left: 180px;
        width: calc(100% - 180px);
        height: calc(100% - 71px);
        overflow: auto;
        flex: 1;
        overflow-y: scroll;
        padding: 20px;
    }
</style>