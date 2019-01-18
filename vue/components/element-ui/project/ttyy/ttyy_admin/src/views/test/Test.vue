<template>
    <section class="main_cont">
        <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
    </section>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入柱状图组件
    require('echarts/lib/chart/bar')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')

    export default {
        name: "Test",

        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        mounted(){
            this.drawLine();
        },
        methods: {
            fetchData (cb){
                // 通过 setTimeout 模拟异步加载
                setTimeout(function () {
                    cb({
                        categories: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
                        data: [5, 20, 36, 10, 10, 20]
                    });
                }, 1000);
            },
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('myChart'))

                // 显示标题，图例和空的坐标轴
                myChart.setOption({
                    title: {
                        text: '异步数据加载示例'
                    },
                    tooltip: {},
                    legend: {
                        data:['销量']
                    },
                    xAxis: {
                        data: []
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: []
                    }]
                });

                this.fetchData(data => {
                    // 填入数据
                    myChart.setOption({
                        xAxis: {
                            data: data.categories
                        },
                        series: [{
                            // 根据名字对应到相应的系列
                            name: '销量',
                            data: data.data
                        }]
                    });
                })

            }
        }
    }
</script>

<style scoped>

</style>