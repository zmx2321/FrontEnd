<template>
    <section class="main_cont">
        <!-- 筛选 -->
        <el-row class="toolbar bdr_radiu f-cb">
            <!--<el-col class="f-fl btn_wrap f-cb">-->
                <!--<span class="f-fl">开始时间：</span>-->
                <!--<el-date-picker-->
                    <!--class="f-fl"-->
                    <!--v-model="value2"-->
                    <!--align="right"-->
                    <!--type="date"-->
                    <!--placeholder="选择日期"-->
                    <!--:picker-options="pickerOptions1">-->
                <!--</el-date-picker>-->
            <!--</el-col>-->
            <!--<el-col class="f-fl btn_wrap f-cb">-->
                <!--<span class="f-fl">结束时间：</span>-->
                <!--<el-date-picker-->
                        <!--class="f-fl"-->
                        <!--v-model="value2"-->
                        <!--align="right"-->
                        <!--type="date"-->
                        <!--placeholder="选择日期"-->
                        <!--:picker-options="pickerOptions1">-->
                <!--</el-date-picker>-->
            <!--</el-col>-->
            <el-date-picker
                    v-model="value7"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy-MM-dd"
                    @change="dateChangebirthday"
                    :picker-options="pickerOptions2">
            </el-date-picker>
        </el-row>

        <!-- 订单列表 -->
        <el-row>
            <el-table class="order_list" :data="order_info" border highlight-current-row v-loading="listLoading">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column type="index" width="60" align="center"></el-table-column>
                <el-table-column prop="id" label="订单编号" width="80" align="center"></el-table-column>
                <el-table-column prop="finalPrice" label="订单价格" width="80" align="center"></el-table-column>
                <el-table-column prop="createAt" label="创建时间" width="80" align="center"></el-table-column>
                <el-table-column prop="userId" label="用户编号" width="80" align="center"></el-table-column>
                <el-table-column prop="productId" label="产品编号" width="80" align="center"></el-table-column>
                <el-table-column prop="payAt" label="支付时间" width="80" align="center"></el-table-column>
                <el-table-column prop="status" label="订单状态" width="80" align="center" :formatter="formatStatusType"></el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-col>
                <el-pagination
                   class="f-fr pagination"
                   :current-page.sync='page_arg.page_index'
                   :page-sizes="page_arg.page_sizes"
                   :page-size="page_arg.page_size"
                   :layout="page_arg.layout"
                   :total="page_arg.total"
                   @current-change='handleCurrentChange'
                   @size-change='handleSizeChange'>
                </el-pagination>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import {
        findOrderList,  // 获取订单列表
    } from '../../api/api.js';

    export default {
        name: 'order',

        data() {
            return {
                /**
                 * common
                 */
                listLoading: false,  // lodding动画

                // 分页参数
                page_arg: {
                    page_index: 1, // 当前位于哪页
                    total: 0, // 总数
                    page_size: 5, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20, 50], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                },

                // 时间筛选器
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]

                },
                value6: '',
                value7: '',

                // 起止时间
                orderTime: {
                    startTime: "",
                    endTime: ""
                },

                /**
                 * 订单列表
                 */
                order_info: [],  // 存放订单信息列表数据
            }
        },
        methods: {
            // 时间戳转换
            formatDate (now) {
                let year = now.getFullYear();  // 年
                let month = now.getMonth() + 1;  // 月
                let date = now.getDate();  // 日

                return year + "-" + month + "-" + date;
            },

            dateChangebirthday(val) {
                console.log(val);
                this.form.birthdayName = val;
            },


            // 点击页码
            handleCurrentChange() {
                this.getOrderList();  // 加载分页数据
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                // console.log(page_size);

                this.page_arg.page_size = page_size;  // 切换size

                this.getOrderList();  // 加载分页数据
            },

            /**
             *  api
             *  获取订单信息
             */
            // 获取订单列表
            getOrderList () {
                // //接口参数
                // let param = {
                //     pageSize: this.page_arg.page_size,  // 每页条数
                //     pageNum: this.page_arg.page_index,  // 当前页码
                //     startTime: new Date("2019-01-11"),  // 开始时间（格式yyyy-MM-dd）
                //     endTime: new Date("2019-01-11")  // 结束时间（格式yyyy-MM-dd）
                // };

                //接口参数
                let param = {
                    pageSize: this.page_arg.page_size,  // 每页条数
                    pageNum: this.page_arg.page_index,  // 当前页码
                };


                // 请求接口
                findOrderList(qs.stringify(param)).then(res => {
                    console.log(res);

                    this.order_info = res.data.data.list;

                    // 返回分页总数
                    this.page_arg.total = res.data.data.total;
                }).catch({});
            },
            // 订单状态类型
            formatStatusType (row) {
                switch (row.type) {
                    case 0:
                        return "未支付";
                        break;
                    case 1:
                        return "已支付";
                        break;
                    case -1:
                        return "订单异常";
                        break;
                }
            },
        },
        // 预处理
        created () {
            this.getOrderList();  // 获取订单列表
            console.log(this.value7);
            this.dateChangebirthday();
        }
    }
</script>

<style scoped>
    .toolbar{
        padding-left: 28px;
    }

    .btn_wrap{
        width: 310px;
        height: 40px;
    }

    .btn_wrap:not(:last-child){
        margin-bottom: 10px;
    }

    .btn_wrap span{
        display: block;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #797979;
    }
</style>