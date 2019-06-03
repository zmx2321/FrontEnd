<template>
    <div>微信</div>
</template>

<script>
    export default {
        name: "Wechat",

        data() {
            return{
                name: "cmcc",
            }
        },

        // 组件内的路由守卫
        beforeRouteEnter(to, from, next) {
            // 在当前路由被展示前调用,触发时还没有创建组件
            // 不能用this
            console.log("aa")

            // 在回调中使用this
            next(vm=>{
                console.log(vm.name);
            });
        },
        beforeRouteLeave(to, from, next) {
            // 在当前路由被展示时调用
            const answer = confirm("离开？");
            if (answer) {
                next();
                console.log("gogo");
            } else {
                // 中断当前路由的跳转
                next(false);
            }
        }
    }
</script>

<style scoped>

</style>