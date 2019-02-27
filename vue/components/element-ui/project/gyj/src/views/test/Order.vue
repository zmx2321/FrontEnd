<template>
    <section class="main_cont">
        <!-- 筛选 -->
        <el-row class="toolbar bdr_radiu f-cb">
            <el-form :inline="true" status-icon :model="filterData" ref="filterOrderForm" label-width="40px">
                <el-form-item label="日期">
                    <el-date-picker
                        v-model="filterData.timeArray"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd"
                        @change="getSTime"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="手机" prop="target" class="filter_text">
                    <el-input v-model="filterData.searchText" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="filterOrderSubmit('filterOrderForm')">查询</el-button>
                    <el-button @click="resetForm('filterOrderForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-row>

        <!-- 订单列表 -->
        <el-row>
            <el-table class="order_list" :data="order_info" border highlight-current-row v-loading="listLoading" height="calc(100vh - 250px)">
                <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <!--<el-table-column type="index" width="60" align="center"></el-table-column>-->

                <el-table-column label="商品图片" width="120" align="center">
                    <template slot-scope="scope">
            		<img :src="scope.row.product.img" class="tabimg" />
            	</template>
                </el-table-column>

                <el-table-column prop="product.title" label="商品名称" width="200" align="center"></el-table-column>
                <el-table-column prop="id" label="订单编号" width="80" align="center"></el-table-column>
                <el-table-column prop="finalPrice" label="订单价格" width="80" align="center"></el-table-column>
                <el-table-column prop="createAt" label="创建时间" width="110" align="center"></el-table-column>
                <el-table-column prop="userMobile" label="用户手机" width="120" align="center"></el-table-column>
                <el-table-column prop="payAt" label="支付时间" width="110" align="center"></el-table-column>
                <el-table-column prop="status" label="订单状态" width="auto" :formatter="formatStatusType"></el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-col :span="24" class="toolbar f-cb">
                <el-pagination class="f-fr pagination"
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
                    page_size: 10, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20, 50], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                },

                // 时间筛选器
                pickerOptions: {
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

                // 筛选器
                filterData: {
                    timeArray: '',  // 起止时间集合
                    startTime: "",  // 开始时间
                    endTime: "",  // 结束时间
                    searchText: ""  // 关键词搜索（暂定手机号）
                },

                /**
                 * 订单列表
                 */
                order_info: [],  // 存放订单信息列表数据
            }
        },
        methods: {
            /**
             * common
             */
            // 点击页码
            handleCurrentChange() {
                // 加载分页数据
                this.getOrderList();
            },
            // 设置每页条数
            handleSizeChange(page_size) {
                // console.log(page_size);

                // 切换size
                this.page_arg.page_size = page_size;

                // 加载分页数据
                this.getOrderList();
            },

            // 表单重置
            resetForm(formName) {
                this.$refs[formName].resetFields();

                this.filterData.searchText = "";
                this.filterData.timeArray = "";

                // 加载分页数据
                this.getOrderList();
            },

            /**
             *  日期筛选器
             */
            // 点击日期控制器
            getSTime(val) {
                if(val){
                    // 为起止时间赋值
                    this.filterData.startTime = val[0];
                    this.filterData.endTime = val[1];
                }

                return false;
            },

            /**
             *  api
             *  获取订单信息
             */
            // 获取订单列表
            getOrderList () {
                // 点击提交开始加载loading
                this.listLoading = true;

                // 接口参数
                let param = {
                    pageNum: this.page_arg.page_index,  // 当前页码
                    pageSize: this.page_arg.page_size,  // 每页条数
                    startTime: this.filterData.startTime,  // 开始时间（格式yyyy-MM-dd）
                    endTime: this.filterData.endTime,  // 结束时间（格式yyyy-MM-dd）
                    searchText: this.filterData.searchText,  // 关键词搜索（暂定手机号）
                };

                // 请求接口
                findOrderList(param).then(res => {
                    // console.log(res);

                    this.order_info = res.data.data.list;

                    // 返回分页总数
                    this.page_arg.total = res.data.data.total;

                    // 停止加载loading
                    this.listLoading = false;
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
            // 筛选
            filterOrderSubmit (formName) {
                // 验证表单
                this.$refs[formName].validate((valid) => {
                    // 如果验证成功，请求接口数据
                    if (valid) {
                        // 加载分页数据
                        this.getOrderList();
                    } else {  //验证失败跳出
                        console.log('error submit!!');
                    }
                });
            }
        },
        // 预处理
        created () {
            // 获取订单列表
            this.getOrderList();
        }
    }
</script>

<style scoped>
    .toolbar{
        padding-left: 28px;
    }

    .filter_text{
        width: 280px;
    }

    .pagination{
        margin-bottom: 5px;
    }
</style>