<template>
    <div>食品</div>
</template>

<script>
    export default {
        name: "Dishes",

        data() {
            return {

            }
        },

        // 不断执行
        methods: {

        },
        // 自动计算，为了提升性能
        computed: {
            dishes() {
                // 取store.js里的数据
                return this.$store.state.dishes;
            }
        },

        created() {
            console.log(this.$store.state.dishes);
        }
    }
</script>

<style scoped>

</style>