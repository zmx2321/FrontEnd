<template>
    <div>
        <h6>首页</h6>
        <button @click="back">回退</button>
        <button @click="goTo">跳转</button>
    </div>
</template>

<script>
    export default {
        name: "home",

        methods: {
            back() {
                this.$router.go(-1);  // 回退
            },

            goTo() {
                this.$router.replace("/manage");
                this.$router.replace({name: 'dishes'});

                this.$router.push("/order");
            }
        }
    }
</script>

<style scoped>

</style>