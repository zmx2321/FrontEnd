<template>
    <section class="main_cont">
        <el-row>
            <el-col id="myChart" class="chart"></el-col>
        </el-row>
    </section>
</template>

<script>
    import {
        findTodayStatus,  // 数据统计
    } from '../../api/api.js';

    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入柱状图组件
    require('echarts/lib/chart/bar')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')

    export default {
        name: 'hello',
        data() {
            return {

            }
        },
        // dom加载完成之后
        mounted () {
            // 获取数据统计信息
            this.getTodayStatus();
        },
        methods: {
            /**
             *  api
             *  获取数据统计信息
             */
            getTodayStatus () {
                // 获取myChart实例
                let myChart = echarts.init(document.getElementById('myChart'));

                // 显示myChart loading
                myChart.showLoading();

                /**
                 *  newPayOrderAmountCount: 0,  今日付款总额
                 *  newUserCount: 0,  今日新用户总数
                 *  newUsedRedeemCount: 0,  今日支付订单总数
                 *  newPayOrderCount: 0,  今日支付订单总数
                 *  newMakeRedeemCount: 9  今日生成兑换码总数
                 */
                findTodayStatus().then(res => {
                    // 状态集合
                    let statuses = res.data.data;

                    // console.log(statuses);

                    // 隐藏myChart loading
                    myChart.hideLoading();

                    // 绘制图表
                    myChart.setOption({
                        title : {
                            text: '用户访问统计',
                            subtext: '数据统计',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: ['今日付款总额','今日新用户总数','今日使用兑换码总数','今日支付订单总数','今日生成兑换码总数']
                        },
                        series : [
                            {
                                name: '访问统计',
                                type: 'pie',
                                radius : '55%',
                                center: ['50%', '60%'],
                                data:[
                                    { value: statuses.newPayOrderAmountCount, name:'今日付款总额' },
                                    { value: statuses.newUserCount, name:'今日新用户总数' },
                                    { value: statuses.newUsedRedeemCount, name:'今日使用兑换码总数' },
                                    { value: statuses.newPayOrderCount, name:'今日支付订单总数' },
                                    { value: statuses.newMakeRedeemCount, name:'今日生成兑换码总数' }
                                ],
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    });
                }).catch({});
            },
        }
    }
</script>

<style scoped>
    .chart{
        height: calc(100vh - 300px);
    }
</style>