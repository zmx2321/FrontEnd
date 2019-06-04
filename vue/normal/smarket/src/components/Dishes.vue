<template>
    <div>
        <h3>食品</h3>
        {{ this.$store.state.dishes }}
        <button @click="discount(8)">打折</button>
    </div>
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
                // return this.$store.state.dishes;

                /*const oldData = this.$store.state.dishes;
                // value每一条数据，index每条数据对应的索引，arr数组本身
                const newData = oldData.map((value, index, arr)=> {
                    // 把人民币换成泰铢
                    return {
                        name: value.name,
                        price: value.price * 5
                    }
                });

                return newData;*/

                // 不用加括号
                return this.$store.getters.changePrice;
            }
        },

        methods: {
            discount(dis) {
                /*// map会返回新数组，foreach是改变当前数组
                console.log("打折");
                this.$store.state.dishes.forEach(element =>{
                    element.price *= 0.5;
                })

                console.log(this.$store.state.dishes);*/

                // 调用mutations的discount方法（相当于自定义事件）
                // 支持传参(payload)从第二个参数开始，就是对应的调用的时候传过来的参数
                // this.$store.commit("discount", dis);

                // actions的调用方式
                this.$store.dispatch("discount", dis);
            }
        },

        created() {
            console.log(this.dishes);
        }
    }
</script>

<style scoped>

</style>